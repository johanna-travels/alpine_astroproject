import { absoluteUrl, contactEmail } from '@/lib/site';

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
