import type { LocaleString } from '../locale';
import type { SanityImage } from '../image';

export interface TeamMember {
  _id: string;
  name: string;
  role?: LocaleString;
  hub?: { _id: string; name: LocaleString; slug: string } | null;
  institution?: LocaleString;
  email?: string;
  memberType?: 'faculty' | 'student' | 'community' | 'staff';
  isPostDoc?: boolean;
  isCoDirector?: boolean;
  isHubLeader?: boolean;
  isProjectLeader?: boolean;
  projectLeaderTitle?: LocaleString;
  bio?: LocaleString;
  image?: SanityImage;
  order?: number;
}

export const teamMembersQuery = /* groq */ `
*[_type == "teamMember"] | order(order asc, name asc) {
  _id,
  name,
  role,
  "hub": hub->{_id, name, "slug": slug.current},
  institution,
  email,
  memberType,
  isPostDoc,
  isCoDirector,
  isHubLeader,
  isProjectLeader,
  projectLeaderTitle,
  bio,
  image,
  order
}`;

export const teamMembersByHubSlugQuery = /* groq */ `
*[_type == "teamMember" && hub->slug.current == $slug] | order(order asc, name asc) {
  _id,
  name,
  role,
  institution,
  email,
  memberType,
  isHubLeader,
  bio,
  image
}`;

export const coDirectorsQuery = /* groq */ `
*[_type == "teamMember" && isCoDirector == true] | order(order asc) {
  _id,
  name,
  role,
  institution,
  email,
  bio,
  image,
  order
}`;
