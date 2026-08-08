const n=`
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
`,e=`
*[_type == "communityPartner" && "community" in showOn] | order(name.en asc) { ${n} }`,r=`
*[_type == "communityPartner" && "partners" in showOn] | order(name.en asc) { ${n} }`,t=`
*[_type == "communityPartner" && "partnership" in showOn] | order(name.en asc) { ${n} }`;export{r as a,e as c,t as p};
