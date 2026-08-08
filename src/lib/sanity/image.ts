import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './client';

export interface SanityImage {
  asset?: {
    _ref?: string;
    _id?: string;
  };
  hotspot?: { x: number; y: number; height: number; width: number };
}

const builder = imageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImage | undefined | null) {
  if (!source?.asset) return undefined;
  return builder.image(source);
}
