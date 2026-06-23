import { getSanityClient } from '@/lib/sanity/client';
import { sanityImageSrc } from '@/lib/sanity/image';
import type { SanityArticle, SanityArticleListItem } from '@/lib/sanity/types';
import { STATIC_ARTICLE_SLUGS } from '@/lib/sanity/types';
import type { DestinationSlug } from '@/domains/destinations/catalog';

const articleFields = /* groq */ `
  "slug": slug.current,
  title,
  category,
  destinationSlug,
  publishedDate,
  intro,
  seoTitle,
  seoDescription,
  "heroImageUrl": heroImage.asset->url,
  "heroImageAlt": heroImage.alt,
  sections[]{
    navTitle,
    sectionId,
    heading,
    body
  }
`;

export async function fetchSanityArticleSlugs(): Promise<string[]> {
  const client = getSanityClient();
  if (!client) return [];

  const rows = await client.fetch<{ slug: string }[]>(
    `*[_type == "article" && defined(slug.current)]{ "slug": slug.current }`
  );

  return rows
    .map((row) => row.slug)
    .filter((slug) => slug && !STATIC_ARTICLE_SLUGS.has(slug));
}

export async function fetchSanityArticle(slug: string): Promise<SanityArticle | null> {
  const client = getSanityClient();
  if (!client) return null;

  const row = await client.fetch<SanityArticle | null>(
    `*[_type == "article" && slug.current == $slug][0]{${articleFields}}`,
    { slug }
  );

  if (!row?.slug) return null;
  return normalizeArticle(row);
}

export async function fetchSanityArticles(): Promise<SanityArticleListItem[]> {
  const client = getSanityClient();
  if (!client) return [];

  const rows = await client.fetch<SanityArticleListItem[]>(
    `*[_type == "article" && defined(slug.current)] | order(publishedDate desc) {
      "slug": slug.current,
      title,
      category,
      destinationSlug,
      publishedDate,
      intro,
      seoTitle,
      seoDescription,
      "heroImageUrl": heroImage.asset->url,
      "heroImageAlt": heroImage.alt
    }`
  );

  return rows
    .filter((row) => row.slug && !STATIC_ARTICLE_SLUGS.has(row.slug))
    .map(normalizeListItem);
}

function normalizeListItem(row: SanityArticleListItem): SanityArticleListItem {
  return {
    ...row,
    heroImageUrl: row.heroImageUrl || '',
    intro: row.intro ?? [],
  };
}

function normalizeArticle(row: SanityArticle): SanityArticle {
  return {
    ...normalizeListItem(row),
    sections: row.sections ?? [],
  };
}

export function sanityArticleToCatalogShape(article: SanityArticleListItem) {
  return {
    slug: article.slug,
    destinationSlug: article.destinationSlug as DestinationSlug,
    category: article.category,
    title: article.title,
    carouselTitle: article.title,
    breadcrumbTitle: article.title,
    metaLabel: article.category,
    alt: article.heroImageAlt,
    publishedDate: article.publishedDate,
    intro: article.intro,
    seoTitle: article.seoTitle,
    seoDescription: article.seoDescription,
    imageSrc: article.heroImageUrl,
  };
}

export { sanityImageSrc };
