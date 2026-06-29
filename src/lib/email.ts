import { absoluteUrl, contactEmail } from '@/lib/site';
import { getServerEnv } from '@/lib/serverEnv';

const SENDER_DISPLAY_NAME = 'Voyaflair';

/** Extract bare email from plain address or "Name <email@domain.com>" env value. */
export function parseSenderEmail(raw: string): string {
  const trimmed = raw.trim().replace(/^['"]|['"]$/g, '');
  const match = trimmed.match(/<([^>]+)>/);
  return (match ? match[1] : trimmed).trim();
}

/** Resend "from" — always shows "Voyaflair" in the inbox. */
export function formatResendSender(fromEmail: string): string {
  return `${SENDER_DISPLAY_NAME} <${parseSenderEmail(fromEmail)}>`;
}

export function getResendSender(): string | undefined {
  const email = getServerEnv('RESEND_FROM_EMAIL');
  if (!email) return undefined;
  return formatResendSender(email);
}

export function subscriberUnsubscribeUrl(token: string): string {
  return `${absoluteUrl('api/unsubscribe')}?token=${encodeURIComponent(token)}`;
}

export function subscriberPreferencesUrl(token: string): string {
  return `${absoluteUrl('preferences')}?token=${encodeURIComponent(token)}`;
}

export function emailFooterHtml(token: string): string {
  const unsubscribeUrl = subscriberUnsubscribeUrl(token);
  const preferencesUrl = subscriberPreferencesUrl(token);

  return `
    <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 32px 0;" />
    <p style="color: #999; font-size: 12px; line-height: 1.6; margin: 0 0 8px;">
      You received this email because you subscribed to Voyaflair.
      <a href="${preferencesUrl}" style="color: #69746E;">Manage preferences</a>
      &nbsp;·&nbsp;
      <a href="${unsubscribeUrl}" style="color: #69746E;">Unsubscribe</a>
    </p>
    <p style="color: #bbb; font-size: 11px; margin: 0;">
      Voyaflair · <a href="${absoluteUrl()}" style="color: #bbb;">voyaflair.com</a>
      · <a href="mailto:${contactEmail}" style="color: #bbb;">${contactEmail}</a>
    </p>
  `;
}

export function emailListUnsubscribeHeaders(token: string): Record<string, string> {
  const url = subscriberUnsubscribeUrl(token);
  return {
    'List-Unsubscribe': `<${url}>`,
    'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
  };
}
