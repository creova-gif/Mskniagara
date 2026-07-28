import { useLanguage } from '../contexts/LanguageContext';
import {
  Camera, Video, FileText, Download, Calendar, MapPin,
  Play, Eye, Image as ImageIcon, ChevronRight, ExternalLink,
  Mic, BookOpen, ArrowRight, Users, BarChart3
} from 'lucide-react';
import { useState } from 'react';
import { FilmScan } from '../components/HeroAnimations';
import { usePageMeta } from '../hooks/usePageMeta';

/* ─── DATA ─────────────────────────────────────────── */

const photoGallery = [
  {
    id: 1,
    title: 'Community Consultation Workshop',
    titleFr: 'Atelier de consultation communautaire',
    date: 'Feb 15, 2025',
    dateFr: '15 fév 2025',
    location: 'Brock University',
    hub: 'Childhood & Growing Up Hub',
    hubFr: 'Pôle Enfance et croissance',
    images: 3,
    category: 'workshop',
    year: '2025',
    aspect: 'tall',
    thumbnail: '/media/workshop-childhood-hub.jpg',
  },
  {
    id: 2,
    title: 'Health Literacy Roundtable',
    titleFr: 'Table ronde littératie en santé',
    date: 'Jan 22, 2025',
    dateFr: '22 jan 2025',
    location: 'QUEST Community Health',
    hub: 'Health Literacy Hub',
    hubFr: 'Pôle Littératie en santé',
    images: 5,
    category: 'roundtable',
    year: '2025',
    aspect: 'wide',
    thumbnail: '/media/health-literacy-roundtable.jpg',
  },
  {
    id: 3,
    title: 'Partnership Launch Event',
    titleFr: 'Événement de lancement',
    date: 'Oct 10, 2024',
    dateFr: '10 oct 2024',
    location: 'Brock University, St. Catharines',
    hub: 'All Hubs',
    hubFr: 'Tous les pôles',
    images: 8,
    category: 'launch',
    year: '2024',
    aspect: 'square',
    thumbnail: '/media/partnership-launch-event.jpg',
  },
  {
    id: 4,
    title: 'Afro-Descendant Identity Workshop',
    titleFr: 'Atelier identité afro-descendante',
    date: 'Dec 5, 2024',
    dateFr: '5 déc 2024',
    location: 'Community Centre, Niagara Falls',
    hub: 'Identity, Connections & Belonging',
    hubFr: 'Pôle Identité et appartenance',
    images: 6,
    category: 'workshop',
    year: '2024',
    aspect: 'tall',
    thumbnail: '/media/identity-workshop.jpg',
  },
  {
    id: 5,
    title: 'Migrant Farmworkers Support',
    titleFr: 'Soutien aux travailleurs migrants',
    date: 'Aug 18, 2024',
    dateFr: '18 août 2024',
    location: 'St. Alban\'s Anglican Church',
    hub: 'Identity, Connections & Belonging',
    hubFr: 'Pôle Identité et appartenance',
    images: 4,
    category: 'community',
    year: '2024',
    aspect: 'wide',
    thumbnail: '/media/migrant-farmworkers-support.jpg',
  },
  {
    id: 6,
    title: 'Youth Recreation & Inclusion Forum',
    titleFr: 'Forum récréation et inclusion des jeunes',
    date: 'Nov 12, 2024',
    dateFr: '12 nov 2024',
    location: 'YWCA Niagara Region',
    hub: 'Childhood & Growing Up Hub',
    hubFr: 'Pôle Enfance et croissance',
    images: 7,
    category: 'forum',
    year: '2024',
    aspect: 'square',
    thumbnail: '/media/youth-recreation-forum.jpg',
  },
];

