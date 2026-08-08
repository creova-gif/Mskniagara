import { client } from './client.mjs';
import { uploadPublicImage } from './uploadImage.mjs';

// Hub name variants across Media.tsx don't exactly match the canonical
// "X and Y Hub" strings used elsewhere (uses "&" instead of "and", and
// sometimes drops "Hub") — normalize by matching on a keyword instead.
function hubSlugFor(hubName) {
  if (!hubName) return undefined;
  if (/childhood/i.test(hubName)) return 'childhood';
  if (/health/i.test(hubName)) return 'health';
  if (/identity/i.test(hubName)) return 'identity';
  return undefined; // e.g. "All Hubs"
}

// Source of truth: src/app/pages/Media.tsx `photoGallery`, `videos`, and
// `annualReports` arrays.
const photos = [
  { title: 'Community Consultation Workshop', titleFr: 'Atelier de consultation communautaire', date: 'Feb 15, 2025', dateFr: '15 fév 2025', location: 'Brock University', hub: 'Childhood & Growing Up Hub', images: 3, category: 'workshop', year: '2025', aspect: 'tall', thumbnail: '/media/workshop-childhood-hub.jpg' },
  { title: 'Health Literacy Roundtable', titleFr: 'Table ronde littératie en santé', date: 'Jan 22, 2025', dateFr: '22 jan 2025', location: 'QUEST Community Health', hub: 'Health Literacy Hub', images: 5, category: 'roundtable', year: '2025', aspect: 'wide', thumbnail: '/media/health-literacy-roundtable.jpg' },
  { title: 'Partnership Launch Event', titleFr: 'Événement de lancement', date: 'Oct 10, 2024', dateFr: '10 oct 2024', location: 'Brock University, St. Catharines', hub: 'All Hubs', images: 8, category: 'launch', year: '2024', aspect: 'square', thumbnail: '/media/partnership-launch-event.jpg' },
  { title: 'Afro-Descendant Identity Workshop', titleFr: 'Atelier identité afro-descendante', date: 'Dec 5, 2024', dateFr: '5 déc 2024', location: 'Community Centre, Niagara Falls', hub: 'Identity, Connections & Belonging', images: 6, category: 'workshop', year: '2024', aspect: 'tall', thumbnail: '/media/identity-workshop.jpg' },
  { title: 'Migrant Farmworkers Support', titleFr: 'Soutien aux travailleurs migrants', date: 'Aug 18, 2024', dateFr: '18 août 2024', location: "St. Alban's Anglican Church", hub: 'Identity, Connections & Belonging', images: 4, category: 'community', year: '2024', aspect: 'wide', thumbnail: '/media/migrant-farmworkers-support.jpg' },
  { title: 'Youth Recreation & Inclusion Forum', titleFr: 'Forum récréation et inclusion des jeunes', date: 'Nov 12, 2024', dateFr: '12 nov 2024', location: 'YWCA Niagara Region', hub: 'Childhood & Growing Up Hub', images: 7, category: 'forum', year: '2024', aspect: 'square', thumbnail: '/media/youth-recreation-forum.jpg' },
];

const videos = [
  { title: 'Community Partner Testimonial — Bridges Niagara', titleFr: 'Témoignage partenaire communautaire — Bridges Niagara', speaker: 'Maria Santos', role: 'Executive Director, Bridges Niagara', roleFr: 'Directrice exécutive, Bridges Niagara', hub: 'Health Literacy Hub', duration: '4:32', date: 'Feb 2025', dateFr: 'Fév 2025', views: 342, description: 'Maria shares how the MSK Partnership has strengthened health literacy programming for newcomer communities.', descriptionFr: 'Maria partage comment le partenariat MSK a renforcé la programmation en littératie en santé.', thumbnail: '/media/video-testimonial-bridges-niagara.jpg' },
  { title: 'Research Impact — Dr. Jean Ntakirutimana', titleFr: 'Impact de la recherche — Dr Jean Ntakirutimana', speaker: 'Dr. Jean Ntakirutimana', role: 'Co-Director, MSK Partnership', roleFr: 'Codirecteur, Partenariat MSK', hub: 'Identity, Connections & Belonging', duration: '6:15', date: 'Jan 2025', dateFr: 'Jan 2025', views: 567, description: 'Dr. Ntakirutimana discusses community-engaged research and identity formation among Afro-descendant populations.', descriptionFr: "Dr Ntakirutimana discute de la recherche communautaire et de la formation identitaire.", thumbnail: '/media/video-research-impact-ntakirutimana.jpg' },
  { title: 'Community Voice — TOES Niagara', titleFr: 'Voix communautaire — TOES Niagara', speaker: 'Mariam Khayinza', role: 'Community Co-Leader, TOES Niagara', roleFr: 'Co-responsable communautaire, TOES Niagara', hub: 'Health Literacy Hub', duration: '5:48', date: 'Dec 2024', dateFr: 'Déc 2024', views: 423, description: 'Mariam highlights the collaborative approach to improving health information access for immigrant populations.', descriptionFr: "Mariam souligne l'approche collaborative pour améliorer l'accès à l'information sur la santé.", thumbnail: '/media/video-community-voice-toes.jpg' },
  { title: 'Youth Perspectives — Newcomer Students', titleFr: 'Perspectives des jeunes — Étudiants nouveaux arrivants', speaker: 'Student Focus Group', role: 'Newcomer Youth Participants', roleFr: 'Participants jeunes nouveaux arrivants', hub: 'Childhood & Growing Up Hub', duration: '7:22', date: 'Nov 2024', dateFr: 'Nov 2024', views: 789, description: 'Young newcomers share their experiences with housing, education, and community belonging in Niagara.', descriptionFr: "Les jeunes nouveaux arrivants partagent leurs expériences de logement, d'éducation et d'appartenance.", thumbnail: '/media/video-youth-perspectives.jpg' },
];

