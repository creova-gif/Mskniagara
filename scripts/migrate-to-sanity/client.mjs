import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const required = ['SANITY_PROJECT_ID', 'SANITY_DATASET', 'SANITY_WRITE_TOKEN'];
for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing ${key} in scripts/migrate-to-sanity/.env`);
  }
}

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});
