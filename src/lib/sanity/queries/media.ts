import type { LocaleString } from '../locale';
import type { SanityImage } from '../image';

export interface MediaPhoto {
  _id: string;
  title: LocaleString;
  date?: LocaleString;
  location?: string;
  hub?: { _id: string; name: LocaleString } | null;
  imageCount?: number;
  category?: string;
  year?: string;
  aspect?: 'tall' | 'wide' | 'square';
  thumbnail?: SanityImage;
}

export interface MediaVideo {
  _id: string;
  title: LocaleString;
  speaker?: string;
  role?: LocaleString;
  hub?: { _id: string; name: LocaleString } | null;
  duration?: string;
  date?: LocaleString;
  views?: number;
  description?: LocaleString;
  thumbnail?: SanityImage;
  videoUrl?: string;
}

export interface AnnualReportStat {
  value: string;
  label: LocaleString;
}

export interface AnnualReport {
  _id: string;
  year: string;
  title: LocaleString;
  subtitle?: LocaleString;
  description?: LocaleString;
  pages?: number;
  publishDate?: LocaleString;
  stats?: AnnualReportStat[];
  file?: { asset?: { url?: string } };
}

export const mediaPhotosQuery = /* groq */ `
*[_type == "mediaPhoto"] | order(year desc) {
  _id, title, date, location, "hub": hub->{_id, name}, imageCount, category, year, aspect, thumbnail
}`;

export const mediaVideosQuery = /* groq */ `
*[_type == "mediaVideo"] | order(date desc) {
  _id, title, speaker, role, "hub": hub->{_id, name}, duration, date, views, description, thumbnail, videoUrl
}`;

export const annualReportsQuery = /* groq */ `
*[_type == "annualReport"] | order(year desc) {
  _id, year, title, subtitle, description, pages, publishDate, stats, "file": file.asset->{url}
}`;
