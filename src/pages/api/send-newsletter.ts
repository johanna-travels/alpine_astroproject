import { articles, getArticle, articleHref, type ArticleSlug } from '@/domains/articles/catalog';
import { buildArticleEmailContent, buildOutgoingNewsletterEmail } from '@/lib/newsletter';
import { getResendSender, isBlockedNewsletterRecipient } from '@/lib/email'; // Φιλτράρουμε blocked test emails πριν το Resend.
import { getServerEnv } from '@/lib/serverEnv';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import {
  getActiveSubscribersForNewsletter,
  getSubscriberStats,
  SubscriberQueryError,
  type SubscriberStats,
} from '@/lib/subscribers';
import { absoluteUrl } from '@/lib/site';
import { Resend } from 'resend';
import type { APIRoute } from 'astro';

export const prerender = false;

function isAuthorized(request: Request): boolean {
  const secret = getServerEnv('NEWSLETTER_ADMIN_SECRET');
  if (!secret) return false;

  const authorization = request.headers.get('authorization')?.trim();
  if (authorization?.toLowerCase().startsWith('bearer ')) {
    const token = authorization.slice(7).trim();
    if (token && token === secret) return true;
  }

  const headerSecret = request.headers.get('x-newsletter-secret')?.trim();
  if (headerSecret && headerSecret === secret) return true;

  return false;
}