const annualReports = [
  { year: '2024–2025', title: 'Annual Impact Report', titleFr: "Rapport d'impact annuel", subtitle: 'Second Year of Partnership', subtitleFr: 'Deuxième année du partenariat', description: 'Comprehensive overview of research activities, community partnerships, knowledge mobilization, and measurable impact across all three research hubs in the Niagara region.', descriptionFr: 'Aperçu complet des activités de recherche, partenariats communautaires et impact mesurable dans les trois pôles de recherche.', pages: 48, publishDate: 'March 2025', publishDateFr: 'Mars 2025', stats: [ { value: '26', label: 'Community Partners', labelFr: 'Partenaires communautaires' }, { value: '65', label: 'Team Members', labelFr: "Membres d'équipe" }, { value: '12', label: 'Active Projects', labelFr: 'Projets actifs' }, { value: '150+', label: 'Events Hosted', labelFr: 'Événements organisés' } ] },
  { year: '2023–2024', title: 'Inaugural Year Report', titleFr: 'Rapport de la première année', subtitle: 'Launch & Foundation', subtitleFr: 'Lancement et fondation', description: 'Launch year achievements, partnership formation, research hub establishment, and community engagement initiatives that set the foundation for a just and inclusive Niagara.', descriptionFr: "Réalisations de l'année de lancement, formation de partenariats et établissement des pôles de recherche.", pages: 36, publishDate: 'October 2024', publishDateFr: 'Octobre 2024', stats: [ { value: '18', label: 'Founding Partners', labelFr: 'Partenaires fondateurs' }, { value: '3', label: 'Hubs Launched', labelFr: 'Pôles lancés' }, { value: '40+', label: 'Team Members', labelFr: "Membres d'équipe" }, { value: 'SSHRC', label: 'Grant Awarded', labelFr: 'Subvention octroyée' } ] },
];

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function run() {
  console.log(`Migrating ${photos.length} photos, ${videos.length} videos, ${annualReports.length} annual reports...`);

  for (const p of photos) {
    const thumbnail = await uploadPublicImage(p.thumbnail);
    const hubSlug = hubSlugFor(p.hub);
    await client.createOrReplace({
      _id: `mediaPhoto-${slugify(p.title)}`,
      _type: 'mediaPhoto',
      title: { en: p.title, fr: p.titleFr },
      date: { en: p.date, fr: p.dateFr },
      location: p.location,
      ...(hubSlug ? { hub: { _type: 'reference', _ref: `researchHub-${hubSlug}` } } : {}),
      imageCount: p.images,
      category: p.category,
      year: p.year,
      aspect: p.aspect,
      ...(thumbnail ? { thumbnail } : {}),
    });
    console.log(`✓ photo: ${p.title}`);
  }

  for (const v of videos) {
    const thumbnail = await uploadPublicImage(v.thumbnail);
    const hubSlug = hubSlugFor(v.hub);
    await client.createOrReplace({
      _id: `mediaVideo-${slugify(v.title)}`,
      _type: 'mediaVideo',
      title: { en: v.title, fr: v.titleFr },
      speaker: v.speaker,
      role: { en: v.role, fr: v.roleFr },
      ...(hubSlug ? { hub: { _type: 'reference', _ref: `researchHub-${hubSlug}` } } : {}),
      duration: v.duration,
      date: { en: v.date, fr: v.dateFr },
      views: v.views,
      description: { en: v.description, fr: v.descriptionFr },
      ...(thumbnail ? { thumbnail } : {}),
    });
    console.log(`✓ video: ${v.title}`);
  }

  for (const r of annualReports) {
    await client.createOrReplace({
      _id: `annualReport-${r.year.replace(/[^0-9]/g, '-')}`,
      _type: 'annualReport',
      year: r.year,
      title: { en: r.title, fr: r.titleFr },
      subtitle: { en: r.subtitle, fr: r.subtitleFr },
      description: { en: r.description, fr: r.descriptionFr },
      pages: r.pages,
      publishDate: { en: r.publishDate, fr: r.publishDateFr },
      stats: r.stats.map((s, idx) => ({
        _type: 'stat',
        _key: `stat${idx}`,
        value: s.value,
        label: { en: s.label, fr: s.labelFr },
      })),
      // no `file` — downloadUrl in the source is a placeholder '#', no real PDF exists in the repo
    });
    console.log(`✓ report: ${r.title}`);
  }

  console.log('Done.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
