import { client } from './client.mjs';

// Source of truth: src/app/pages/Timeline.tsx `allEvents` array.
const events = [
  {
    dateValue: '2026-06-19',
    titleEn: 'Community-University Symposium',
    titleFr: 'Symposium communautaire-universitaire',
    time: '9:00 AM – 1:00 PM',
    descriptionEn: 'The MSK/MSM team will present their preliminary findings on five research projects focused on improving public and institutional awareness about the issues, needs and identities of Afro-descendant and immigrant and refugee populations in Niagara. The symposium will begin with morning refreshments at 9am and conclude at about 1pm, followed by a light lunch. We are grateful to the Social Justice Research Institute at Brock University for its generous support of this event.',
    descriptionFr: "L'équipe MSK/MSM présentera les résultats préliminaires sur les cinq projets de recherche visant à sensibiliser le public et les institutions aux enjeux des populations afro-descendantes, immigrantes et réfugiées du Niagara. Le symposium commencera par des rafraîchissements à 9 h et se terminera vers 13 h, suivi d'un déjeuner léger. Nous remercions l'Institut de recherche sur la justice sociale (SJRI) de l'Université Brock pour son généreux soutien.",
    locationEn: 'Community Room, Civic Square, Welland, ON',
    locationFr: 'Salle communautaire, Civic Square, Welland, ON',
    locationUrl: 'https://maps.app.goo.gl/nEzwTCaAiYCJ43Kn9',
    registrationEn: 'Open (RSVP by May 29)',
    registrationFr: 'Ouverte (RSVP avant le 29 mai)',
    registrationUrl: 'https://doodle.com/sign-up-sheet/participate/070efb40-abeb-4fb8-8d7e-7fba14025436/select',
    isFeatured: true,
  },
  {
    dateValue: '2026-02-20',
    titleEn: 'Community Partner Forum',
    titleFr: 'Forum des partenaires communautaires',
    time: '1:00 PM – 3:00 PM',
    descriptionEn: 'Quarterly forum for community partners to share updates, discuss challenges, and collaborate on solutions.',
    descriptionFr: 'Forum trimestriel pour les partenaires communautaires pour partager des mises à jour, discuter des défis et collaborer sur des solutions.',
    locationEn: 'Virtual',
    locationFr: 'Virtuel',
    registrationEn: 'Closed',
    registrationFr: 'Fermée',
  },
  {
    dateValue: '2026-03-10',
    titleEn: 'Knowledge Translation Workshop',
    titleFr: 'Atelier de transfert de connaissances',
    time: '10:00 AM – 12:00 PM',
    descriptionEn: 'Workshop on effective strategies for translating research findings into practical applications and public communications.',
    descriptionFr: 'Atelier sur les stratégies efficaces pour traduire les résultats de recherche en applications pratiques et communications publiques.',
    locationEn: 'McMaster University, Hamilton, ON',
    locationFr: 'Université McMaster, Hamilton, ON',
    registrationEn: 'Closed',
    registrationFr: 'Fermée',
  },
];

async function run() {
  console.log(`Migrating ${events.length} timeline events...`);
  for (const e of events) {
    const doc = {
      _id: `timelineEvent-${e.dateValue}`,
      _type: 'timelineEvent',
      title: { en: e.titleEn, fr: e.titleFr },
      description: { en: e.descriptionEn, fr: e.descriptionFr },
      dateValue: e.dateValue,
      time: e.time,
      location: { en: e.locationEn, fr: e.locationFr },
      ...(e.locationUrl ? { locationUrl: e.locationUrl } : {}),
      registration: { en: e.registrationEn, fr: e.registrationFr },
      ...(e.registrationUrl ? { registrationUrl: e.registrationUrl } : {}),
      isFeatured: !!e.isFeatured,
    };
    await client.createOrReplace(doc);
    console.log(`✓ ${e.titleEn} (${e.dateValue})`);
  }
  console.log('Done.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