function unauthorized() {
  return new Response(JSON.stringify({ error: 'Unauthorized' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  });
}

function serviceUnavailable(message: string) {
  return new Response(JSON.stringify({ error: message }), {
    status: 503,
    headers: { 'Content-Type': 'application/json' },
  });
}

/** Human-readable explanation for an empty recipient list, based on subscriber stats. */
function explainNoRecipients(stats: SubscriberStats | null): string {
  if (!stats) return 'Could not read subscriber stats from Supabase.';
  if (stats.total === 0) return 'The subscribers table is empty.';
  if (stats.active === 0 && stats.pending > 0) {
    return `${stats.pending} subscriber(s) are still pending — they have not clicked the confirmation link.`;
  }
  if (stats.active === 0) return 'No subscriber has status "active".';
  const parts: string[] = [];
  if (stats.activeUpdatesDisabled > 0) parts.push(`${stats.activeUpdatesDisabled} active subscriber(s) turned travel updates off`);
  if (stats.activeMissingToken > 0) parts.push(`${stats.activeMissingToken} active subscriber(s) have no confirmation_token`);
  return parts.length > 0 ? `${parts.join('; ')}.` : 'Active subscribers exist but none are eligible.';
}

function articleImageUrl(article: NonNullable<ReturnType<typeof getArticle>>): string | undefined {
  const src = article.image?.src;
  if (!src) return undefined;
  return new URL(src, absoluteUrl()).href;
}

export const GET: APIRoute = async ({ request }) => {
  if (!isAuthorized(request)) return unauthorized();

  const supabaseAdmin = getSupabaseAdmin();
  const subscriberStats = supabaseAdmin ? await getSubscriberStats(supabaseAdmin) : null;

  return new Response(
    JSON.stringify({
      articles: articles.map((article) => ({
        slug: article.slug,
        title: article.title,
        category: article.category,
        url: new URL(articleHref(article.slug), absoluteUrl()).href,
      })),
      subscribers: subscriberStats,
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  );
};

export const POST: APIRoute = async ({ request }) => {
  if (!isAuthorized(request)) return unauthorized();

  const adminSecret = getServerEnv('NEWSLETTER_ADMIN_SECRET');
  const resendApiKey = getServerEnv('RESEND_API_KEY');
  const resendSender = getResendSender();
  const supabaseAdmin = getSupabaseAdmin();

  if (!adminSecret) {
    return serviceUnavailable('NEWSLETTER_ADMIN_SECRET is not configured.');
  }
  if (!supabaseAdmin) {
    return serviceUnavailable('Supabase is not configured.');
  }
  if (!resendApiKey || !resendSender) {
    return serviceUnavailable('Resend is not configured.');
  }

  try {
    const body = await request.json();
    const articleSlug = body?.articleSlug as string | undefined;
    const dryRun = Boolean(body?.dryRun);

    if (!articleSlug) {
      return new Response(JSON.stringify({ error: 'articleSlug is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const article = getArticle(articleSlug);
    if (!article) {
      return new Response(
        JSON.stringify({
          error: 'Unknown article slug',
          availableSlugs: articles.map((item) => item.slug),
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const allRecipients = await getActiveSubscribersForNewsletter(supabaseAdmin);
    // Χωρίζουμε αληθινούς παραλήπτες από blocked test domains (π.χ. example.com).
    const skippedBlocked = allRecipients.filter((row) => isBlockedNewsletterRecipient(row.email));
    const recipients = allRecipients.filter((row) => !isBlockedNewsletterRecipient(row.email));
    const subscriberStats = await getSubscriberStats(supabaseAdmin);
    const articleUrl = new URL(articleHref(article.slug as ArticleSlug), absoluteUrl()).href;
    const emailContent = buildArticleEmailContent(article, articleUrl, articleImageUrl(article));

    if (allRecipients.length === 0) {
      return new Response(
        JSON.stringify({
          message: 'No active subscribers with travel updates enabled.',
          reason: explainNoRecipients(subscriberStats),
          article: article.slug,
          sent: 0,
          recipients: 0,
          skippedBlockedRecipients: 0, // Πόσοι κόπηκαν ως test/blocked domains.
          subscribers: subscriberStats,
          dryRun,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    }

    if (dryRun) {
      return new Response(
        JSON.stringify({
          message: 'Dry run complete. No emails were sent.',
          article: article.slug,
          subject: emailContent.title,
          recipients: recipients.length,
          skippedBlockedRecipients: skippedBlocked.length, // Δεν στάλθηκαν· ήταν test domains.
          subscribers: subscriberStats,
          previewUrl: articleUrl,
          bodyParagraphs: emailContent.bodyParagraphs ?? [emailContent.excerpt],
          dryRun: true,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    }

    // Όλοι οι ενεργοί είναι blocked — σταματάμε πριν καλέσουμε το Resend.
    if (recipients.length === 0) {
      return new Response(
        JSON.stringify({
          error: 'No sendable recipient addresses',
          detail: 'Every active subscriber uses a blocked test domain (for example example.com).',
          skippedBlockedRecipients: skippedBlocked.length,
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const resend = new Resend(resendApiKey);
    const outgoing = recipients.map((recipient) =>
      buildOutgoingNewsletterEmail(
        resendSender,
        recipient.email,
        recipient.confirmation_token,
        emailContent,
      ),
    );

    let sent = 0;
    const failures: string[] = [];

    // Ένα-ένα αντί για batch: ένα κακό email δεν πρέπει να ρίξει όλη την αποστολή.
    for (const message of outgoing) {
      const { error } = await resend.emails.send(message);
      if (error) {
        console.error('Newsletter send error:', error);
        failures.push(error.message);
        continue;
      }
      sent += 1;
    }

    if (sent === 0 && failures.length > 0) {
      return new Response(
        JSON.stringify({
          error: 'Failed to send newsletter',
          detail: failures[0],
          failed: failures.length,
          skippedBlockedRecipients: skippedBlocked.length, // Blocked δεν μετράνε ως αποτυχία Resend.
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }

    return new Response(
      JSON.stringify({
        message: 'Newsletter sent successfully.',
        article: article.slug,
        subject: emailContent.title,
        sent,
        failed: failures.length,
        skippedBlockedRecipients: skippedBlocked.length, // Πόσοι παραλήπτες κόπηκαν πριν την αποστολή.
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    if (error instanceof SubscriberQueryError) {
      console.error('Send newsletter error:', error);
      return serviceUnavailable(error.message);
    }
    console.error('Send newsletter error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
