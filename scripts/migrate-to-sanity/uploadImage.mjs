import fs from 'node:fs';
import path from 'node:path';
import { client } from './client.mjs';

const PUBLIC_DIR = path.resolve(import.meta.dirname, '../../public');
const cache = new Map();

/**
 * Uploads a file from the main app's public/ directory (e.g. "/campus/foo.jpg")
 * to Sanity's asset library and returns an image field value referencing it.
 * Caches within a single script run so the same file isn't uploaded twice.
 */
export async function uploadPublicImage(publicPath) {
  if (!publicPath) return undefined;
  if (cache.has(publicPath)) return cache.get(publicPath);

  const absPath = path.join(PUBLIC_DIR, publicPath.replace(/^\//, ''));
  if (!fs.existsSync(absPath)) {
    console.warn(`  ⚠ image not found, skipping: ${publicPath}`);
    return undefined;
  }

  const filename = path.basename(absPath);
  const asset = await client.assets.upload('image', fs.createReadStream(absPath), { filename });
  const value = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  cache.set(publicPath, value);
  console.log(`  ✓ uploaded ${publicPath}`);
  return value;
}
