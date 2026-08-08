import type { LocaleString } from '../locale';
import type { SanityImage } from '../image';

export type PartnerPage = 'community' | 'partners' | 'partnership';

export interface CommunityPartner {
  _id: string;
  name: LocaleString;
  description?: LocaleString;
  services?: LocaleString[];
  website?: string;
  contact?: string;
  category?: string;
  location?: string;
  logo?: SanityImage;
  color?: string;
  showOn?: PartnerPage[];
}

const fields = /* groq */ `
  _id,
  name,
  description,
  services,
  website,
  contact,
  category,
  location,
  logo,
  color,
  showOn
`;

export const communityPartnersQuery = /* groq */ `
*[_type == "communityPartner" && "community" in showOn] | order(name.en asc) { ${fields} }`;

export const partnersNetworkQuery = /* groq */ `
*[_type == "communityPartner" && "partners" in showOn] | order(name.en asc) { ${fields} }`;

export const partnershipFundersQuery = /* groq */ `
*[_type == "communityPartner" && "partnership" in showOn] | order(name.en asc) { ${fields} }`;
