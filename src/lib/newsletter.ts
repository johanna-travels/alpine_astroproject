import type { Article } from '@/domains/articles/catalog';
import { emailFooterHtml, emailListUnsubscribeHeaders } from '@/lib/email';
import { contactEmail } from '@/lib/site';

export type ArticleEmailContent = {
  title: string;
  category: string;
  excerpt: string;
  bodyParagraphs?: readonly string[];
  articleUrl: string;
  imageUrl?: string;
};

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function buildArticleEmailContent(article: Article, articleUrl: string, imageUrl?: string): ArticleEmailContent {
  return {
    title: article.title,
    category: article.category,
    excerpt: article.lead ?? article.intro[0] ?? '',
    bodyParagraphs: article.newsletterBody,
    articleUrl,
    imageUrl,
  };
}

export function articleAnnouncementEmailHtml(content: ArticleEmailContent, token: string): string {
  const imageBlock = content.imageUrl
    ? `
      <a href="${content.articleUrl}" style="display: block; margin: 24px 0;">
        <img
          src="${content.imageUrl}"
          alt="${content.title}"
          style="display: block; width: 100%; max-width: 560px; border-radius: 8px;"
        />
      </a>
    `
    : '';

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #2D2D2D;">
      <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: #69746E;">
        ${content.category}
      </p>
      <h1 style="margin: 0 0 16px; font-size: 24px; line-height: 1.3; color: #2D2D2D;">
        New on Voyaflair
      </h1>
      <h2 style="margin: 0 0 16px; font-size: 20px; line-height: 1.4; color: #69746E; font-weight: normal;">
        ${content.title}
      </h2>
      ${imageBlock}
      ${
        content.bodyParagraphs?.length
          ? content.bodyParagraphs
              .map(
                (paragraph) =>
                  `<p style="margin: 0 0 16px; font-size: 16px; line-height: 1.6; color: #444;">${escapeHtml(paragraph)}</p>`,
              )
              .join('')
          : `<p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #444;">${escapeHtml(content.excerpt)}</p>`
      }
      <a
        href="${content.articleUrl}"
        style="display: inline-block; padding: 12px 24px; background-color: #69746E; color: white; text-decoration: none; border-radius: 4px;"
      >
        Read the guide
      </a>
      ${emailFooterHtml(token)}
    </div>
  `;
}

export function articleAnnouncementSubject(title: string): string {
  return `New travel guide: ${title}`;
}

export type OutgoingNewsletterEmail = {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  html: string;
  headers: Record<string, string>;
};

export function buildOutgoingNewsletterEmail(
  from: string,
  to: string,
  token: string,
  content: ArticleEmailContent,
): OutgoingNewsletterEmail {
  return {
    from,
    to,
    replyTo: contactEmail,
    subject: articleAnnouncementSubject(content.title),
    html: articleAnnouncementEmailHtml(content, token),
    headers: emailListUnsubscribeHeaders(token),
  };
}
