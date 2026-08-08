import type { LocaleString } from '../locale';

export interface Publication {
  _id: string;
  title: LocaleString;
  type?: LocaleString;
  authors: LocaleString;
  date?: LocaleString;
  year: string;
  hub?: { _id: string; name: LocaleString; slug: string } | null;
  abstract?: LocaleString;
  link?: string;
  doi?: string;
  color?: string;
}

export const publicationsQuery = /* groq */ `
*[_type == "publication"] | order(year desc) {
  _id,
  title,
  type,
  authors,
  date,
  year,
  "hub": hub->{_id, name, "slug": slug.current},
  abstract,
  link,
  doi,
  color
}`;