const videos = [
  {
    id: 1,
    title: 'Community Partner Testimonial — Bridges Niagara',
    titleFr: 'Témoignage partenaire communautaire — Bridges Niagara',
    speaker: 'Maria Santos',
    role: 'Executive Director, Bridges Niagara',
    roleFr: 'Directrice exécutive, Bridges Niagara',
    hub: 'Health Literacy Hub',
    hubFr: 'Pôle Littératie en santé',
    duration: '4:32',
    date: 'Feb 2025',
    dateFr: 'Fév 2025',
    views: 342,
    description: 'Maria shares how the MSK Partnership has strengthened health literacy programming for newcomer communities.',
    descriptionFr: 'Maria partage comment le partenariat MSK a renforcé la programmation en littératie en santé.',
    thumbnail: '/media/video-testimonial-bridges-niagara.jpg',
  },
  {
    id: 2,
    title: 'Research Impact — Dr. Jean Ntakirutimana',
    titleFr: 'Impact de la recherche — Dr Jean Ntakirutimana',
    speaker: 'Dr. Jean Ntakirutimana',
    role: 'Co-Director, MSK Partnership',
    roleFr: 'Codirecteur, Partenariat MSK',
    hub: 'Identity, Connections & Belonging',
    hubFr: 'Pôle Identité et appartenance',
    duration: '6:15',
    date: 'Jan 2025',
    dateFr: 'Jan 2025',
    views: 567,
    description: 'Dr. Ntakirutimana discusses community-engaged research and identity formation among Afro-descendant populations.',
    descriptionFr: 'Dr Ntakirutimana discute de la recherche communautaire et de la formation identitaire.',
    thumbnail: '/media/video-research-impact-ntakirutimana.jpg',
  },
  {
    id: 3,
    title: 'Community Voice — TOES Niagara',
    titleFr: 'Voix communautaire — TOES Niagara',
    speaker: 'Mariam Khayinza',
    role: 'Community Co-Leader, TOES Niagara',
    roleFr: 'Co-responsable communautaire, TOES Niagara',
    hub: 'Health Literacy Hub',
    hubFr: 'Pôle Littératie en santé',
    duration: '5:48',
    date: 'Dec 2024',
    dateFr: 'Déc 2024',
    views: 423,
    description: 'Mariam highlights the collaborative approach to improving health information access for immigrant populations.',
    descriptionFr: 'Mariam souligne l\'approche collaborative pour améliorer l\'accès à l\'information sur la santé.',
    thumbnail: '/media/video-community-voice-toes.jpg',
  },
  {
    id: 4,
    title: 'Youth Perspectives — Newcomer Students',
    titleFr: 'Perspectives des jeunes — Étudiants nouveaux arrivants',
    speaker: 'Student Focus Group',
    role: 'Newcomer Youth Participants',
    roleFr: 'Participants jeunes nouveaux arrivants',
    hub: 'Childhood & Growing Up Hub',
    hubFr: 'Pôle Enfance et croissance',
    duration: '7:22',
    date: 'Nov 2024',
    dateFr: 'Nov 2024',
    views: 789,
    description: 'Young newcomers share their experiences with housing, education, and community belonging in Niagara.',
    descriptionFr: 'Les jeunes nouveaux arrivants partagent leurs expériences de logement, d\'éducation et d\'appartenance.',
    thumbnail: '/media/video-youth-perspectives.jpg',
  },
];

const annualReports = [
  {
    id: 1,
    year: '2024–2025',
    title: 'Annual Impact Report',
    titleFr: 'Rapport d\'impact annuel',
    subtitle: 'Second Year of Partnership',
    subtitleFr: 'Deuxième année du partenariat',
    description: 'Comprehensive overview of research activities, community partnerships, knowledge mobilization, and measurable impact across all three research hubs in the Niagara region.',
    descriptionFr: 'Aperçu complet des activités de recherche, partenariats communautaires et impact mesurable dans les trois pôles de recherche.',
    pages: 48,
    fileSize: '8.2 MB',
    publishDate: 'March 2025',
    publishDateFr: 'Mars 2025',
    stats: [
      { value: '26', label: 'Community Partners', labelFr: 'Partenaires communautaires' },
      { value: '65', label: 'Team Members', labelFr: 'Membres d\'équipe' },
      { value: '12', label: 'Active Projects', labelFr: 'Projets actifs' },
      { value: '150+', label: 'Events Hosted', labelFr: 'Événements organisés' },
    ],
    downloadUrl: '#',
    color: '#8B0000',
  },
  {
    id: 2,
    year: '2023–2024',
    title: 'Inaugural Year Report',
    titleFr: 'Rapport de la première année',
    subtitle: 'Launch & Foundation',
    subtitleFr: 'Lancement et fondation',
    description: 'Launch year achievements, partnership formation, research hub establishment, and community engagement initiatives that set the foundation for a just and inclusive Niagara.',
    descriptionFr: 'Réalisations de l\'année de lancement, formation de partenariats et établissement des pôles de recherche.',
    pages: 36,
    fileSize: '6.5 MB',
    publishDate: 'October 2024',
    publishDateFr: 'Octobre 2024',
    stats: [
      { value: '18', label: 'Founding Partners', labelFr: 'Partenaires fondateurs' },
      { value: '3', label: 'Hubs Launched', labelFr: 'Pôles lancés' },
      { value: '40+', label: 'Team Members', labelFr: 'Membres d\'équipe' },
      { value: 'SSHRC', label: 'Grant Awarded', labelFr: 'Subvention octroyée' },
    ],
    downloadUrl: '#',
    color: '#0A0A0A',
  },
];

