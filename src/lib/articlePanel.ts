/** Shared editorial panel styling for maps and closing notes. */
export const ARTICLE_PANEL_BG = '#F5F2EB';
export const ARTICLE_PANEL_BORDER = '#E5DFD4';
export const ARTICLE_PANEL_SHADOW =
  '0 10px 32px rgb(105 116 110 / 0.1), 0 2px 8px rgb(0 0 0 / 0.04)';

export const articlePanelInlineStyle = [
  `background-color: ${ARTICLE_PANEL_BG} !important`,
  `border-color: ${ARTICLE_PANEL_BORDER} !important`,
  `box-shadow: ${ARTICLE_PANEL_SHADOW}`,
].join('; ');

export const articlePanelBadgeInlineStyle = [
  'background-color: rgb(105 116 110 / 0.12)',
  'color: #4a534f',
].join('; ');
