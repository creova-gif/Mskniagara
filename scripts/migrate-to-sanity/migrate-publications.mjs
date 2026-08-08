import { client } from './client.mjs';

const HUB_SLUG = {
  'Childhood and Growing Up Hub': 'childhood',
  'Health Literacy Hub': 'health',
  'Identity, Connections and Belonging Hub': 'identity',
  // 'All Research Hubs' intentionally has no matching hub doc -> left unset
};

// Source of truth: src/app/pages/KnowledgeDissemination.tsx `publications`
// array. All entries currently have link: '#' (placeholder, no real URL
// yet) so `link` is omitted here rather than migrated as a broken URL.
const publications = [
  { title: 'Mobilizing Subjugated Knowledges: A Community-Based Approach', titleFr: 'Mobiliser les savoirs subjugués : Une approche communautaire', type: 'article', typeFr: 'Article', authors: 'Research Partnership Team', authorsFr: 'Équipe de partenariat de recherche', date: 'March 2025', dateFr: 'Mars 2025', year: '2025', hub: 'All Research Hubs', abstract: 'A comprehensive overview of our community-engaged research methodology and its impact on creating inclusive spaces for newcomer and marginalized communities in Niagara.', abstractFr: "Un aperçu complet de notre méthodologie de recherche communautaire et de son impact sur la création d'espaces inclusifs pour les communautés nouvelles arrivantes et marginalisées à Niagara.", color: '#CC0000' },
  { title: 'Childhood Experiences of Newcomer Families in Niagara', titleFr: "Expériences d'enfance des familles nouvelles arrivantes à Niagara", type: 'report', typeFr: 'Rapport', authors: 'Dr. Rebecca Raby & Team', authorsFr: 'Dre Rebecca Raby et équipe', date: 'February 2025', dateFr: 'Février 2025', year: '2025', hub: 'Childhood and Growing Up Hub', abstract: 'Research findings on housing, education, and leisure experiences of newcomer and racialized children in the Niagara region.', abstractFr: "Résultats de recherche sur le logement, l'éducation et les expériences de loisirs des enfants nouveaux arrivants et racialisés dans la région de Niagara.", color: '#089EA5' },
  { title: 'Identity and Belonging: Afro-Descendant Communities', titleFr: 'Identité et appartenance : Communautés afro-descendantes', type: 'presentation', typeFr: 'Présentation', authors: 'Jean Ntakirutimana', authorsFr: 'Jean Ntakirutimana', date: 'January 2025', dateFr: 'Janvier 2025', year: '2025', hub: 'Identity, Connections and Belonging Hub', abstract: 'Conference presentation exploring cultural identity, community connections, and social belonging among Afro-descendant communities in Niagara.', abstractFr: "Présentation de conférence explorant l'identité culturelle, les connexions communautaires et l'appartenance sociale parmi les communautés afro-descendantes à Niagara.", color: '#6635B1' },
  { title: 'Migrant Farmworkers: Voices from the Fields', titleFr: 'Travailleurs agricoles migrants : Voix des champs', type: 'video', typeFr: 'Vidéo', authors: 'Community Partners & Research Team', authorsFr: 'Partenaires communautaires et équipe de recherche', date: 'December 2024', dateFr: 'Décembre 2024', year: '2024', hub: 'Identity, Connections and Belonging Hub', abstract: 'Documentary series showcasing the experiences and stories of seasonal agricultural workers in Niagara through arts-based media.', abstractFr: 'Série documentaire présentant les expériences et les histoires des travailleurs agricoles saisonniers à Niagara à travers des médias artistiques.', color: '#FFC956' },
  { title: 'Health Literacy in Immigrant and Refugee Populations: A Policy Brief', titleFr: 'Littératie en santé dans les populations immigrantes et réfugiées : Note de politique', type: 'policy', typeFr: 'Politique', authors: 'Livianna Tossutti & Joanne Crawford', authorsFr: 'Livianna Tossutti et Joanne Crawford', date: 'November 2024', dateFr: 'Novembre 2024', year: '2024', hub: 'Health Literacy Hub', abstract: 'Policy recommendations for improving health literacy and access to health information among newcomer and marginalized populations.', abstractFr: "Recommandations politiques pour améliorer la littératie en santé et l'accès à l'information sur la santé parmi les populations nouvelles arrivantes et marginalisées.", color: '#12647F' },
  { title: 'Community-Engaged Research Toolkit', titleFr: 'Boîte à outils de recherche communautaire', type: 'toolkit', typeFr: 'Boîte à outils', authors: 'All Research Hubs', authorsFr: 'Tous les pôles de recherche', date: 'October 2024', dateFr: 'Octobre 2024', year: '2024', hub: 'All Research Hubs', abstract: 'Practical guide and resources for conducting community-engaged research with newcomer and marginalized communities.', abstractFr: 'Guide pratique et ressources pour mener des recherches communautaires avec les communautés nouvelles arrivantes et marginalisées.', color: '#CC0000' },
];

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function run() {
  console.log(`Migrating ${publications.length} publications...`);
  for (const p of publications) {
    const hubSlug = HUB_SLUG[p.hub];
    const doc = {
      _id: `publication-${slugify(p.title)}`,
      _type: 'publication',
      title: { en: p.title, fr: p.titleFr },
      type: { en: p.type, fr: p.typeFr },
      authors: { en: p.authors, fr: p.authorsFr },
      date: { en: p.date, fr: p.dateFr },
      year: p.year,
      ...(hubSlug ? { hub: { _type: 'reference', _ref: `researchHub-${hubSlug}` } } : {}),
      abstract: { en: p.abstract, fr: p.abstractFr },
      color: p.color,
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
