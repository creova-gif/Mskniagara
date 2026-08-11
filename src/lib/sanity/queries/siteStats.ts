export interface SiteStats {
  teamMembers: number;
  researchHubs: number;
  researchProjects: number;
  communityPartners: number;
  institutions: number;
  publications: number;
}

// Single combined count query — used anywhere the site shows a summary
// stat ("X Team Members", "Y Community Partners", etc.) so those numbers
// can't drift out of sync with the actual Sanity content the way
// hand-typed numbers did.
export const siteStatsQuery = /* groq */ `{
  "teamMembers": count(*[_type == "teamMember"]),
  "researchHubs": count(*[_type == "researchHub"]),
  "researchProjects": count(*[_type == "researchProject"]),
  "communityPartners": count(*[_type == "communityPartner" && "community" in showOn]),
  "institutions": count(array::unique(*[_type == "teamMember" && memberType == "faculty" && defined(institution.en)].institution.en)),
  "publications": count(*[_type == "publication"])
}`;
