const e=`
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
}`,r=`
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
}`;export{r as a,e as r};
