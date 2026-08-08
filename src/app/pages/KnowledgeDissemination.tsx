import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  FileText, Video, Presentation, Download, BookOpen, Users, Globe,
  ExternalLink, Calendar, Tag, Search, Filter, Lightbulb, Share2, Eye, X,
  Copy, Check, Quote
} from 'lucide-react';
import { KnowledgeFlow } from '../components/HeroAnimations';
import { usePageMeta } from '../hooks/usePageMeta';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useState, useCallback, useMemo } from 'react';
import { useSanityQuery } from '../../lib/sanity/useSanityQuery';
import { publicationsQuery, type Publication as SanityPublication } from '../../lib/sanity/queries/publication';

// ─── Types ──────────────────────────────────────────────────────────────────

interface Publication {
  title: string;
  titleFr: string;
  type: string;
  typeFr: string;
  authors: string;
  authorsFr: string;
  date: string;
  dateFr: string;
  year: string;
  hub: string;
  hubFr: string;
  abstract: string;
  abstractFr: string;
  link: string;
  doi?: string;
  color: string;
}

// ─── Citation helpers ────────────────────────────────────────────────────────

function buildAPA(pub: Publication, lang: string): string {
  const title = lang === 'en' ? pub.title : pub.titleFr;
  const authors = lang === 'en' ? pub.authors : pub.authorsFr;
  const doi = pub.doi ? ` https://doi.org/${pub.doi}` : '';
  return `${authors} (${pub.year}). ${title}. MSK/MSM Niagara Research Partnership.${doi}`;
}

function buildBibTeX(pub: Publication): string {
  const key = pub.authors.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '') + pub.year;
  const doi = pub.doi ? `  doi       = {${pub.doi}},\n` : '';
  return `@misc{${key},\n  author    = {${pub.authors}},\n  title     = {${pub.title}},\n  year      = {${pub.year}},\n${doi}  howpublished = {MSK/MSM Niagara Research Partnership}\n}`;
}

// ─── CiteButton ─────────────────────────────────────────────────────────────

