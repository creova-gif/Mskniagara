const t=`{
  "teamMembers": count(*[_type == "teamMember"]),
  "researchHubs": count(*[_type == "researchHub"]),
  "researchProjects": count(*[_type == "researchProject"]),
  "communityPartners": count(*[_type == "communityPartner" && "community" in showOn]),
  "institutions": count(array::unique(*[_type == "teamMember" && memberType == "faculty" && defined(institution.en)].institution.en)),
  "publications": count(*[_type == "publication"])
}`;export{t as s};