const categories = [
  { key: 'all', en: 'All Events', fr: 'Tous les événements' },
  { key: 'workshop', en: 'Workshops', fr: 'Ateliers' },
  { key: 'roundtable', en: 'Roundtables', fr: 'Tables rondes' },
  { key: 'community', en: 'Community', fr: 'Communautaire' },
  { key: 'forum', en: 'Forums', fr: 'Forums' },
  { key: 'launch', en: 'Launch Events', fr: 'Lancements' },
];

const tabs = [
  { key: 'photos', icon: Camera, en: 'Photo Gallery', fr: 'Galerie photo' },
  { key: 'videos', icon: Video, en: 'Videos', fr: 'Vidéos' },
  { key: 'reports', icon: FileText, en: 'Annual Reports', fr: 'Rapports annuels' },
];

/* ─── COMPONENT ─────────────────────────────────────── */

export function Media() {
  const { language } = useLanguage();
  usePageMeta(
    language === 'en' ? 'Media | MSK Niagara' : 'Médias | MSK Niagara',
    language === 'en'
      ? 'News, photos, and video coverage of MSK Niagara research partnership events.'
      : 'Actualités, photos et vidéos des événements du partenariat de recherche MSK Niagara.'
  );
  const [activeTab, setActiveTab] = useState<'photos' | 'videos' | 'reports'>('photos');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [lightboxPhoto, setLightboxPhoto] = useState<typeof photoGallery[0] | null>(null);
  const [lightboxVideo, setLightboxVideo] = useState<typeof videos[0] | null>(null);

  const filtered = photoGallery.filter(
    p => categoryFilter === 'all' || p.category === categoryFilter
  );

  const l = (en: string, fr: string) => language === 'en' ? en : fr;

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative bg-[#8B0000] text-white overflow-hidden">
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
        />
        {/* Film scan sweep animation — cinematic projector start-up */}
        <FilmScan />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            {/* Overline */}
            <div className="inline-flex items-center gap-2 mb-6"
              style={{ animation: 'fade-in-up 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s both' }}>
              <div className="w-8 h-px bg-white/40" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60">
                {l('MSK Niagara', 'MSK Niagara')}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-heading)', animation: 'fade-in-up 0.65s cubic-bezier(0.16,1,0.3,1) 0.22s both' }}>
              {l('Media &', 'Médias &')}<br />
              <span className="text-white/70">{l('Documentation', 'Documentation')}</span>
            </h1>

            <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-xl"
              style={{ animation: 'fade-in-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.38s both' }}>
              {l(
                'Community events, researcher voices, and annual impact — documented and shared.',
                'Événements communautaires, voix des chercheurs et impact annuel — documentés et partagés.'
              )}
            </p>

            {/* Stats row */}
            <div className="mt-10 flex flex-wrap gap-8"
              style={{ animation: 'fade-in-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.5s both' }}>
              {[
                { n: '6+', label: l('Photo Events', 'Événements photo') },
                { n: '4', label: l('Video Stories', 'Témoignages vidéo') },
                { n: '2', label: l('Annual Reports', 'Rapports annuels') },
              ].map(stat => (
                <div key={stat.n}>
                  <div className="text-3xl font-bold text-white">{stat.n}</div>
                  <div className="text-sm text-white/50 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TAB NAV ──────────────────────────────────── */}
      <div className="sticky top-[68px] z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={`relative flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all duration-200 ${
                    active
                      ? 'text-[#8B0000]'
                      : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{language === 'en' ? tab.en : tab.fr}</span>
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B0000]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── PHOTO GALLERY ────────────────────────────── */}
      {activeTab === 'photos' && (
        <section className="py-12 bg-gray-50 min-h-[60vh]">
          <h2 className="sr-only">{language === 'en' ? 'Photo Gallery' : 'Galerie de photos'}</h2>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Category filters */}
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setCategoryFilter(cat.key)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    categoryFilter === cat.key
                      ? 'bg-[#8B0000] text-white shadow-sm'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-[#8B0000]/40 hover:text-[#8B0000]'
                  }`}
                >
                  {language === 'en' ? cat.en : cat.fr}
                </button>
              ))}
            </div>

            {/* Masonry-style grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filtered.map((photo) => (
                <div
                  key={photo.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`View photo: ${language === 'en' ? photo.title : photo.titleFr}`}
                  className="break-inside-avoid group relative overflow-hidden rounded-2xl cursor-pointer bg-gray-900 shadow-sm hover:shadow-xl transition-all duration-300"
                  onClick={() => setLightboxPhoto(photo)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightboxPhoto(photo); } }}
                >
                  <img
                    src={photo.thumbnail}
                    alt={language === 'en' ? photo.title : photo.titleFr}
                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                      photo.aspect === 'tall' ? 'h-80' : photo.aspect === 'wide' ? 'h-52' : 'h-64'
                    }`}
                    loading="lazy"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5">
                    <div className="translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-[#8B0000] text-white text-[10px] font-semibold tracking-wider uppercase mb-2">
                        {language === 'en' ? photo.hub : photo.hubFr}
                      </span>
                      <h3 className="text-white font-bold text-base leading-snug mb-1">
                        {language === 'en' ? photo.title : photo.titleFr}
                      </h3>
                      <div className="flex items-center gap-3 text-white/60 text-xs">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {language === 'en' ? photo.date : photo.dateFr}
                        </span>
                        <span className="flex items-center gap-1">
                          <ImageIcon className="w-3 h-3" />
                          {photo.images} {l('photos', 'photos')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Always-visible image count badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
                    <ImageIcon className="w-3 h-3" />
                    {photo.images}
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <Camera className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>{l('No events match this filter.', 'Aucun événement ne correspond à ce filtre.')}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── VIDEO GALLERY ─────────────────────────────── */}
      {activeTab === 'videos' && (
        <section className="py-12 bg-gray-50 min-h-[60vh]">
          <h2 className="sr-only">{language === 'en' ? 'Video Stories' : 'Témoignages vidéo'}</h2>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#0A0A0A]" style={{ fontFamily: 'var(--font-heading)' }}>
                {l('Video Stories', 'Témoignages vidéo')}
              </h2>
              <p className="text-gray-500 mt-1">
                {l('Voices from researchers, partners, and community members.', 'Voix des chercheurs, partenaires et membres de la communauté.')}
              </p>
            </div>

            {/* Featured video (first item, large) */}
            <div
              role="button"
              tabIndex={0}
              aria-label={`Play featured video: ${language === 'en' ? videos[0]?.title : videos[0]?.titleFr}`}
              className="relative rounded-3xl overflow-hidden mb-6 cursor-pointer group shadow-xl"
              onClick={() => setLightboxVideo(videos[0])}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightboxVideo(videos[0]); } }}
            >
              <img
                src={videos[0].thumbnail}
                alt={language === 'en' ? videos[0].title : videos[0].titleFr}
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/25 transition-all duration-300 shadow-2xl">
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B0000] text-white text-xs font-semibold mb-3">
                  <Video className="w-3 h-3" />
                  {l('Featured', 'À la une')}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {language === 'en' ? videos[0].title : videos[0].titleFr}
                </h2>
                <p className="text-white/70 mb-3 max-w-lg">
                  {language === 'en' ? videos[0].description : videos[0].descriptionFr}
                </p>
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    {videos[0].speaker}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    {videos[0].views.toLocaleString()} {l('views', 'vues')}
                  </span>
                  <span>{videos[0].duration}</span>
                </div>
              </div>
            </div>

            {/* Remaining videos grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {videos.slice(1).map(video => (
                <div
                  key={video.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Play video: ${language === 'en' ? video.title : video.titleFr}`}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer bg-gray-900 shadow-sm hover:shadow-lg transition-all duration-300"
                  onClick={() => setLightboxVideo(video)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightboxVideo(video); } }}
                >
                  <img
                    src={video.thumbnail}
                    alt={language === 'en' ? video.title : video.titleFr}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                  {/* Play */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                      <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                    </div>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/60 text-white text-xs font-medium backdrop-blur-sm">
                    {video.duration}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-sm leading-snug mb-1 line-clamp-2">
                      {language === 'en' ? video.title : video.titleFr}
                    </h3>
                    <div className="flex items-center gap-3 text-white/50 text-xs">
                      <span>{language === 'en' ? video.date : video.dateFr}</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {video.views}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ANNUAL REPORTS ────────────────────────────── */}
      {activeTab === 'reports' && (
        <section className="py-16 bg-white min-h-[60vh]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Section header */}
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-px bg-[#8B0000]" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8B0000]">
                    {l('Documentation', 'Documentation')}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A0A0A] leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                  {l('Annual Reports', 'Rapports annuels')}
                </h2>
                <p className="text-gray-400 mt-2 text-sm max-w-md">
                  {l('Comprehensive documentation of our research impact and community progress.', 'Documentation complète de notre impact de recherche et progrès communautaire.')}
                </p>
              </div>
              <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-gray-300 tracking-widest uppercase">
                <BarChart3 className="w-4 h-4" />
                {annualReports.length} {l('Reports', 'Rapports')}
              </div>
            </div>

            {/* Report cards */}
            <div className="space-y-5">
              {annualReports.map((report, i) => (
                <div
                  key={report.id}
                  className="group rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500 bg-white"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] min-h-[260px]">

                    {/* Left: cover panel */}
                    <div
                      className="relative flex flex-col justify-between p-8 overflow-hidden"
                      style={{ backgroundColor: i === 0 ? '#8B0000' : '#0A0A0A' }}
                    >
                      {/* Dot-grid texture */}
                      <div className="absolute inset-0 opacity-[0.07]"
                        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />

                      {/* Ghost year watermark */}
                      <div
                        className="absolute bottom-0 left-0 right-0 text-[90px] font-extrabold leading-none text-white opacity-[0.07] tracking-tighter select-none pointer-events-none overflow-hidden"
                        style={{ fontFamily: 'var(--font-heading)', lineHeight: '0.85' }}
                      >
                        {report.year}
                      </div>

                      {/* Top: badges */}
                      <div className="relative z-10 flex flex-wrap gap-2">
                        <span className="text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full bg-white/15 text-white/70">
                          {report.year}
                        </span>
                        {i === 0 && (
                          <span className="text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full bg-white text-[#8B0000]">
                            {l('Latest', 'Dernier')}
                          </span>
                        )}
                      </div>

                      {/* Bottom: title */}
                      <div className="relative z-10 mt-auto">
                        <h3 className="text-2xl font-extrabold text-white leading-tight mb-1"
                          style={{ fontFamily: 'var(--font-heading)' }}>
                          {language === 'en' ? report.title : report.titleFr}
                        </h3>
                        <p className="text-sm text-white/50">
                          {language === 'en' ? report.subtitle : report.subtitleFr}
                        </p>
                      </div>
                    </div>

                    {/* Right: content */}
                    <div className="p-8 md:p-10 flex flex-col justify-between gap-6">

                      <div>
                        <p className="text-gray-500 leading-relaxed text-sm mb-6 max-w-xl">
                          {language === 'en' ? report.description : report.descriptionFr}
                        </p>

                        {/* Stats row — elegant horizontal */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 divide-x divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
                          {report.stats.map((stat, si) => (
                            <div key={si} className="px-4 py-3 bg-gray-50/60 text-center">
                              <div
                                className="text-xl font-extrabold leading-none mb-0.5"
                                style={{ fontFamily: 'var(--font-heading)', color: i === 0 ? '#8B0000' : '#0A0A0A' }}
                              >
                                {stat.value}
                              </div>
                              <div className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">
                                {language === 'en' ? stat.label : stat.labelFr}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom: meta + actions */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
                        <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5" />
                            {report.pages} {l('pages', 'pages')}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5" />
                            {report.fileSize}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {l(`Published ${report.publishDate}`, `Publié ${report.publishDateFr}`)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <a
                            href={report.downloadUrl}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-800 transition-all"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            {l('Preview', 'Aperçu')}
                          </a>
                          <a
                            href={report.downloadUrl}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                            style={{ backgroundColor: i === 0 ? '#8B0000' : '#0A0A0A' }}
                          >
                            <Download className="w-3.5 h-3.5" />
                            {l('Download PDF', 'Télécharger PDF')}
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA — dark editorial strip */}
            <div className="mt-10 rounded-2xl bg-[#0A0A0A] overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-6 px-10 py-8">
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 mb-2">
                    {l('Stay Informed', 'Rester informé')}
                  </p>
                  <h3 className="text-xl font-extrabold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                    {l('Want to stay informed?', 'Vous souhaitez rester informé(e) ?')}
                  </h3>
                  <p className="text-white/40 text-sm">
                    {l('Follow our research progress and receive updates on new publications.', 'Suivez nos progrès et recevez des mises à jour sur les nouvelles publications.')}
                  </p>
                </div>
                <a
                  href="mailto:contact@msk-niagara.ca"
                  className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0A0A0A] text-sm font-bold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  {l('Contact Us', 'Nous contacter')}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ── PHOTO LIGHTBOX ───────────────────────────── */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={lightboxPhoto.thumbnail}
              alt={language === 'en' ? lightboxPhoto.title : lightboxPhoto.titleFr}
              className="w-full max-h-[70vh] object-cover"
            />
            <div className="bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-[#8B0000] uppercase tracking-wider">
                    {language === 'en' ? lightboxPhoto.hub : lightboxPhoto.hubFr}
                  </span>
                  <h3 className="text-lg font-bold text-[#0A0A0A] mt-0.5" style={{ fontFamily: 'var(--font-heading)' }}>
                    {language === 'en' ? lightboxPhoto.title : lightboxPhoto.titleFr}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{language === 'en' ? lightboxPhoto.date : lightboxPhoto.dateFr}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{lightboxPhoto.location}</span>
                    <span className="flex items-center gap-1"><ImageIcon className="w-3.5 h-3.5" />{lightboxPhoto.images} {l('photos', 'photos')}</span>
                  </div>
                </div>
                <button
                  onClick={() => setLightboxPhoto(null)}
                  className="shrink-0 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors text-lg leading-none"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── VIDEO LIGHTBOX ───────────────────────────── */}
      {lightboxVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxVideo(null)}
        >
          <div
            className="relative max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Placeholder player */}
            <div className="relative bg-gray-900 aspect-video flex items-center justify-center">
              <img
                src={lightboxVideo.thumbnail}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
              <div className="relative text-center text-white p-8">
                <div className="w-20 h-20 rounded-full border-2 border-white/40 flex items-center justify-center mx-auto mb-4 bg-white/10">
                  <Play className="w-8 h-8 ml-1" fill="white" />
                </div>
                <p className="text-white/60 text-sm">{l('Video playback coming soon', 'Lecture vidéo à venir')}</p>
              </div>
            </div>
            <div className="bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-[#0A0A0A] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                    {language === 'en' ? lightboxVideo.title : lightboxVideo.titleFr}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">{lightboxVideo.speaker} · {language === 'en' ? lightboxVideo.role : lightboxVideo.roleFr}</p>
                  <p className="text-sm text-gray-600">{language === 'en' ? lightboxVideo.description : lightboxVideo.descriptionFr}</p>
                </div>
                <button
                  onClick={() => setLightboxVideo(null)}
                  className="shrink-0 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors text-lg leading-none"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
