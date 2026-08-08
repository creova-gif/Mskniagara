import { sanitizeEmail, sanitizeUrl } from '../utils/security';
import { useLanguage } from '../contexts/LanguageContext';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useMemo, useState } from 'react';
import { DataGrid } from '../components/HeroAnimations';
import { usePageMeta } from '../hooks/usePageMeta';
import { ExternalLink, Users, Calendar, Mail, TrendingUp, Heart, Zap, GraduationCap, HandHeart, Sprout, Network, Activity, Target, Search, ArrowRight, CheckCircle2, Clock, MapPin, Filter, X, type LucideIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useSanityQuery } from '../../lib/sanity/useSanityQuery';
import { researchProjectsQuery, type ResearchProject } from '../../lib/sanity/queries/researchProject';

const PROJECT_ICONS: Record<string, LucideIcon> = { GraduationCap, HandHeart, Sprout, Network, Activity };

const HUB_SHORT: Record<string, { en: string; fr: string }> = {
  'Childhood and Growing Up Hub': { en: 'Childhood', fr: 'Enfance' },
  'Identity, Connections and Belonging Hub': { en: 'Identity & Belonging', fr: 'Identité' },
  'Health Literacy Hub': { en: 'Health Literacy', fr: 'Santé' },
};

export function ResearchProjects() {
  const { language } = useLanguage();
  usePageMeta(
    language === 'en' ? 'Projects | MSK Niagara' : 'Projets | MSK Niagara',
    language === 'en'
      ? 'Active research initiatives underway within the MSK Niagara partnership.'
      : 'Initiatives de recherche actives menées dans le cadre du partenariat MSK Niagara.'
  );
  const [filterHub, setFilterHub] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const { data: rawProjects } = useSanityQuery<ResearchProject[]>(researchProjectsQuery);
  const projects = useMemo(
    () =>
      (rawProjects ?? []).map((p) => {
        const hubName = p.hub?.name.en ?? '';
        const short = HUB_SHORT[hubName] ?? { en: hubName, fr: hubName };
        return {
          title: p.title.en,
          titleFr: p.title.fr,
          tldr: p.tldr?.en,
          tldrFr: p.tldr?.fr,
          hub: hubName,
          hubFr: p.hub?.name.fr ?? '',
          hubShort: short.en,
          hubShortFr: short.fr,
          status: p.status ?? 'planning',
          IconComponent: (p.icon && PROJECT_ICONS[p.icon]) || Target,
          color: p.color ?? '#CC0000',
          description: p.description.en,
          descriptionFr: p.description.fr,
          participants: p.participants?.en ?? '',
          participantsFr: p.participants?.fr ?? '',
          timeline: p.timeline ?? '',
          contact: p.contact ?? '',
          contactEmail: p.contactEmail ?? '',
          surveyLink: p.externalLink,
          location: p.location?.en ?? '',
          locationFr: p.location?.fr ?? '',
          keyFocus: (p.keyFocus ?? []).map((k) => k.en),
          keyFocusFr: (p.keyFocus ?? []).map((k) => k.fr),
        };
      }),
    [rawProjects]
  );


  const filteredProjects = projects.filter(project => {
    const hubMatch = filterHub === 'all' || project.hub === filterHub;
    const statusMatch = filterStatus === 'all' || project.status === filterStatus;
    return hubMatch && statusMatch;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      recruiting: 'bg-[#FFC956] text-[#0A0A0A] border-[#FFC956]',
      active: 'bg-[#089EA5] text-white border-[#089EA5]',
      planning: 'bg-[#6635B1] text-white border-[#6635B1]',
    };
    const labels = {
      recruiting: language === 'en' ? 'Recruiting' : 'Recrutement',
      active: language === 'en' ? 'Active' : 'Actif',
      planning: language === 'en' ? 'Planning' : 'Planification',
    };
    return { style: styles[status as keyof typeof styles], label: labels[status as keyof typeof labels] };
  };

  // Statistics
  const stats = [
    { 
      label: language === 'en' ? 'Active Projects' : 'Projets actifs', 
      value: '5',
      icon: TrendingUp,
      color: '#089EA5'
    },
    { 
      label: language === 'en' ? 'Research Hubs' : 'Pôles de recherche', 
      value: '3',
      icon: Target,
      color: '#6635B1'
    },
    { 
      label: language === 'en' ? 'Team Members' : 'Membres d\'équipe', 
      value: '56',
      icon: Users,
      color: '#FFC956'
    },
    { 
      label: language === 'en' ? 'Community Partners' : 'Partenaires', 
      value: '24',
      icon: HandHeart,
      color: '#CC0000'
    },
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#CC0000]">
        {/* Dot-grid brand motif */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
        />
        {/* Data grid materialising — research data visualisation */}
        <DataGrid />
        {/* Hub color strips at bottom for visual connection to projects */}
        <div className="absolute bottom-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-[#089EA5]" />
          <div className="flex-1 bg-[#7B5EA7]" />
          <div className="flex-1 bg-[#C97B2E]" />
        </div>
        {/* Diagonal cut bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-white"
          style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-24 pb-28">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 shadow-lg"
              style={{ animation: 'fade-in-down 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s both' }}>
              <span className="text-sm text-white font-medium">
                {language === 'en' ? 'Community-Engaged Research' : 'Recherche communautaire'}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight font-extrabold"
              style={{ fontFamily: 'var(--font-heading)', animation: 'fade-in-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}>
              {language === 'en' ? 'Research Projects' : 'Projets de recherche'}
            </h1>
            <p className="text-lg md:text-xl text-white/75 max-w-3xl mx-auto leading-relaxed"
              style={{ animation: 'fade-in-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.38s both' }}>
              {language === 'en'
                ? 'Explore our community-engaged research projects addressing critical issues facing newcomer and marginalized communities in the Niagara region.'
                : 'Explorez nos projets de recherche communautaire qui abordent des enjeux critiques auxquels font face les communautés nouvelles arrivantes et marginalisées dans la région de Niagara.'}
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 relative z-20 mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#CC0000]/10 flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-6 h-6 text-[#CC0000]" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#0A0A0A] mb-1">{stat.value}</div>
                  <div className="text-xs text-[#0A0A0A]/60 font-medium">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Research in Action — scrolling photo strip */}
      <div className="relative overflow-hidden py-2 mb-0 bg-[#0A0A0A]">
        <div className="flex items-center gap-3 px-4 sm:px-6 lg:px-8 pt-6 pb-3 mx-auto max-w-7xl">
          <div className="w-4 h-px bg-white/30" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">
            {language === 'en' ? 'Research in Action · Niagara Region' : 'Recherche en action · Région de Niagara'}
          </span>
        </div>
        <div className="flex gap-3 pb-6 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl overflow-x-auto scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {[
            { src: '/community/community-voice-speaking.jpg', caption: language === 'en' ? 'Community voice in research' : 'Voix communautaire dans la recherche', tag: language === 'en' ? 'Participatory' : 'Participatif' },
            { src: '/community/health-literacy-symposium.jpg', caption: language === 'en' ? 'Health Literacy Hub — Symposium 2026' : 'Pôle Santé — Symposium 2026', tag: language === 'en' ? 'Health Literacy' : 'Santé' },
            { src: '/community/symposium-participants-discussion.jpg', caption: language === 'en' ? 'Participants in table discussion' : 'Participants en discussion', tag: language === 'en' ? 'Community' : 'Communauté' },
            { src: '/community/researchers-engaging.jpg', caption: language === 'en' ? 'Researchers and community connecting' : 'Chercheurs et communauté', tag: language === 'en' ? 'Engagement' : 'Engagement' },
            { src: '/community/community-laughter-connection.jpg', caption: language === 'en' ? 'Real human connection at the core' : 'Connexion humaine au cœur', tag: language === 'en' ? 'Connection' : 'Connexion' },
          ].map((photo, i) => (
            <div key={i} className="group relative flex-shrink-0 w-56 h-40 snap-start overflow-hidden rounded-2xl cursor-pointer">
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-2 right-2">
                <span className="px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wide">
                  {photo.tag}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white/90 text-[11px] font-medium leading-snug">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 relative z-20">
        
        {/* Filter Section - Enhanced Design */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border-2 border-gray-100 p-8 md:p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#CC0000] to-[#A40000] flex items-center justify-center shadow-lg">
                <Filter className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] mb-1">
                  {language === 'en' ? 'Filter Projects' : 'Filtrer les projets'}
                </h2>
                <p className="text-sm text-[#0A0A0A]/60">
                  {language === 'en' 
                    ? 'Refine your search by research hub and project status'
                    : 'Affinez votre recherche par pôle de recherche et statut de projet'}
                </p>
              </div>
              {(filterHub !== 'all' || filterStatus !== 'all') && (
                <button
                  onClick={() => {
                    setFilterHub('all');
                    setFilterStatus('all');
                  }}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold bg-white border-2 border-[#CC0000]/20 text-[#CC0000] hover:border-[#CC0000] hover:bg-[#CC0000] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">{language === 'en' ? 'Clear' : 'Effacer'}</span>
                </button>
              )}
            </div>
            
            {/* Dropdown Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hub Filter Dropdown */}
              <div>
                <label className="block text-xs font-bold text-[#0A0A0A]/50 uppercase tracking-wider mb-3">
                  <span className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#CC0000]" />
                    {language === 'en' ? 'Research Hub' : 'Pôle de recherche'}
                  </span>
                </label>
                <Select value={filterHub} onValueChange={setFilterHub}>
                  <SelectTrigger
                    aria-label={language === 'en' ? 'Research Hub' : 'Pôle de recherche'}
                    className="w-full h-14 text-base font-semibold border-2 border-gray-200 hover:border-[#CC0000]/50 focus:border-[#CC0000] bg-white rounded-xl shadow-sm transition-all duration-300"
                  >
                    <SelectValue placeholder={language === 'en' ? 'Select a hub...' : 'Sélectionner un pôle...'} />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-200 rounded-xl shadow-2xl">
                    <SelectItem value="all" className="text-base font-semibold py-3 cursor-pointer hover:bg-gray-50">
                      <span className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#0A0A0A]"></div>
                        {language === 'en' ? 'All Hubs' : 'Tous les pôles'}
                      </span>
                    </SelectItem>
                    <SelectItem value="Childhood and Growing Up Hub" className="text-base font-semibold py-3 cursor-pointer hover:bg-gray-50">
                      <span className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#089EA5]"></div>
                        <span className="mr-2">🌱</span>
                        {language === 'en' ? 'Childhood & Growing Up' : 'Enfance et croissance'}
                      </span>
                    </SelectItem>
                    <SelectItem value="Identity, Connections and Belonging Hub" className="text-base font-semibold py-3 cursor-pointer hover:bg-gray-50">
                      <span className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#6635B1]"></div>
                        <span className="mr-2">🤝</span>
                        {language === 'en' ? 'Identity & Belonging' : 'Identité et appartenance'}
                      </span>
                    </SelectItem>
                    <SelectItem value="Health Literacy Hub" className="text-base font-semibold py-3 cursor-pointer hover:bg-gray-50">
                      <span className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#12647F]"></div>
                        <span className="mr-2">🏥</span>
                        {language === 'en' ? 'Health Literacy' : 'Littératie en santé'}
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filter Dropdown */}
              <div>
                <label className="block text-xs font-bold text-[#0A0A0A]/50 uppercase tracking-wider mb-3">
                  <span className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#CC0000]" />
                    {language === 'en' ? 'Project Status' : 'Statut du projet'}
                  </span>
                </label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger
                    aria-label={language === 'en' ? 'Project Status' : 'Statut du projet'}
                    className="w-full h-14 text-base font-semibold border-2 border-gray-200 hover:border-[#CC0000]/50 focus:border-[#CC0000] bg-white rounded-xl shadow-sm transition-all duration-300"
                  >
                    <SelectValue placeholder={language === 'en' ? 'Select a status...' : 'Sélectionner un statut...'} />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-200 rounded-xl shadow-2xl">
                    <SelectItem value="all" className="text-base font-semibold py-3 cursor-pointer hover:bg-gray-50">
                      <span className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#0A0A0A]"></div>
                        {language === 'en' ? 'All Status' : 'Tous les statuts'}
                      </span>
                    </SelectItem>
                    <SelectItem value="active" className="text-base font-semibold py-3 cursor-pointer hover:bg-gray-50">
                      <span className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#089EA5]"></div>
                        <CheckCircle2 className="w-4 h-4 text-[#089EA5]" />
                        {language === 'en' ? 'Active' : 'Actif'}
                      </span>
                    </SelectItem>
                    <SelectItem value="recruiting" className="text-base font-semibold py-3 cursor-pointer hover:bg-gray-50">
                      <span className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#FFC956]"></div>
                        <Users className="w-4 h-4 text-[#FFC956]" />
                        {language === 'en' ? 'Recruiting' : 'Recrutement'}
                      </span>
                    </SelectItem>
                    <SelectItem value="planning" className="text-base font-semibold py-3 cursor-pointer hover:bg-gray-50">
                      <span className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#6635B1]"></div>
                        <Clock className="w-4 h-4 text-[#6635B1]" />
                        {language === 'en' ? 'Planning' : 'Planification'}
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters Display */}
            {(filterHub !== 'all' || filterStatus !== 'all') && (
              <div className="mt-6 pt-6 border-t-2 border-gray-200">
                <p className="text-xs font-bold text-[#0A0A0A]/50 uppercase tracking-wider mb-3">
                  {language === 'en' ? 'Active Filters' : 'Filtres actifs'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {filterHub !== 'all' && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#CC0000]/10 border-2 border-[#CC0000]/30 text-[#CC0000] font-semibold">
                      <Target className="w-4 h-4" />
                      <span className="text-sm">
                        {filterHub === 'Childhood and Growing Up Hub' ? (language === 'en' ? 'Childhood & Growing Up' : 'Enfance et croissance') :
                         filterHub === 'Identity, Connections and Belonging Hub' ? (language === 'en' ? 'Identity & Belonging' : 'Identité et appartenance') :
                         filterHub === 'Health Literacy Hub' ? (language === 'en' ? 'Health Literacy' : 'Littératie en santé') : ''}
                      </span>
                      <button onClick={() => setFilterHub('all')} className="hover:bg-[#CC0000] hover:text-white rounded-full p-0.5 transition-colors">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                  {filterStatus !== 'all' && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#CC0000]/10 border-2 border-[#CC0000]/30 text-[#CC0000] font-semibold">
                      <Activity className="w-4 h-4" />
                      <span className="text-sm">
                        {filterStatus === 'active' ? (language === 'en' ? 'Active' : 'Actif') :
                         filterStatus === 'recruiting' ? (language === 'en' ? 'Recruiting' : 'Recrutement') :
                         filterStatus === 'planning' ? (language === 'en' ? 'Planning' : 'Planification') : ''}
                      </span>
                      <button onClick={() => setFilterStatus('all')} className="hover:bg-[#CC0000] hover:text-white rounded-full p-0.5 transition-colors">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Projects Grid - Enhanced Cards */}
        <div className="space-y-12">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              className={`group relative bg-white rounded-3xl overflow-hidden transition-all duration-500 border-2 ${
                hoveredProject === index 
                  ? 'shadow-2xl scale-[1.01] border-white/0' 
                  : 'shadow-lg border-gray-100'
              }`}
            >
              {/* Gradient Border Effect */}
              {hoveredProject === index && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#CC0000] to-[#A40000] opacity-100 transition-opacity duration-500"></div>
              )}
              <div className="absolute inset-[2px] bg-white rounded-3xl"></div>
              
              <div className="relative z-10 p-8 md:p-10 lg:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left Column: Icon & Metadata */}
                  <div className="lg:col-span-3 space-y-5">
                    {/* Project Icon — hub color */}
                    <div className={`relative w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-500 ${
                      hoveredProject === index ? 'scale-110 rotate-2' : ''
                    }`}
                      style={{ background: `linear-gradient(to bottom right, ${project.color}, ${project.color}bb)` }}>
                      <project.IconComponent className="w-12 h-12 text-white" />
                    </div>

                    {/* Hub color pill */}
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: project.color }} />
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: project.color }}>
                        {language === 'en' ? project.hubShort : project.hubShortFr}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div>
                      <Badge
                        className="text-white text-xs font-bold px-3 py-1"
                        style={{ backgroundColor: project.color, borderColor: project.color }}
                      >
                        {getStatusBadge(project.status).label}
                      </Badge>
                    </div>
                    
                    {/* Metadata */}
                    <div className="space-y-2.5 text-sm">
                      <div className="flex items-center gap-2.5 text-[#0A0A0A]/60">
                        <Calendar className="w-4 h-4 flex-shrink-0" style={{ color: project.color }} />
                        <span className="font-medium">{project.timeline}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[#0A0A0A]/60">
                        <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: project.color }} />
                        <span className="font-medium">{language === 'en' ? project.location : project.locationFr}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column: Content */}
                  <div className="lg:col-span-9 space-y-6">
                    {/* Title */}
                    <div>
                      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A0A0A] leading-tight transition-colors duration-300 ${
                        hoveredProject === index ? 'text-[#CC0000]' : ''
                      }`}>
                        {language === 'en' ? project.title : project.titleFr}
                      </h2>
                    </div>

                    {/* TL;DR / Plain Language Summary (Cognitive Accessibility) */}
                    {project.tldr && (
                      <div className="bg-[#CC0000]/5 border-l-4 border-[#CC0000] p-4 rounded-r-2xl">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#CC0000] bg-[#CC0000]/10 px-2 py-0.5 rounded">
                            TL;DR · {language === 'en' ? 'Plain Language Summary' : 'Résumé en langage simple'}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-[#0A0A0A]/90 leading-snug">
                          {language === 'en' ? project.tldr : project.tldrFr}
                        </p>
                      </div>
                    )}
                    
                    {/* Full Academic Description */}
                    <p className="text-base md:text-lg text-[#0A0A0A]/80 leading-relaxed">
                      {language === 'en' ? project.description : project.descriptionFr}
                    </p>
                    
                    {/* Key Focus Areas */}
                    <div>
                      <p className="text-xs font-bold text-[#0A0A0A]/50 uppercase tracking-wider mb-3">
                        {language === 'en' ? 'Key Focus Areas' : 'Domaines clés'}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(language === 'en' ? project.keyFocus : project.keyFocusFr).map((focus, i) => (
                          <div 
                            key={i} 
                            className="px-4 py-2 rounded-full text-sm font-medium border-2 border-[#CC0000]/30 bg-[#CC0000]/10 text-[#CC0000] transition-all duration-300 hover:scale-105"
                          >
                            {focus}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Project Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className={`p-5 rounded-2xl transition-all duration-300 ${
                        hoveredProject === index ? 'bg-gray-100' : 'bg-gray-50'
                      }`}>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#CC0000]/10 flex items-center justify-center flex-shrink-0">
                            <Users className="w-6 h-6 text-[#CC0000]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-[#0A0A0A]/50 uppercase tracking-wider mb-1">
                              {language === 'en' ? 'Participants' : 'Participants'}
                            </p>
                            <p className="font-semibold text-[#0A0A0A]">
                              {language === 'en' ? project.participants : project.participantsFr}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`p-5 rounded-2xl transition-all duration-300 cursor-pointer hover:ring-2 hover:ring-[#CC0000] ${
                        hoveredProject === index ? 'bg-gray-100' : 'bg-gray-50'
                      }`} onClick={() => window.location.href = `mailto:${sanitizeEmail(project.contactEmail)}`}>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#CC0000]/10 flex items-center justify-center flex-shrink-0">
                            <Mail className="w-6 h-6 text-[#CC0000]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-[#0A0A0A]/50 uppercase tracking-wider mb-1">
                              {language === 'en' ? 'Contact' : 'Contact'}
                            </p>
                            <p className="font-semibold text-[#0A0A0A] mb-0.5">{project.contact}</p>
                            <p className="text-xs text-[#0A0A0A]/60 hover:underline">{project.contactEmail}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Recruitment & Collaboration Action Buttons */}
                    <div className="pt-4 flex flex-wrap gap-3">
                      {project.surveyLink ? (
                        <Button
                          asChild
                          className="bg-gradient-to-r from-[#CC0000] to-[#A40000] hover:shadow-xl text-white font-bold px-8 py-6 rounded-xl transition-all duration-300 group/btn border-0"
                        >
                          <a href={sanitizeUrl(project.surveyLink)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3">
                            <ExternalLink className="w-5 h-5 text-[#FFC956]" />
                            <span>{language === 'en' ? 'Participate in Study / Share Story' : 'Participer à l\'étude / Partager votre histoire'}</span>
                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                          </a>
                        </Button>
                      ) : (
                        <Button
                          asChild
                          className="bg-[#CC0000] hover:bg-[#A40000] text-white font-bold px-8 py-6 rounded-xl transition-all duration-300 group/btn border-0"
                        >
                          <a href={`mailto:${sanitizeEmail(project.contactEmail)}?subject=Inquiry regarding ${encodeURIComponent(project.title)}`} className="inline-flex items-center gap-3">
                            <Mail className="w-5 h-5 text-[#FFC956]" />
                            <span>{language === 'en' ? `Get Involved · Email ${project.contact}` : `Participer · Contacter ${project.contact}`}</span>
                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-24 bg-gray-50 rounded-3xl">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#CC0000] to-[#A40000] flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Search className="w-16 h-16 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-[#0A0A0A] mb-3">
              {language === 'en' ? 'No projects found' : 'Aucun projet trouvé'}
            </h3>
            <p className="text-lg text-[#0A0A0A]/60 mb-8">
              {language === 'en' ? 'Try adjusting your filters to see more results' : 'Essayez d\'ajuster vos filtres pour voir plus de résultats'}
            </p>
            <Button
              onClick={() => {
                setFilterHub('all');
                setFilterStatus('all');
              }}
              className="bg-[#CC0000] hover:bg-[#A40000] text-white font-semibold px-8 py-6 rounded-xl"
            >
              {language === 'en' ? 'Clear All Filters' : 'Effacer tous les filtres'}
            </Button>
          </div>
        )}

        {/* Call to Action Section */}
        <div className="mt-24 mb-16 relative">
          {/* Background Blur Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#CC0000] via-[#A40000] to-[#CC0000] rounded-[3rem] blur-3xl opacity-20"></div>
          
          <div className="relative bg-gradient-to-br from-[#CC0000] via-[#A40000] to-[#6B0000] rounded-[3rem] p-12 md:p-16 lg:p-20 overflow-hidden shadow-2xl">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mb-48"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
              <div className="w-full h-full opacity-5">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="20" stroke="white" strokeWidth="0.5" />
                </svg>
              </div>
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full mb-8 shadow-lg">
                <Heart className="w-5 h-5" />
                <span className="font-semibold">
                  {language === 'en' ? 'Join Our Research Community' : 'Rejoignez notre communauté de recherche'}
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {language === 'en' 
                  ? 'Make a Difference Through Research' 
                  : 'Faites la différence par la recherche'}
              </h2>
              
              <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
                {language === 'en' 
                  ? 'Partner with us to create meaningful change in the Niagara region. Your voice and experience matter.'
                  : 'Partenariat avec nous pour créer un changement significatif dans la région de Niagara. Votre voix et votre expérience comptent.'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-[#CC0000] hover:bg-gray-100 font-bold px-10 py-7 rounded-xl text-lg shadow-xl transition-all duration-300 hover:scale-105">
                  {language === 'en' ? 'Get Involved' : 'Participez'}
                </Button>
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-bold px-10 py-7 rounded-xl text-lg backdrop-blur-sm transition-all duration-300 hover:scale-105">
                  {language === 'en' ? 'Contact Us' : 'Contactez-nous'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}