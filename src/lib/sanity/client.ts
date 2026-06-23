import { createClient, type SanityClient } from '@sanity/client';

const apiVersion = '2024-01-01';

function getProjectId(): string | undefined {
  return import.meta.env.SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
}

function getDataset(): string {
  return import.meta.env.SANITY_DATASET || process.env.SANITY_DATASET || 'production';
}

/** Returns null when Sanity is not configured (build still works with static articles only). */
export function getSanityClient(): SanityClient | null {
  const projectId = getProjectId();
  if (!projectId || projectId === 'YOUR_PROJECT_ID') return null;

  return createClient({
    projectId,
    dataset: getDataset(),
    apiVersion,
    useCdn: true,
  });
}

export function isSanityConfigured(): boolean {
  return getSanityClient() !== null;
}
