import type { LocaleString } from '../locale';

export interface ResearchProject {
  _id: string;
  title: LocaleString;
  tldr?: LocaleString;
  hub: { _id: string; name: LocaleString; slug: string; color?: string };
  status?: 'active' | 'recruiting' | 'completed' | 'planning';
  icon?: string;
  color?: string;
  description: LocaleString;
  participants?: LocaleString;
  timeline?: string;
  contact?: string;
  contactEmail?: string;
  externalLink?: string;
  location?: LocaleString;
  keyFocus?: LocaleString[];
  featured?: boolean;
}

export const researchProjectsQuery = /* groq */ `
*[_type == "researchProject"] | order(featured desc, title.en asc) {
  _id,
  title,
  tldr,
  "hub": hub->{_id, name, "slug": slug.current, color},
  status,
  icon,
  color,
  description,
  participants,
  timeline,
  contact,
  contactEmail,
  externalLink,
  location,
  keyFocus,
  featured
}`;
