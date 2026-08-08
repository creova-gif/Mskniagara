import { createClient } from '@sanity/client';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined;
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) || 'production';

if (!projectId && import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.warn(
    '[sanity] VITE_SANITY_PROJECT_ID is not set — content queries will fail until the ' +
      '.env file is configured. See src/lib/sanity/.env.example.'
  );
}

export const sanityClient = createClient({
  projectId: projectId || '',
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
});
