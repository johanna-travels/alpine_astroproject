import { articles, getArticle, articleHref, type ArticleSlug } from '@/domains/articles/catalog';
import { buildArticleEmailContent, buildOutgoingNewsletterEmail } from '@/lib/newsletter';
import { getServerEnv } from '@/lib/serverEnv';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { getActiveSubscribersForNewsletter } from '@/lib/subscribers';
import { absoluteUrl } from '@/lib/site';
import { Resend } from 'resend';
import type { APIRoute } from 'astro';

export const prerender = false;

const BATCH_SIZE = 50;

function isAuthorized(request: Request): boolean {
  const secret = getServerEnv('NEWSLETTER_ADMIN_SECRET');
  if (!secret) return false;

  const authorization = request.headers.get('authorization');
  if (authorization === `Bearer ${secret}`) return true;

  return request.headers.get('x-newsletter-secret') === secret;
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

function articleImageUrl(article: NonNullable<ReturnType<typeof getArticle>>): string | undefined {
  const src = article.image.src;
  if (!src) return undefined;
  return new URL(src, absoluteUrl()).href;
}

export const GET: APIRoute = async ({ request }) => {
  if (!isAuthorized(request)) return unauthorized();

  return new Response(
    JSON.stringify({
      articles: articles.map((article) => ({
        slug: article.slug,
        title: article.title,
        category: article.category,
        url: new URL(articleHref(article.slug), absoluteUrl()).href,
      })),
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  );
};

export const POST: APIRoute = async ({ request }) => {
  if (!isAuthorized(request)) return unauthorized();

  const adminSecret = getServerEnv('NEWSLETTER_ADMIN_SECRET');
  const resendApiKey = getServerEnv('RESEND_API_KEY');
  const resendFromEmail = getServerEnv('RESEND_FROM_EMAIL');
  const supabaseAdmin = getSupabaseAdmin();

  if (!adminSecret) {
    return serviceUnavailable('NEWSLETTER_ADMIN_SECRET is not configured.');
  }
  if (!supabaseAdmin) {
    return serviceUnavailable('Supabase is not configured.');
  }
  if (!resendApiKey || !resendFromEmail) {
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

    const recipients = await getActiveSubscribersForNewsletter(supabaseAdmin);
    const articleUrl = new URL(articleHref(article.slug as ArticleSlug), absoluteUrl()).href;
    const emailContent = buildArticleEmailContent(article, articleUrl, articleImageUrl(article));

    if (recipients.length === 0) {
      return new Response(
        JSON.stringify({
          message: 'No active subscribers with travel updates enabled.',
          article: article.slug,
          sent: 0,
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
          previewUrl: articleUrl,
          dryRun: true,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const resend = new Resend(resendApiKey);
    const outgoing = recipients.map((recipient) =>
      buildOutgoingNewsletterEmail(
        resendFromEmail,
        recipient.email,
        recipient.confirmation_token,
        emailContent,
      ),
    );

    let sent = 0;
    const failures: string[] = [];

    for (let index = 0; index < outgoing.length; index += BATCH_SIZE) {
      const batch = outgoing.slice(index, index + BATCH_SIZE);
      const { data, error } = await resend.batch.send(batch);

      if (error) {
        console.error('Newsletter batch error:', error);
        failures.push(error.message);
        continue;
      }

      sent += data?.data?.length ?? batch.length;
    }

    if (sent === 0 && failures.length > 0) {
      return new Response(
        JSON.stringify({
          error: 'Failed to send newsletter',
          detail: failures[0],
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
        failedBatches: failures.length,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('Send newsletter error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
