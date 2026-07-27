import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Calendar, MapPin, Users, Clock, Inbox, ExternalLink, Star, Download } from 'lucide-react';
import { TimelineBeam } from '../components/HeroAnimations';
import { sanitizeUrl } from '../utils/security';
import { usePageMeta } from '../hooks/usePageMeta';

const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);

function isEventPast(dateValue: Date): boolean {
  return dateValue < TODAY;
}

/**
 * Generates an RFC-5545 compliant .ics calendar invite string.
 */
function buildICS(params: {
  title: string;
  description: string;
  location: string;
  startISO: string; // e.g. "20260619T090000"
  endISO: string;   // e.g. "20260619T130000"
  url: string;
}): string {
  const now = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15) + 'Z';
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MSK Niagara//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART;TZID=America/Toronto:${params.startISO}`,
    `DTEND;TZID=America/Toronto:${params.endISO}`,
    `DTSTAMP:${now}`,
    `UID:msk-symposium-2026@msk-niagara.ca`,
    `SUMMARY:${params.title}`,
    `DESCRIPTION:${params.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${params.location}`,
    `URL:${params.url}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

function downloadICS(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function Timeline() {
  const { t, language } = useLanguage();
  usePageMeta(
    language === 'en' ? 'Timeline & Events | MSK Niagara' : 'Chronologie et événements | MSK Niagara',
    language === 'en'
      ? "Key milestones, events, and symposiums in the MSK Niagara research partnership's history."
      : "Jalons clés, événements et symposiums de l'histoire du partenariat de recherche MSK Niagara."
  );

  const timelineEvents = [
    {
      dateValue: new Date('2022-12-31'),
      date: '2022',
      title: language === 'en' ? 'Initiative Formation' : 'Formation de l\'initiative',
      description: language === 'en'
        ? 'Social Justice Research Institute, Brock University, formally initiates discussion amongst SJRI members to form a research partnership with community organizations in the Niagara region.'
        : 'L\'Institut de recherche sur la justice sociale de l\'Université Brock lance formellement une discussion entre les membres de l\'IRJS pour former un partenariat de recherche avec les organisations communautaires de la région de Niagara.',
      participants: language === 'en' ? 'SJRI Members, Community Organizations' : 'Membres de l\'IRJS, Organisations communautaires',
    },
    {
      dateValue: new Date('2023-12-31'),
      date: '2023',
      title: language === 'en' ? 'SSHRC Application' : 'Demande au CRSH',
      description: language === 'en'
        ? 'Team of 12 scholars from Brock University, University of Toronto, York University and University at Buffalo (SUNY), and 11 community organizations apply to SSHRC for Partnership Development Grant to support the Mobilizing Subjugated Knowledges for a Just and Inclusive Niagara initiative. Dr. Livianna Tossutti and Dr. Jean Ntakirutimana of Brock University agree to serve as co-directors.'
        : 'Équipe de 12 chercheurs de l\'Université Brock, de l\'Université de Toronto, de l\'Université York et de l\'Université de Buffalo (SUNY), et 11 organisations communautaires présentent une demande au CRSH pour une subvention de développement de partenariat afin de soutenir l\'initiative Mobiliser les savoirs subjugués pour un Niagara juste et inclusif. Dre Livianna Tossutti et Dr Jean Ntakirutimana de l\'Université Brock acceptent d\'être codirecteurs.',
      participants: language === 'en' ? '12 Scholars, 11 Community Organizations' : '12 Chercheurs, 11 Organisations communautaires',
    },
    {
      dateValue: new Date('2024-03-31'),
      date: language === 'en' ? 'March 2024' : 'Mars 2024',
      title: language === 'en' ? 'SSHRC Grant Awarded' : 'Subvention CRSH accordée',
      description: language === 'en'
        ? 'SSHRC awards Partnership Development Grant of $199,930 for March 2024–March 2027 period.'
        : 'Le CRSH accorde une subvention de développement de partenariat de 199 930 $ pour la période de mars 2024 à mars 2027.',
      participants: language === 'en' ? 'Research Team, SSHRC' : 'Équipe de recherche, CRSH',
    },
    {
      dateValue: new Date('2025-12-31'),
      date: '2024–2025',
      title: language === 'en' ? 'Partnership Expansion' : 'Expansion du partenariat',
      description: language === 'en'
        ? 'The partnership expands: seven community organizations and 10 academic researchers join the initiative.'
        : 'Le partenariat s\'élargit : sept organisations communautaires et 10 chercheurs universitaires rejoignent l\'initiative.',
      participants: language === 'en' ? '7 New Community Organizations, 10 New Researchers' : '7 Nouvelles organisations communautaires, 10 Nouveaux chercheurs',
    },
    {
      dateValue: new Date('2024-07-31'),
      date: language === 'en' ? 'July 2024' : 'Juillet 2024',
      title: language === 'en' ? 'Visioning Event – Official Launch' : 'Événement de vision – Lancement officiel',
      description: language === 'en'
        ? 'Visioning Event at Brock University – Official launch of Mobilizing Subjugated Knowledges for a Just and Inclusive Niagara initiative.'
        : 'Événement de vision à l\'Université Brock – Lancement officiel de l\'initiative Mobiliser les savoirs subjugués pour un Niagara juste et inclusif.',
      participants: language === 'en' ? 'All Partnership Members, Stakeholders' : 'Tous les membres du partenariat, Parties prenantes',
    },
    {
      dateValue: new Date('2025-06-30'),
      date: language === 'en' ? 'June 2025' : 'Juin 2025',
      title: language === 'en' ? 'Spring Meeting' : 'Réunion du printemps',
      description: language === 'en'
        ? 'Spring Meeting at Brock University bringing together research hubs and community partners for progress updates and strategic planning.'
        : 'Réunion du printemps à l\'Université Brock réunissant les pôles de recherche et les partenaires communautaires pour les mises à jour des progrès et la planification stratégique.',
      participants: language === 'en' ? 'Research Hub Teams, Community Partners' : 'Équipes des pôles de recherche, Partenaires communautaires',
    },
    {
      dateValue: new Date('2026-06-19'),
      date: language === 'en' ? 'June 19, 2026' : '19 juin 2026',
      title: language === 'en' ? '★ Community-University Symposium — Civic Square, Welland' : '★ Symposium communautaire-universitaire — Civic Square, Welland',
      description: language === 'en'
        ? 'The MSK/MSM team presents preliminary findings on five research projects focused on improving public and institutional awareness about the issues, needs and identities of Afro-descendant, immigrant and refugee populations in Niagara. Supported by the Social Justice Research Institute at Brock University. 9:00 AM – 1:00 PM, followed by a light lunch.'
        : 'L\'équipe MSK/MSM présente les résultats préliminaires de cinq projets de recherche visant à sensibiliser le public et les institutions aux enjeux des populations afro-descendantes, immigrantes et réfugiées du Niagara. Soutenu par l\'Institut de recherche sur la justice sociale de l\'Université Brock. 9 h – 13 h, suivi d\'un déjeuner léger.',
      participants: language === 'en' ? 'All Partnership Members, Research Community, Public — Registration Open' : 'Tous les membres du partenariat, Communauté de recherche, Public — Inscription ouverte',
      isFeatured: true,
      locationUrl: 'https://maps.app.goo.gl/nEzwTCaAiYCJ43Kn9',
    },
    {
      dateValue: new Date('2027-03-31'),
      date: '2027',
      title: language === 'en' ? 'Grant Period Conclusion' : 'Fin de la période de subvention',
      description: language === 'en'
        ? 'Conclusion of the SSHRC Partnership Development Grant (March 2024–March 2027) period. Final research outputs, recommendations, and knowledge translation activities.'
        : 'Conclusion de la période de la subvention de développement de partenariat du CRSH (mars 2024 – mars 2027). Productions finales de recherche, recommandations et activités de transfert de connaissances.',
      participants: language === 'en' ? 'Research Team, Partners, SSHRC' : 'Équipe de recherche, Partenaires, CRSH',
    },
  ];

  const allEvents = [
    {
      dateValue: new Date('2026-06-19'),
      date: language === 'en' ? 'June 19, 2026' : '19 juin 2026',
      time: '9:00 AM – 1:00 PM',
      title: language === 'en' ? 'Community-University Symposium' : 'Symposium communautaire-universitaire',
      description: language === 'en'
        ? 'The MSK/MSM team will present their preliminary findings on five research projects focused on improving public and institutional awareness about the issues, needs and identities of Afro-descendant and immigrant and refugee populations in Niagara. The symposium will begin with morning refreshments at 9am and conclude at about 1pm, followed by a light lunch. We are grateful to the Social Justice Research Institute at Brock University for its generous support of this event.'
        : 'L\'équipe MSK/MSM présentera les résultats préliminaires sur les cinq projets de recherche visant à sensibiliser le public et les institutions aux enjeux des populations afro-descendantes, immigrantes et réfugiées du Niagara. Le symposium commencera par des rafraîchissements à 9 h et se terminera vers 13 h, suivi d\'un déjeuner léger. Nous remercions l\'Institut de recherche sur la justice sociale (SJRI) de l\'Université Brock pour son généreux soutien.',
      location: language === 'en' ? 'Community Room, Civic Square, Welland, ON' : 'Salle communautaire, Civic Square, Welland, ON',
      locationUrl: 'https://maps.app.goo.gl/nEzwTCaAiYCJ43Kn9',
      registration: language === 'en' ? 'Open (RSVP by May 29)' : 'Ouverte (RSVP avant le 29 mai)',
      registrationUrl: 'https://doodle.com/sign-up-sheet/participate/070efb40-abeb-4fb8-8d7e-7fba14025436/select',
      isFeatured: true,
    },
    {
      dateValue: new Date('2026-02-20'),
      date: language === 'en' ? 'February 20, 2026' : '20 février 2026',
      time: '1:00 PM – 3:00 PM',
      title: language === 'en' ? 'Community Partner Forum' : 'Forum des partenaires communautaires',
      description: language === 'en'
        ? 'Quarterly forum for community partners to share updates, discuss challenges, and collaborate on solutions.'
        : 'Forum trimestriel pour les partenaires communautaires pour partager des mises à jour, discuter des défis et collaborer sur des solutions.',
      location: language === 'en' ? 'Virtual' : 'Virtuel',
      registration: language === 'en' ? 'Closed' : 'Fermée',
    },
    {
      dateValue: new Date('2026-03-10'),
      date: language === 'en' ? 'March 10, 2026' : '10 mars 2026',
      time: '10:00 AM – 12:00 PM',
      title: language === 'en' ? 'Knowledge Translation Workshop' : 'Atelier de transfert de connaissances',
      description: language === 'en'
        ? 'Workshop on effective strategies for translating research findings into practical applications and public communications.'
        : 'Atelier sur les stratégies efficaces pour traduire les résultats de recherche en applications pratiques et communications publiques.',
      location: language === 'en' ? 'McMaster University, Hamilton, ON' : 'Université McMaster, Hamilton, ON',
      registration: language === 'en' ? 'Closed' : 'Fermée',
    },
  ];

  const upcomingEvents = allEvents.filter(e => !isEventPast(e.dateValue));
  const pastEvents = allEvents.filter(e => isEventPast(e.dateValue));

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-[#8B0000]">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <TimelineBeam />
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-white"
          style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 pb-28">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 mb-8"
              style={{ animation: 'fade-in-down 0.5s cubic-bezier(0.16,1,0.3,1) 0.15s both' }}>
              <Calendar className="w-3.5 h-3.5 text-white/70" />
              <span className="text-xs text-white/70 font-semibold tracking-[0.12em] uppercase">
                {language === 'en' ? 'Timeline & Events' : 'Chronologie et événements'}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl text-white font-extrabold mb-4 tracking-tight leading-none"
              style={{ fontFamily: 'var(--font-heading)', animation: 'fade-in-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s both' }}>
              {t('nav.timeline')}
            </h1>
            <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed"
              style={{ animation: 'fade-in-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.4s both' }}>
              {language === 'en'
                ? 'Explore the history of our partnership and discover upcoming events and opportunities for engagement.'
                : 'Explorez l\'histoire de notre partenariat et découvrez les événements à venir et les opportunités d\'engagement.'}
            </p>
          </div>
        </div>
      </header>

      {/* Symposium Feature Banner */}
      {!isEventPast(new Date('2026-06-19')) && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 relative z-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#8B0000] via-[#A40000] to-[#8B0000] p-0.5 shadow-2xl">
            <div className="relative bg-white rounded-[calc(1.5rem-2px)] overflow-hidden">
              {/* Animated pulse border */}
              <div className="absolute inset-0 rounded-[calc(1.5rem-2px)] border-4 border-[#8B0000]/20 animate-pulse" aria-hidden="true" />

              <div className="flex flex-col lg:flex-row items-stretch gap-0 overflow-hidden rounded-[calc(1.5rem-2px)]">
                {/* Photo panel — real symposium image */}
                <div className="relative lg:w-56 xl:w-64 flex-shrink-0 overflow-hidden">
                  <img
                    src="/community/health-literacy-symposium.jpg"
                    alt="MSK/MSM Symposium June 19 2026 — Health Literacy Hub presentation"
                    className="w-full h-40 lg:h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/60 hidden lg:block" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 lg:hidden" />
                  <span className="absolute bottom-2 left-3 text-[10px] font-bold text-white/90 uppercase tracking-wider lg:hidden">
                    MSK Symposium 2026
                  </span>
                </div>

                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 p-7 md:p-8 flex-1">
                {/* Icon cluster */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B0000] to-[#A40000] flex items-center justify-center shadow-xl">
                    <Star className="w-8 h-8 text-white fill-white" />
                  </div>
                  {/* Pulsing live dot */}
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFC956] opacity-75" />
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-[#FFC956]" />
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B0000] text-white text-xs font-bold uppercase tracking-wider">
                      <Star className="w-3 h-3 fill-white" />
                      {language === 'en' ? 'Featured Event' : 'Événement vedette'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFC956]/20 text-[#8B0000] text-xs font-bold uppercase tracking-wider border border-[#FFC956]/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFC956] animate-pulse" />
                      {language === 'en' ? 'Registration Open' : 'Inscription ouverte'}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-extrabold text-[#0A0A0A] mb-1.5" style={{ fontFamily: 'var(--font-heading)' }}>
                    {language === 'en'
                      ? 'Community-University Symposium — MSK/MSM 2026'
                      : 'Symposium communautaire-universitaire — MSK/MSM 2026'}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[#0A0A0A]/60 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#8B0000]" />
                      {language === 'en' ? 'Friday, June 19, 2026 · 9:00 AM – 1:00 PM' : 'Vendredi 19 juin 2026 · 9 h – 13 h'}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#8B0000]" />
                      <a
                        href={sanitizeUrl('https://maps.app.goo.gl/nEzwTCaAiYCJ43Kn9')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#8B0000] hover:underline font-semibold"
                      >
                        {language === 'en' ? 'Civic Square, Welland, ON' : 'Civic Square, Welland, ON'}
                      </a>
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
                  <a
                    href={sanitizeUrl('https://doodle.com/sign-up-sheet/participate/070efb40-abeb-4fb8-8d7e-7fba14025436/select')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#8B0000] text-white font-bold rounded-xl hover:bg-[#A40000] transition-all duration-300 hover:scale-105 shadow-lg text-sm"
                    aria-label={language === 'en' ? 'Register for the symposium' : 'S\'inscrire au symposium'}
                  >
                    <ExternalLink className="w-4 h-4" />
                    {language === 'en' ? 'Register Now' : 'S\'inscrire'}
                  </a>
                  <button
                    onClick={() => {
                      const ics = buildICS({
                        title: 'MSK/MSM Community-University Symposium 2026',
                        description: 'The MSK/MSM team presents preliminary findings on five research projects. Community Room, Civic Square, Welland. Supported by SJRI, Brock University.',
                        location: 'Community Room, Civic Square, Welland, Ontario',
                        startISO: '20260619T090000',
                        endISO: '20260619T130000',
                        url: 'https://msk-niagara.ca/timeline',
                      });
                      downloadICS('msk-symposium-2026.ics', ics);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#8B0000]/30 text-[#8B0000] font-bold rounded-xl hover:border-[#8B0000] hover:bg-[#8B0000]/5 transition-all duration-300 text-sm"
                    aria-label={language === 'en' ? 'Add event to calendar' : 'Ajouter l\'événement au calendrier'}
                  >
                    <Download className="w-4 h-4" />
                    {language === 'en' ? 'Add to Calendar' : 'Ajouter au calendrier'}
                  </button>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-20 relative z-20">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          <Tabs defaultValue="upcoming" className="w-full">
            <div className="bg-gradient-to-r from-gray-50 to-white px-4 sm:px-6 py-4 border-b border-gray-200">
              <TabsList className="w-full md:w-auto bg-gray-100 p-1 rounded-full gap-2">
                <TabsTrigger value="timeline" className="flex-1 md:flex-none data-[state=active]:bg-[#8B0000] data-[state=active]:text-white data-[state=inactive]:hover:bg-gray-200 rounded-full px-4 sm:px-6 py-2.5 transition-all duration-200 font-medium text-sm sm:text-base">
                  {t('timeline.partnership')}
                </TabsTrigger>
                <TabsTrigger value="upcoming" className="flex-1 md:flex-none data-[state=active]:bg-[#8B0000] data-[state=active]:text-white data-[state=inactive]:hover:bg-gray-200 rounded-full px-4 sm:px-6 py-2.5 transition-all duration-200 font-medium text-sm sm:text-base">
                  {t('timeline.upcoming')}
                  {upcomingEvents.length > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-white text-[#8B0000] rounded-full">
                      {upcomingEvents.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6 md:p-8">
              {/* Partnership Timeline Tab */}
              <TabsContent value="timeline" className="mt-0">
                <div className="relative">
                  <div className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-[#8B0000]/0 via-[#8B0000]/40 to-[#8B0000]/0" />
                  <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-[#8B0000]/20" />

                  <div className="space-y-6">
                    {timelineEvents.map((event, index) => {
                      const isPast = isEventPast(event.dateValue);
                      const isFeatured = 'isFeatured' in event && event.isFeatured;
                      return (
                        <div key={index} className="relative pl-16 group">
                          <div className="absolute left-0 top-5 flex items-center gap-2">
                            <div className={`w-14 h-8 rounded-full flex items-center justify-center text-[10px] font-bold tracking-wider border transition-all duration-300 ${
                              isFeatured
                                ? 'bg-[#FFC956] border-[#FFC956] text-[#0A0A0A] shadow-lg shadow-[#FFC956]/30'
                                : isPast
                                  ? 'bg-[#8B0000] border-[#8B0000] text-white group-hover:shadow-lg group-hover:shadow-[#8B0000]/30'
                                  : 'bg-white border-dashed border-[#8B0000]/60 text-[#8B0000]'
                            }`}>
                              {isFeatured ? '★' : isPast ? '✓' : '→'}
                            </div>
                          </div>

                          <div className={`rounded-2xl border transition-all duration-300 group-hover:shadow-md overflow-hidden ${
                            isFeatured
                              ? 'bg-gradient-to-r from-[#8B0000]/5 to-[#FFC956]/5 border-[#8B0000]/30 group-hover:border-[#8B0000]/60 ring-2 ring-[#8B0000]/10'
                              : isPast
                                ? 'bg-white border-gray-100 group-hover:border-[#8B0000]/20'
                                : 'bg-[#8B0000]/5 border-dashed border-[#8B0000]/30'
                          }`}>
                            <div className="p-5 md:p-6">
                              {isFeatured && (
                                <div className="flex items-center gap-2 mb-3">
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B0000] text-white text-xs font-bold uppercase tracking-wider">
                                    <Star className="w-3 h-3 fill-white" />
                                    {language === 'en' ? 'Upcoming Symposium' : 'Symposium à venir'}
                                  </span>
                                  <span className="flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-[#FFC956] opacity-75" />
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FFC956]" />
                                  </span>
                                </div>
                              )}
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                                <div className="flex items-center gap-3">
                                  <span className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full ${
                                    isFeatured
                                      ? 'bg-[#8B0000]/10 text-[#8B0000] border border-[#8B0000]/20'
                                      : isPast
                                        ? 'bg-[#8B0000]/8 text-[#8B0000]'
                                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                                  }`}>
                                    {event.date}
                                  </span>
                                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                                    isFeatured ? 'text-[#8B0000]' : isPast ? 'text-gray-400' : 'text-amber-600'
                                  }`}>
                                    {isFeatured ? (language === 'en' ? 'Featured' : 'Vedette') : isPast ? t('timeline.past') : t('common.upcoming')}
                                  </span>
                                </div>
                              </div>

                              <h3 className={`text-lg font-bold mb-2 leading-snug ${isFeatured ? 'text-[#8B0000]' : 'text-[#0A0A0A]'}`}
                                style={{ fontFamily: 'var(--font-heading)' }}>
                                {event.title}
                              </h3>
                              <p className="text-sm text-gray-500 leading-relaxed mb-3">{event.description}</p>
                              <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                                <Users className="w-3.5 h-3.5 shrink-0" />
                                <span>{event.participants}</span>
                              </div>
                              {'locationUrl' in event && event.locationUrl && (
                                <a
                                  href={sanitizeUrl(event.locationUrl)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 text-xs text-[#8B0000] hover:underline font-semibold"
                                >
                                  <MapPin className="w-3.5 h-3.5" />
                                  {language === 'en' ? 'View on Map' : 'Voir sur la carte'}
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>

              {/* Upcoming Events Tab */}
              <TabsContent value="upcoming" className="mt-0 space-y-10">

                {/* Upcoming events */}
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <Calendar className="w-4 h-4 text-[#8B0000]" />
                    <h2 className="text-sm font-bold tracking-[0.12em] uppercase text-[#8B0000]">
                      {language === 'en' ? 'Upcoming' : 'À venir'}
                    </h2>
                  </div>

                  {upcomingEvents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-8 text-center rounded-2xl border border-dashed border-gray-200 bg-gray-50" role="status">
                      <Inbox className="w-10 h-10 text-gray-300 mb-4" />
                      <p className="text-base font-semibold text-gray-500 mb-1">
                        {language === 'en' ? 'No upcoming events at this time' : 'Aucun événement à venir pour l\'instant'}
                      </p>
                      <p className="text-sm text-gray-400 max-w-sm">
                        {language === 'en'
                          ? 'Check back soon — new events and opportunities will be announced here as they are scheduled.'
                          : 'Revenez bientôt — de nouveaux événements et opportunités seront annoncés ici au fur et à mesure de leur planification.'}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6">
                      {upcomingEvents.map((event, index) => (
                        <EventCard key={index} event={event} isPast={false} language={language} t={t} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Past events */}
                {pastEvents.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-5">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <h2 className="text-sm font-bold tracking-[0.12em] uppercase text-gray-400">
                        {language === 'en' ? 'Recently Held' : 'Récemment tenus'}
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                      {pastEvents.map((event, index) => (
                        <EventCard key={index} event={event} isPast={true} language={language} t={t} />
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// ─── EventData Interface ──────────────────────────────────────────────────────

interface EventData {
  dateValue: Date;
  date: string;
  time: string;
  title: string;
  description: string;
  location: string;
  locationUrl?: string;
  registration: string;
  registrationUrl?: string;
  isFeatured?: boolean;
}

// ─── EventCard Component ─────────────────────────────────────────────────────

function EventCard({ event, isPast, language, t }: {
  event: EventData;
  isPast: boolean;
  language: string;
  t: (key: string) => string;
}) {
  const featured = event.isFeatured && !isPast;

  return (
    <article className={`transition-all duration-300 rounded-2xl overflow-hidden ${
      featured
        ? 'ring-2 ring-[#8B0000] shadow-2xl'
        : isPast
          ? 'opacity-70'
          : 'hover:shadow-lg'
    }`}>
      {featured && (
        <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#8B0000] to-[#A40000]">
          <Star className="w-4 h-4 text-[#FFC956] fill-[#FFC956]" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            {language === 'en' ? 'Featured Event — Registration Open' : 'Événement vedette — Inscription ouverte'}
          </span>
          <span className="ml-auto flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-[#FFC956] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FFC956]" />
          </span>
        </div>
      )}
      <Card className={`rounded-none border-0 shadow-none ${featured ? 'bg-gradient-to-br from-white to-[#8B0000]/5' : ''}`}>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {isPast ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold">
                <Clock className="w-3 h-3" />
                {language === 'en' ? 'Past Event' : 'Événement passé'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#8B0000]/10 text-[#8B0000] text-xs font-semibold">
                <Calendar className="w-3 h-3" />
                {language === 'en' ? 'Upcoming' : 'À venir'}
              </span>
            )}
            <span className={`font-semibold text-sm ${isPast ? 'text-gray-400' : 'text-[#8B0000]'}`}>
              {event.date}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-[#0A0A0A]/50 text-sm">{event.time}</span>
          </div>
          <h3 className={`text-xl leading-none ${isPast ? 'text-gray-500' : 'text-[#0A0A0A]'}`} data-slot="card-title">{event.title}</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className={isPast ? 'text-gray-400' : 'text-[#0A0A0A]/70'}>{event.description}</p>

          <div className="flex items-center gap-2 text-[#0A0A0A]/60">
            <MapPin className="w-4 h-4 shrink-0" />
            {event.locationUrl ? (
              <a href={sanitizeUrl(event.locationUrl)} target="_blank" rel="noopener noreferrer" className="text-sm text-[#8B0000] hover:underline flex items-center gap-1">
                {event.location}
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <span className="text-sm">{event.location}</span>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#0A0A0A]/50">{t('timeline.registration')}:</span>
              <Badge
                variant={event.registration === 'Closed' || event.registration === 'Fermée' ? 'secondary' : 'default'}
                className={event.registration !== 'Closed' && event.registration !== 'Fermée' ? 'bg-[#089EA5] hover:bg-[#067A80]' : ''}
              >
                {event.registration}
              </Badge>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {event.registrationUrl && !isPast && (
                <a
                  href={sanitizeUrl(event.registrationUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#8B0000] text-white text-sm font-medium rounded-lg hover:bg-[#A40000] transition-colors inline-flex items-center gap-2"
                  aria-label={language === 'en' ? `Register for ${event.title}` : `S'inscrire à ${event.title}`}
                >
                  {t('timeline.register')}
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {featured && (
                <button
                  onClick={() => {
                    const ics = buildICS({
                      title: 'MSK/MSM Community-University Symposium 2026',
                      description: event.description,
                      location: event.location,
                      startISO: '20260619T090000',
                      endISO: '20260619T130000',
                      url: 'https://msk-niagara.ca/timeline',
                    });
                    downloadICS('msk-symposium-2026.ics', ics);
                  }}
                  className="px-4 py-2 border-2 border-[#8B0000]/30 text-[#8B0000] text-sm font-semibold rounded-lg hover:border-[#8B0000] hover:bg-[#8B0000]/5 transition-colors inline-flex items-center gap-2"
                  aria-label={language === 'en' ? 'Add event to calendar' : 'Ajouter au calendrier'}
                >
                  <Download className="w-4 h-4" />
                  {language === 'en' ? 'Add to Calendar' : 'Calendrier'}
                </button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