function CiteButton({ pub, language }: { pub: Publication; language: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<'apa' | 'bib' | null>(null);

  const copy = useCallback((text: string, type: 'apa' | 'bib') => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    });
  }, []);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(o => !o)}
        className="border-2 border-[#CC0000]/30 text-[#CC0000] hover:border-[#CC0000] hover:bg-[#CC0000] hover:text-white rounded-xl font-semibold transition-all duration-300 gap-2"
        aria-label={language === 'en' ? 'Cite this publication' : 'Citer cette publication'}
        aria-expanded={open}
      >
        <Quote className="w-4 h-4" />
        {language === 'en' ? 'Cite' : 'Citer'}
      </Button>

      {open && (
        <div
          role="dialog"
          aria-label={language === 'en' ? 'Citation formats' : 'Formats de citation'}
          className="absolute bottom-full left-0 mb-2 w-[340px] sm:w-[420px] bg-white rounded-2xl shadow-2xl border-2 border-gray-100 z-50 p-5 space-y-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]/50">
              {language === 'en' ? 'Citation Formats' : 'Formats de citation'}
            </span>
            <button onClick={() => setOpen(false)} aria-label="Close" className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* APA */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-[#CC0000] uppercase tracking-wider">APA 7th</span>
              <button
                onClick={() => copy(buildAPA(pub, language), 'apa')}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#CC0000] font-semibold transition-colors"
                aria-label="Copy APA citation"
              >
                {copied === 'apa' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied === 'apa' ? (language === 'en' ? 'Copied!' : 'Copié!') : (language === 'en' ? 'Copy' : 'Copier')}
              </button>
            </div>
            <p className="text-xs text-gray-600 bg-gray-50 rounded-xl p-3 leading-relaxed font-mono">
              {buildAPA(pub, language)}
            </p>
          </div>

          {/* BibTeX */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-[#CC0000] uppercase tracking-wider">BibTeX</span>
              <button
                onClick={() => copy(buildBibTeX(pub), 'bib')}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#CC0000] font-semibold transition-colors"
                aria-label="Copy BibTeX citation"
              >
                {copied === 'bib' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied === 'bib' ? (language === 'en' ? 'Copied!' : 'Copié!') : (language === 'en' ? 'Copy' : 'Copier')}
              </button>
            </div>
            <pre className="text-xs text-gray-600 bg-gray-50 rounded-xl p-3 overflow-x-auto leading-relaxed">
              {buildBibTeX(pub)}
            </pre>
          </div>

          {pub.doi && (
            <a
              href={`https://doi.org/${pub.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-[#CC0000] hover:underline font-semibold"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              DOI: {pub.doi}
            </a>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function KnowledgeDissemination() {
  const { t, language } = useLanguage();
  usePageMeta(
    language === 'en' ? 'Knowledge Dissemination | MSK Niagara' : 'Diffusion des savoirs | MSK Niagara',
    language === 'en'
      ? 'Publications, findings, and knowledge mobilization from the MSK Niagara research partnership.'
      : 'Publications, résultats et mobilisation des connaissances du partenariat de recherche MSK Niagara.'
  );
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const { data: rawPublications } = useSanityQuery<SanityPublication[]>(publicationsQuery);
  const publications: Publication[] = useMemo(
    () =>
      (rawPublications ?? []).map((p) => ({
        title: p.title.en,
        titleFr: p.title.fr,
        type: p.type?.en ?? '',
        typeFr: p.type?.fr ?? '',
        authors: p.authors.en,
        authorsFr: p.authors.fr,
        date: p.date?.en ?? '',
        dateFr: p.date?.fr ?? '',
        year: p.year,
        hub: p.hub?.name.en ?? 'All Research Hubs',
        hubFr: p.hub?.name.fr ?? 'Tous les pôles de recherche',
        abstract: p.abstract?.en ?? '',
        abstractFr: p.abstract?.fr ?? '',
        link: p.link ?? '#',
        doi: p.doi,
        color: p.color ?? '#CC0000',
      })),
    [rawPublications]
  );

  const filteredPublications = publications.filter(pub => {
    const typeMatch = filterType === 'all' || pub.type === filterType;
    const q = searchQuery.toLowerCase();
    const searchMatch = !q || (
      pub.title.toLowerCase().includes(q) ||
      pub.authors.toLowerCase().includes(q) ||
      pub.titleFr.toLowerCase().includes(q) ||
      pub.authorsFr.toLowerCase().includes(q) ||
      pub.abstract.toLowerCase().includes(q)
    );
    return typeMatch && searchMatch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return FileText;
      case 'video': return Video;
      case 'presentation': return Presentation;
      case 'report': return BookOpen;
      case 'policy': return FileText;
      case 'toolkit': return Lightbulb;
      default: return FileText;
    }
  };

  const stats = [
    { label: language === 'en' ? 'Publications' : 'Publications', value: '6', icon: BookOpen, color: '#089EA5' },
    { label: language === 'en' ? 'Research Areas' : 'Domaines de recherche', value: '3', icon: Tag, color: '#6635B1' },
    { label: language === 'en' ? 'Community Impact' : 'Impact communautaire', value: '24+', icon: Users, color: '#FFC956' },
    { label: language === 'en' ? 'Resources Shared' : 'Ressources partagées', value: '15+', icon: Share2, color: '#CC0000' },
  ];

  const activeFilters = filterType !== 'all' || searchQuery.trim() !== '';

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Skip to main content — accessibility */}
      <a href="#publications-grid" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#CC0000] focus:text-white focus:rounded-lg focus:font-semibold">
        {language === 'en' ? 'Skip to publications' : 'Aller aux publications'}
      </a>

      {/* Hero Section */}
      <header className="relative bg-[#CC0000] overflow-hidden" role="banner">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <KnowledgeFlow />
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-white"
          style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 pt-20 md:pt-24 pb-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 mb-8"
            style={{ animation: 'fade-in-down 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s both' }}>
            <BookOpen className="w-3.5 h-3.5 text-white/70" />
            <span className="text-xs text-white/70 font-semibold tracking-[0.12em] uppercase">
              {language === 'en' ? 'Research Outputs & Resources' : 'Productions et ressources de recherche'}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl text-white mb-5 font-extrabold tracking-tight leading-none"
            style={{ fontFamily: 'var(--font-heading)', animation: 'fade-in-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}>
            {t('nav.knowledge')}
          </h1>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed"
            style={{ animation: 'fade-in-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.38s both' }}>
            {language === 'en'
              ? 'Explore our research publications, presentations, videos, and community resources. All outputs include citation export (APA & BibTeX).'
              : 'Explorez nos publications de recherche, présentations, vidéos et ressources communautaires. Toutes les sorties incluent l\'export de citation (APA & BibTeX).'}
          </p>
        </div>
      </header>

      {/* Statistics Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 relative z-20 mb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" role="list" aria-label={language === 'en' ? 'Research statistics' : 'Statistiques de recherche'}>
          {stats.map((stat, index) => (
            <div key={index} role="listitem" className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#CC0000]/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
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

      {/* Knowledge in Action — editorial photo feature */}
      <div className="bg-[#0A0A0A] py-0">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] overflow-hidden">

            {/* Photo panel */}
            <div className="relative h-72 lg:h-80 overflow-hidden group">
              <img
                src="/community/researcher-presenting-brocku.jpg"
                alt="MSK researcher presenting research findings on anti-racism and inclusion to a diverse community audience at Brock University"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent lg:to-[#0A0A0A] to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent lg:hidden" />
              {/* Event badge */}
              <div className="absolute top-5 left-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#CC0000] text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFC956] animate-pulse" />
                  {language === 'en' ? 'Research Presentation' : 'Présentation de recherche'}
                </span>
              </div>
            </div>

            {/* Quote panel */}
            <div className="flex flex-col justify-center px-8 md:px-12 py-10 bg-[#0A0A0A]">
              <div className="w-8 h-px bg-[#CC0000] mb-6" />
              <blockquote className="text-white text-xl md:text-2xl font-semibold leading-snug mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
                {language === 'en'
                  ? '"Knowledge becomes powerful when it leaves the lab and reaches the people it was always about."'
                  : '"Le savoir devient puissant quand il quitte le laboratoire et rejoint les personnes dont il a toujours parlé."'}
              </blockquote>
              <p className="text-white/40 text-sm">
                {language === 'en'
                  ? 'MSK/MSM Niagara Research Partnership · Knowledge Translation Principle'
                  : 'Partenariat de recherche MSK/MSM Niagara · Principe de transfert de connaissances'}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Content Section */}
      <main id="publications-grid" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 relative z-20">

        {/* Search + Filter Section */}
        <section aria-label={language === 'en' ? 'Search and filter publications' : 'Rechercher et filtrer les publications'} className="mb-16">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border-2 border-gray-100 p-8 md:p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#CC0000] to-[#A40000] flex items-center justify-center shadow-lg" aria-hidden="true">
                <Filter className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] mb-1">
                  {language === 'en' ? 'Search & Filter Resources' : 'Rechercher et filtrer les ressources'}
                </h2>
                <p className="text-sm text-[#0A0A0A]/60">
                  {language === 'en'
                    ? 'Discover publications, presentations, and knowledge translation materials'
                    : 'Découvrez les publications, présentations et matériaux de transfert de connaissances'}
                </p>
              </div>
              {activeFilters && (
                <button
                  onClick={() => { setFilterType('all'); setSearchQuery(''); }}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold bg-white border-2 border-[#CC0000]/20 text-[#CC0000] hover:border-[#CC0000] hover:bg-[#CC0000] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                  aria-label={language === 'en' ? 'Clear all filters' : 'Effacer tous les filtres'}
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">{language === 'en' ? 'Clear All' : 'Tout effacer'}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Search Bar */}
              <div>
                <label htmlFor="pub-search" className="block text-xs font-bold text-[#0A0A0A]/50 uppercase tracking-wider mb-3">
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-[#CC0000]" />
                    {language === 'en' ? 'Search by Title or Author' : 'Rechercher par titre ou auteur'}
                  </span>
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" aria-hidden="true" />
                  <input
                    id="pub-search"
                    type="search"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder={language === 'en' ? 'e.g. health literacy, Ntakirutimana...' : 'p. ex. littératie en santé, Ntakirutimana...'}
                    className="w-full h-14 pl-12 pr-4 text-base font-medium border-2 border-gray-200 hover:border-[#CC0000]/50 focus:border-[#CC0000] focus:outline-none bg-white rounded-xl shadow-sm transition-all duration-300"
                    aria-label={language === 'en' ? 'Search publications' : 'Rechercher des publications'}
                  />
                </div>
              </div>

              {/* Dropdown Filter */}
              <div>
                <label className="block text-xs font-bold text-[#0A0A0A]/50 uppercase tracking-wider mb-3">
                  <span className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#CC0000]" />
                    {language === 'en' ? 'Resource Type' : 'Type de ressource'}
                  </span>
                </label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full h-14 text-base font-semibold border-2 border-gray-200 hover:border-[#CC0000]/50 focus:border-[#CC0000] bg-white rounded-xl shadow-sm transition-all duration-300">
                    <SelectValue placeholder={language === 'en' ? 'Select a type...' : 'Sélectionner un type...'} />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-200 rounded-xl shadow-2xl">
                    {[
                      { value: 'all', label: language === 'en' ? 'All Types' : 'Tous les types', icon: Globe, color: '#0A0A0A' },
                      { value: 'article', label: language === 'en' ? 'Articles' : 'Articles', icon: FileText, color: '#089EA5' },
                      { value: 'report', label: language === 'en' ? 'Reports' : 'Rapports', icon: BookOpen, color: '#6635B1' },
                      { value: 'presentation', label: language === 'en' ? 'Presentations' : 'Présentations', icon: Presentation, color: '#FFC956' },
                      { value: 'video', label: language === 'en' ? 'Videos' : 'Vidéos', icon: Video, color: '#CC0000' },
                      { value: 'policy', label: language === 'en' ? 'Policy Briefs' : 'Notes politiques', icon: FileText, color: '#12647F' },
                      { value: 'toolkit', label: language === 'en' ? 'Toolkits' : 'Boîtes à outils', icon: Lightbulb, color: '#CC0000' },
                    ].map(({ value, label, icon: Icon, color }) => (
                      <SelectItem key={value} value={value} className="text-base font-semibold py-3 cursor-pointer hover:bg-gray-50">
                        <span className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                          <Icon className="w-4 h-4" style={{ color }} />
                          {label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results count */}
            <p className="mt-5 text-sm text-[#0A0A0A]/50 font-medium" aria-live="polite" aria-atomic="true">
              {language === 'en'
                ? `Showing ${filteredPublications.length} of ${publications.length} resource${publications.length !== 1 ? 's' : ''}`
                : `Affichage de ${filteredPublications.length} sur ${publications.length} ressource${publications.length !== 1 ? 's' : ''}`}
            </p>
          </div>
        </section>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20" role="list" aria-label={language === 'en' ? 'Publications list' : 'Liste des publications'}>
          {filteredPublications.map((pub, index) => {
            const IconComponent = getTypeIcon(pub.type);
            return (
              <article
                key={index}
                role="listitem"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative bg-white rounded-3xl overflow-hidden transition-all duration-500 border-2 ${
                  hoveredCard === index
                    ? 'shadow-2xl scale-[1.02] border-white/0'
                    : 'shadow-lg border-gray-100'
                }`}
              >
                {/* Gradient Border Effect */}
                {hoveredCard === index && (
                  <div
                    className="absolute inset-0 opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to right, ${pub.color}, ${pub.color}bb)` }}
                    aria-hidden="true"
                  />
                )}
                <div className="absolute inset-[2px] bg-white rounded-3xl" aria-hidden="true" />

                <div className="relative z-10 p-8">
                  {/* Icon & Type Badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-500 ${
                      hoveredCard === index ? 'scale-110 rotate-3' : ''
                    }`}
                      style={{ background: `linear-gradient(to bottom right, ${pub.color}, ${pub.color}bb)` }}
                      aria-hidden="true">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <Badge
                      className="font-semibold text-xs px-3 py-1 border-2"
                      style={{ borderColor: pub.color, backgroundColor: `${pub.color}15`, color: pub.color }}
                    >
                      {language === 'en' ? pub.type.charAt(0).toUpperCase() + pub.type.slice(1) : pub.typeFr}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl font-bold text-[#0A0A0A] mb-4 leading-tight transition-colors duration-300 ${
                    hoveredCard === index ? 'text-[#CC0000]' : ''
                  }`}>
                    {language === 'en' ? pub.title : pub.titleFr}
                  </h3>

                  {/* Metadata */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-[#0A0A0A]/70">
                      <Users className="w-4 h-4" style={{ color: pub.color }} aria-hidden="true" />
                      <span className="font-medium">{language === 'en' ? pub.authors : pub.authorsFr}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#0A0A0A]/70">
                      <Calendar className="w-4 h-4" style={{ color: pub.color }} aria-hidden="true" />
                      <span className="font-medium">{language === 'en' ? pub.date : pub.dateFr}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#0A0A0A]/70">
                      <Tag className="w-4 h-4" style={{ color: pub.color }} aria-hidden="true" />
                      <span className="font-medium">{language === 'en' ? pub.hub : pub.hubFr}</span>
                    </div>
                  </div>

                  {/* Abstract */}
                  <p className="text-[#0A0A0A]/80 mb-6 leading-relaxed">
                    {language === 'en' ? pub.abstract : pub.abstractFr}
                  </p>

                  {/* Action Buttons — Contextual CTAs */}
                  <div className="flex gap-2.5 flex-wrap">
                    <Button
                      disabled
                      className="flex-1 bg-gray-200 text-gray-600 cursor-not-allowed font-semibold rounded-xl transition-all duration-300 border-0 text-xs"
                      aria-label={language === 'en' ? 'Full text coming soon' : 'Texte complet prochainement'}
                    >
                      <Eye className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                      {language === 'en' ? 'PDF (Soon)' : 'PDF (Bientôt)'}
                    </Button>
                    <CiteButton pub={pub} language={language} />
                    <Button
                      asChild
                      variant="outline"
                      className="border-2 border-[#089EA5]/30 text-[#089EA5] hover:border-[#089EA5] hover:bg-[#089EA5] hover:text-white rounded-xl font-semibold text-xs transition-all duration-300 gap-1.5"
                    >
                      <a href={`mailto:jntakirutimana@brocku.ca?subject=Collaboration Inquiry: ${encodeURIComponent(pub.title)}`}>
                        <Users className="w-3.5 h-3.5" />
                        {language === 'en' ? 'Collaborate' : 'Collaborer'}
                      </a>
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* No Results State */}
        {filteredPublications.length === 0 && (
          <div className="text-center py-24 bg-gray-50 rounded-3xl" role="status" aria-live="polite">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#CC0000] to-[#A40000] flex items-center justify-center mx-auto mb-8 shadow-xl" aria-hidden="true">
              <Search className="w-16 h-16 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-[#0A0A0A] mb-3">
              {language === 'en' ? 'No resources found' : 'Aucune ressource trouvée'}
            </h3>
            <p className="text-lg text-[#0A0A0A]/60 mb-8">
              {language === 'en' ? 'Try a different search query or resource type' : 'Essayez une autre requête de recherche ou un autre type de ressource'}
            </p>
            <Button
              onClick={() => { setFilterType('all'); setSearchQuery(''); }}
              className="bg-[#CC0000] hover:bg-[#A40000] text-white font-semibold px-8 py-6 rounded-xl"
            >
              {language === 'en' ? 'Show All Resources' : 'Afficher toutes les ressources'}
            </Button>
          </div>
        )}

        {/* Call to Action Section */}
        <div className="mt-24 mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#CC0000] via-[#A40000] to-[#CC0000] rounded-[3rem] blur-3xl opacity-20" aria-hidden="true" />

          <div className="relative bg-gradient-to-br from-[#CC0000] via-[#A40000] to-[#6B0000] rounded-[3rem] p-12 md:p-16 lg:p-20 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mb-48" aria-hidden="true" />

            <div className="relative z-10 max-w-5xl mx-auto">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border-2 border-white/30 p-8 md:p-12 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:border-white/50">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-white/30 to-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full mb-6 shadow-lg border border-white/40">
                    <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center" aria-hidden="true">
                      <Share2 className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-lg">
                      {language === 'en' ? 'Stay Connected' : 'Restez connecté'}
                    </span>
                  </div>

                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    {language === 'en' ? 'Subscribe to Research Updates' : 'Abonnez-vous aux mises à jour'}
                  </h2>

                  <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
                    {language === 'en'
                      ? 'Get the latest publications, events, and community resources delivered directly to your inbox. Join our community of researchers and partners.'
                      : 'Recevez les dernières publications, événements et ressources communautaires directement dans votre boîte de réception. Rejoignez notre communauté de chercheurs et partenaires.'}
                  </p>
                </div>

                {/* Email Signup Form */}
                <div className="max-w-2xl mx-auto mb-8">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-white/40 via-[#CC0000]/40 to-white/40 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-all duration-500" aria-hidden="true" />
                    <div className="relative flex flex-col sm:flex-row gap-3 mb-4 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/30 shadow-2xl">
                      <div className="flex-1 relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70" aria-hidden="true">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <input
                          type="email"
                          placeholder={language === 'en' ? 'your.email@example.com' : 'votre.courriel@exemple.com'}
                          className="w-full pl-12 pr-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-transparent text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/70 focus:border-white/60 focus:bg-white/20 transition-all duration-300 font-medium text-base"
                          aria-label={language === 'en' ? 'Your email address' : 'Votre adresse courriel'}
                        />
                      </div>
                      <Button className="relative bg-gradient-to-r from-white via-gray-100 to-white text-[#CC0000] hover:from-gray-100 hover:via-white hover:to-gray-100 font-bold px-8 py-4 rounded-xl text-base shadow-2xl transition-all duration-300 hover:scale-105 whitespace-nowrap">
                        {language === 'en' ? 'Subscribe Now' : 'S\'abonner'}
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm text-center">
                    {language === 'en' ? '🔒 We respect your privacy. Unsubscribe anytime.' : '🔒 Nous respectons votre vie privée. Désabonnez-vous à tout moment.'}
                  </p>
                </div>

                {/* Stats Footer */}
                <div className="mt-10 pt-8 border-t border-white/20">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    <div className="space-y-1">
                      <div className="text-3xl font-bold text-white">56</div>
                      <div className="text-white/70 text-sm">{language === 'en' ? 'Team Members' : 'Membres de l\'équipe'}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-3xl font-bold text-white">12+</div>
                      <div className="text-white/70 text-sm">{language === 'en' ? 'Community Partners' : 'Partenaires communautaires'}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-3xl font-bold text-white">3</div>
                      <div className="text-white/70 text-sm">{language === 'en' ? 'Research Hubs' : 'Pôles de recherche'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}