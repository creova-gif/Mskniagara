import type { LocaleString } from '../locale';
import type { SanityImage } from '../image';

export interface HighlightProject {
  title: LocaleString;
  description: LocaleString;
}

export interface ResearchHub {
  _id: string;
  name: LocaleString;
  slug: string;
  description: LocaleString;
  color?: string;
  icon?: string;
  objectives: LocaleString[];
  highlightProjects?: HighlightProject[];
  coverImage?: SanityImage;
  memberCount?: number;
  projectCount?: number;
  leaders?: string[];
}

export const researchHubsQuery = /* groq */ `
*[_type == "researchHub"] | order(order asc) {
  _id,
  name,
  "slug": slug.current,
  description,
  color,
  icon,
  objectives,
  coverImage,
  "memberCount": count(*[_type == "teamMember" && references(^._id)]),
  "projectCount": count(*[_type == "researchProject" && references(^._id)]),
  "leaders": *[_type == "teamMember" && isHubLeader == true && references(^._id)].name
}`;

export const researchHubBySlugQuery = /* groq */ `
*[_type == "researchHub" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  description,
  color,
  icon,
  objectives,
  highlightProjects,
  coverImage
}`;
