import { client } from './client.mjs';

const HUB_SLUG = {
  'Childhood and Growing Up Hub': 'childhood',
  'Health Literacy Hub': 'health',
  'Identity, Connections and Belonging Hub': 'identity',
};

// Source of truth: src/app/pages/ResearchProjects.tsx `projects` array.
const projects = [
  { title: 'Childhood and Growing Up', titleFr: 'Enfance et croissance', tldr: 'Studying the lived housing, education, and leisure experiences of newcomer and racialized children in Niagara.', tldrFr: 'Étude des expériences vécues par les enfants nouveaux arrivants et racialisés à Niagara (logement, éducation, loisirs).', hub: 'Childhood and Growing Up Hub', status: 'active', icon: 'GraduationCap', color: '#089EA5', description: "We focus on talking to newcomer and racialized children to learn about their perspectives and experiences, particularly in relation to housing and home, leisure/sport, education, and children's engagements with companion and other animals, as well as the outside world, and especially how these are affected by being uprooted.", descriptionFr: "Nous nous concentrons sur les conversations avec les enfants nouveaux arrivants et racialisés pour connaître leurs perspectives et expériences, particulièrement en ce qui concerne le logement et le foyer, les loisirs/sports, l'éducation, et les engagements des enfants avec les animaux de compagnie et autres, ainsi que le monde extérieur, et surtout comment ceux-ci sont affectés par le déracinement.", participants: 'Ongoing recruitment', participantsFr: 'Recrutement en cours', timeline: '2024 - 2027', contact: 'Dr. Rebecca Raby', contactEmail: 'rraby@brocku.ca', featured: true, location: 'Niagara Region', locationFr: 'Région de Niagara', keyFocus: ['Housing experiences', 'Education integration', 'Leisure & recreation', 'Community connections'], keyFocusFr: ['Expériences de logement', 'Intégration scolaire', 'Loisirs et récréation', 'Connexions communautaires'] },
  { title: 'Identity & Belonging within Afro Descendants', titleFr: 'Identité et appartenance afro-descendants', tldr: 'Exploring cultural identity, social belonging, and community connection among Afro-descendant populations in Niagara.', tldrFr: "Exploration de l'identité culturelle et de l'appartenance sociale des populations afro-descendantes à Niagara.", hub: 'Identity, Connections and Belonging Hub', status: 'active', icon: 'HandHeart', color: '#6635B1', description: 'This project explores the experiences of identity and belonging among Afro-descendant communities in the Niagara region, examining how individuals navigate cultural identity, community connections, and social belonging in the Canadian context.', descriptionFr: "Ce projet explore les expériences d'identité et d'appartenance parmi les communautés afro-descendantes dans la région de Niagara, examinant comment les individus naviguent l'identité culturelle, les connexions communautaires et l'appartenance sociale dans le contexte canadien.", participants: 'Recruiting community participants', participantsFr: 'Recrutement de participants communautaires', timeline: '2024 - 2027', contact: 'Dr. Jean Ntakirutimana', contactEmail: 'jntakirutimana@brocku.ca', featured: true, location: 'Niagara Region', locationFr: 'Région de Niagara', keyFocus: ['Cultural identity', 'Community building', 'Social belonging', 'Diaspora connections'], keyFocusFr: ['Identité culturelle', 'Construction communautaire', 'Appartenance sociale', 'Connexions diasporiques'] },
  { title: 'Migrant Farmworkers in Community', titleFr: 'Travailleurs agricoles migrants', tldr: 'Fostering dignity, community integration, and digital storytelling for seasonal agricultural workers in Niagara.', tldrFr: "Promotion de la dignité et de l'intégration communautaire des travailleurs agricoles saisonniers à Niagara.", hub: 'Identity, Connections and Belonging Hub', status: 'active', icon: 'Sprout', color: '#FFC956', description: "This project explores the experiences of seasonal agricultural workers who provide integral support to Niagara's agriculture and tourism sectors. Working with the Migrant Farmworkers Project, we plan to develop community-based strategies that strengthen seasonal agricultural workers' sense of belonging and dignity and create a digital repository of migrant workers' experiences and history in Niagara through arts-based media.", descriptionFr: "Ce projet explore les expériences des travailleurs agricoles saisonniers qui fournissent un soutien essentiel aux secteurs agricole et touristique de Niagara. En travaillant avec le Migrant Farmworkers Project, nous prévoyons développer des stratégies communautaires qui renforcent le sentiment d'appartenance et de dignité des travailleurs agricoles saisonniers et créer un référentiel numérique des expériences et de l'histoire des travailleurs migrants à Niagara à travers des médias artistiques.", participants: 'Active with community partners', participantsFr: 'Actif avec des partenaires communautaires', timeline: '2024 - 2027', contact: 'Dr. Jean Ntakirutimana', contactEmail: 'jntakirutimana@brocku.ca', externalLink: 'https://migrantfarmworkers.ca/', location: 'Niagara Region', locationFr: 'Région de Niagara', keyFocus: ['Worker dignity', 'Community integration', 'Digital storytelling', 'Arts-based research'], keyFocusFr: ['Dignité des travailleurs', 'Intégration communautaire', 'Narration numérique', 'Recherche artistique'] },
  { title: 'ICT Use & SGD Newcomers', titleFr: 'Utilisation TIC & nouveaux arrivants DSG', tldr: 'Examining digital technology use and social support networks among sexual and gender diverse (SGD) newcomers.', tldrFr: "Examen de l'utilisation des technologies numériques chez les nouveaux arrivants de diverses identités sexuelles et de genre (DSG).", hub: 'Identity, Connections and Belonging Hub', status: 'recruiting', icon: 'Network', color: '#CC0000', description: 'This project examines how sexual and gender diverse (SGD) newcomers in the Niagara region use information and communication technologies (ICT) to navigate settlement, build community connections, and maintain cultural and social ties while establishing their identities in a new context.', descriptionFr: "Ce projet examine comment les nouveaux arrivants de diverses identités sexuelles et de genre (DSG) dans la région de Niagara utilisent les technologies de l'information et de la communication (TIC) pour naviguer l'établissement, construire des connexions communautaires et maintenir des liens culturels et sociaux tout en établissant leurs identités dans un nouveau contexte.", participants: 'Actively recruiting participants', participantsFr: 'Recrutement actif de participants', timeline: '2024 - 2027', contact: 'Dr. Dane Marco Di Cesare', contactEmail: 'ddicesare@brocku.ca', location: 'Niagara Region', locationFr: 'Région de Niagara', keyFocus: ['Technology use', 'LGBTQ+ settlement', 'Community building', 'Identity navigation'], keyFocusFr: ['Utilisation technologique', 'Établissement LGBTQ+', 'Construction communautaire', 'Navigation identitaire'] },
  { title: 'Health Literacy', titleFr: 'Littératie en santé', tldr: 'Developing accessible health education resources and community health partnerships for newcomer populations.', tldrFr: "Développement de ressources d'éducation à la santé accessibles et de partenariats pour les populations nouvelles arrivantes.", hub: 'Health Literacy Hub', status: 'planning', icon: 'Activity', color: '#12647F', description: 'This project focuses on understanding and improving health literacy among diverse populations in the Niagara region, with emphasis on developing accessible health information resources and community-based health education strategies.', descriptionFr: "Ce projet se concentre sur la compréhension et l'amélioration de la littératie en santé parmi les populations diverses de la région de Niagara, en mettant l'accent sur le développement de ressources d'information sur la santé accessibles et de stratégies d'éducation à la santé communautaire.", participants: 'Project design phase', participantsFr: 'Phase de conception du projet', timeline: '2025 - 2028', contact: 'Dr. Joanne Crawford', contactEmail: 'jcrawford@brocku.ca', location: 'Niagara Region', locationFr: 'Région de Niagara', keyFocus: ['Health education', 'Accessible resources', 'Community partnerships', 'Health equity'], keyFocusFr: ['Éducation santé', 'Ressources accessibles', 'Partenariats communautaires', 'Équité santé'] },
];

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function run() {
  console.log(`Migrating ${projects.length} research projects...`);
  for (const p of projects) {
    const doc = {
      _id: `researchProject-${slugify(p.title)}`,
      _type: 'researchProject',
      title: { en: p.title, fr: p.titleFr },
      tldr: { en: p.tldr, fr: p.tldrFr },
      hub: { _type: 'reference', _ref: `researchHub-${HUB_SLUG[p.hub]}` },
      status: p.status,
      icon: p.icon,
      color: p.color,
      description: { en: p.description, fr: p.descriptionFr },
      participants: { en: p.participants, fr: p.participantsFr },
      timeline: p.timeline,
      contact: p.contact,
      contactEmail: p.contactEmail,
      ...(p.externalLink ? { externalLink: p.externalLink } : {}),
      location: { en: p.location, fr: p.locationFr },
      keyFocus: p.keyFocus.map((k, idx) => ({ _type: 'localeString', _key: `k${idx}`, en: k, fr: p.keyFocusFr[idx] })),
      featured: !!p.featured,
    };
    await client.createOrReplace(doc);
    console.log(`✓ ${p.title}`);
  }
  console.log('Done.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
