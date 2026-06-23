import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '2jl1i4rv',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
});
