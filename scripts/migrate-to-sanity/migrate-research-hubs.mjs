import { client } from './client.mjs';
import { uploadPublicImage } from './uploadImage.mjs';

// Source of truth: src/app/pages/HubDetail.tsx `hubs` object, as it existed
// at migration time. Deterministic _id per hub (researchHub-<slug>) makes
// this script safe to re-run.
const hubs = [
  {
    slug: 'childhood',
    nameEn: 'Childhood and Growing Up Hub',
    nameFr: 'Pôle Enfance et développement',
    image: '/campus/childhood-hub-cover.jpg',
    descriptionEn:
      'The Childhood and Growing Up Hub listens to and responds to newcomer children with respect to their experiences in housing, sport/recreation and schooling. Our research examines how children navigate multiple spaces and systems, and aims to amplify their voices in shaping more inclusive and equitable communities.',
    descriptionFr:
      "Le Pôle Enfance et développement écoute et répond aux besoins des enfants nouveaux arrivants concernant leur logement, leurs activités sportives et récréatives et leur scolarité. Notre recherche examine comment les enfants naviguent dans de multiples espaces et systèmes, et vise à amplifier leurs voix dans la construction de communautés plus inclusives et équitables.",
    color: '#089EA5',
    icon: 'Users',
    order: 1,
    objectives: [
      { en: 'Create forums for newcomer children to share their experiences and perspectives', fr: 'Créer des forums pour que les enfants nouveaux arrivants partagent leurs expériences et perspectives' },
      { en: 'Examine housing experiences and challenges faced by newcomer families', fr: "Examiner les expériences de logement et les défis auxquels font face les familles nouvelles arrivantes" },
      { en: 'Investigate access to and participation in sport and recreational activities', fr: "Investiguer l'accès et la participation aux activités sportives et récréatives" },
      { en: 'Explore educational experiences and school integration processes', fr: "Explorer les expériences éducatives et les processus d'intégration scolaire" },
      { en: 'Develop evidence-based recommendations for service providers and policymakers', fr: 'Développer des recommandations fondées sur des données probantes pour les fournisseurs de services et les décideurs' },
    ],
    highlightProjects: [
      { titleEn: 'Newcomer Children Housing Experiences', titleFr: 'Expériences de logement des enfants nouveaux arrivants', descEn: 'Understanding the housing challenges and experiences of newcomer children and families in the Niagara region.', descFr: 'Comprendre les défis de logement et les expériences des enfants et familles nouveaux arrivants dans la région de Niagara.' },
      { titleEn: 'Sport and Recreation Access', titleFr: 'Accès au sport et aux loisirs', descEn: 'Examining barriers and facilitators to sport and recreational participation among newcomer youth.', descFr: 'Examiner les obstacles et les facilitateurs à la participation sportive et récréative parmi les jeunes nouveaux arrivants.' },
      { titleEn: 'Educational Integration', titleFr: 'Intégration éducative', descEn: 'Exploring how newcomer children navigate the education system and build connections in schools.', descFr: 'Explorer comment les enfants nouveaux arrivants naviguent le système éducatif et construisent des liens dans les écoles.' },
    ],
  },
  {
    slug: 'health',
    nameEn: 'Health Literacy Hub',
    nameFr: 'Pôle Littératie en santé',
    image: '/campus/brock-university-birdseye.jpg',
    descriptionEn:
      'The Health Literacy Hub promotes health literacy in immigrant and refugee populations. Our research develops culturally responsive health information and programs to improve health outcomes and reduce health disparities among newcomer communities in the Niagara region.',
    descriptionFr:
      'Le Pôle Littératie en santé promeut la littératie en santé auprès des populations immigrantes et réfugiées. Notre recherche développe des informations et programmes de santé culturellement adaptés pour améliorer les résultats de santé et réduire les disparités en santé parmi les communautés nouvelles arrivantes dans la région de Niagara.',
    color: '#C97B2E',
    icon: 'BookOpen',
    order: 2,
    objectives: [
      { en: 'Develop culturally responsive health literacy resources and programs', fr: 'Développer des ressources et programmes de littératie en santé culturellement adaptés' },
      { en: 'Examine health information needs and preferences of newcomer populations', fr: 'Examiner les besoins et préférences en information de santé des populations nouvelles arrivantes' },
      { en: 'Build capacity among community organizations to deliver health education', fr: "Renforcer la capacité des organismes communautaires à offrir de l'éducation en santé" },
      { en: 'Investigate barriers to accessing health services and information', fr: 'Investiguer les obstacles à l\'accès aux services et informations de santé' },
      { en: 'Create evidence-based tools to improve health communication and outcomes', fr: 'Créer des outils fondés sur des données probantes pour améliorer la communication et les résultats en santé' },
    ],
    highlightProjects: [
      { titleEn: 'Community Health Literacy Assessment', titleFr: 'Évaluation de la littératie en santé communautaire', descEn: 'Assessing health literacy levels and needs among diverse newcomer communities in Niagara.', descFr: 'Évaluer les niveaux et besoins de littératie en santé parmi diverses communautés nouvelles arrivantes à Niagara.' },
      { titleEn: 'Culturally Responsive Health Programs', titleFr: 'Programmes de santé culturellement adaptés', descEn: 'Co-developing health education programs with community partners to address specific health priorities.', descFr: "Co-développer des programmes d'éducation en santé avec des partenaires communautaires pour répondre à des priorités de santé spécifiques." },
      { titleEn: 'Health Navigation Services', titleFr: 'Services de navigation en santé', descEn: 'Supporting newcomers to navigate the healthcare system and access appropriate services.', descFr: 'Soutenir les nouveaux arrivants pour naviguer le système de santé et accéder aux services appropriés.' },
    ],
  },
  {
    slug: 'identity',
    nameEn: 'Identity, Connections and Belonging Hub',
    nameFr: 'Pôle Identité, relations et appartenance',
    image: '/campus/st-catharines-birdseye.jpg',
    descriptionEn:
      'The Identity, Connections and Belonging Hub hosts three distinct projects which foster a sense of belonging amongst three populations: Afro-descendants, sexual and gender diverse young adult newcomers, and seasonal agricultural workers. Our research explores identity formation, community connections, and experiences of belonging in the Niagara region.',
    descriptionFr:
      "Le Pôle Identité, relations et appartenance héberge trois projets distincts visant à favoriser un sentiment d'appartenance chez trois groupes de populations : les personnes afro-descendantes, les jeunes adultes nouveaux arrivants de diverses identités sexuelles et de genre, et les travailleurs agricoles saisonniers. Notre recherche explore la formation de l'identité, les connexions communautaires et les expériences d'appartenance dans la région de Niagara.",
    color: '#7B5EA7',
    icon: 'Target',
    order: 3,
    objectives: [
      { en: 'Explore identity formation and belonging among Afro-descendant communities', fr: "Explorer la formation de l'identité et l'appartenance parmi les communautés afro-descendantes" },
      { en: 'Examine experiences of sexual and gender diverse young adult newcomers', fr: 'Examiner les expériences des jeunes adultes nouveaux arrivants de diverses identités sexuelles et de genre' },
      { en: 'Investigate the lives and experiences of seasonal agricultural workers', fr: 'Investiguer les vies et expériences des travailleurs agricoles saisonniers' },
      { en: 'Identify barriers and facilitators to community integration and belonging', fr: "Identifier les obstacles et facilitateurs à l'intégration communautaire et l'appartenance" },
      { en: 'Develop community-based interventions to strengthen social connections', fr: 'Développer des interventions communautaires pour renforcer les connexions sociales' },
    ],
    highlightProjects: [
      { titleEn: 'Project #1: Identity & Belonging within Afro Descendants', titleFr: 'Projet #1 : Identité et appartenance parmi les Afro-descendants', descEn: 'Examining identity formation, community building, and experiences of belonging among Afro-descendant populations in Niagara.', descFr: "Examiner la formation de l'identité, la construction communautaire et les expériences d'appartenance parmi les populations afro-descendantes à Niagara." },
      { titleEn: 'Project #2: Migrant Farmworkers in Community', titleFr: 'Projet #2 : Travailleurs agricoles migrants dans la communauté', descEn: 'Investigating the experiences, labor conditions, and community integration of seasonal agricultural workers.', descFr: 'Investiguer les expériences, conditions de travail et intégration communautaire des travailleurs agricoles saisonniers.' },
      { titleEn: 'Project #3: ICT Use & SGD Newcomers', titleFr: 'Projet #3 : Utilisation des TIC et nouveaux arrivants de diverses identités sexuelles et de genre', descEn: 'Exploring how sexual and gender diverse newcomers use information and communication technologies for support and community building.', descFr: 'Explorer comment les nouveaux arrivants de diverses identités sexuelles et de genre utilisent les technologies de l\'information et de la communication pour le soutien et la construction communautaire.' },
    ],
  },
];

async function run() {
  console.log(`Migrating ${hubs.length} research hubs...`);
  for (const hub of hubs) {
    const coverImage = await uploadPublicImage(hub.image);
    const doc = {
      _id: `researchHub-${hub.slug}`,
      _type: 'researchHub',
      name: { en: hub.nameEn, fr: hub.nameFr },
      slug: { current: hub.slug },
      description: { en: hub.descriptionEn, fr: hub.descriptionFr },
      color: hub.color,
      icon: hub.icon,
      order: hub.order,
      objectives: hub.objectives.map((o) => ({ _type: 'localeString', _key: cryptoRandomKey(), ...o })),
      highlightProjects: hub.highlightProjects.map((p) => ({
        _type: 'highlightProject',
        _key: cryptoRandomKey(),
        title: { en: p.titleEn, fr: p.titleFr },
        description: { en: p.descEn, fr: p.descFr },
      })),
      ...(coverImage ? { coverImage } : {}),
    };
    await client.createOrReplace(doc);
    console.log(`✓ ${hub.nameEn} (${doc._id})`);
  }
  console.log('Done.');
}

function cryptoRandomKey() {
  return Math.random().toString(36).slice(2, 10);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
