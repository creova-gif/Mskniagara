import { Link, useLocation } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronDown, Menu, X, ArrowRight, Users, BookOpen, Building2, Lightbulb, Globe, Handshake, Heart, Calendar, Camera } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const dropdownItems = {
  about: [
    {
      name: 'Partnership',
      nameEn: 'Partnership',
      nameFr: 'Partenariat',
      href: '/about/partnership',
      desc: 'Our academic & community network',
      descFr: 'Notre réseau académique et communautaire',
      icon: Building2,
    },
    {
      name: 'Research Hubs',
      nameEn: 'Research Hubs',
      nameFr: 'Pôles de recherche',
      href: '/about/hubs',
      desc: '3 hubs across the Niagara region',
      descFr: '3 pôles à travers la région de Niagara',
      icon: Lightbulb,
    },
    {
      name: 'Team Members',
      nameEn: 'Team Members',
      nameFr: 'Membres de l\'équipe',
      href: '/about/members',
      desc: 'Researchers, students & partners',
      descFr: 'Chercheurs, étudiants et partenaires',
      icon: Users,
    },
  ],
  research: [
    {
      name: 'Projects',
      nameEn: 'Projects',
      nameFr: 'Projets',
      href: '/research/projects',
      desc: 'Active research initiatives',
      descFr: 'Initiatives de recherche actives',
      icon: BookOpen,
    },
    {
      name: 'Knowledge',
      nameEn: 'Knowledge Dissemination',
      nameFr: 'Diffusion des savoirs',
      href: '/research/knowledge',
      desc: 'Publications & findings',
      descFr: 'Publications et résultats',
      icon: Lightbulb,
    },
  ],
  engage: [
    {
      name: 'Partners',
      nameEn: 'Partners',
      nameFr: 'Partenaires',
      href: '/partners',
      desc: 'Our coalition of organizations',
      descFr: 'Notre coalition d\'organisations',
      icon: Handshake,
    },
    {
      name: 'Community',
      nameEn: 'Community',
      nameFr: 'Communauté',
      href: '/community',
      desc: 'Health & community partners',
      descFr: 'Partenaires communautaires et de santé',
      icon: Heart,
    },
    {
      name: 'Timeline',
      nameEn: 'Timeline & Events',
      nameFr: 'Chronologie et événements',
      href: '/timeline',
      desc: 'Milestones & upcoming events',
      descFr: 'Jalons et événements à venir',
      icon: Calendar,
    },
    {
      name: 'Media',
      nameEn: 'Media',
      nameFr: 'Médias',
      href: '/media',
      desc: 'Photos, video & annual reports',
      descFr: 'Photos, vidéos et rapports annuels',
      icon: Camera,
    },
  ],
};

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const toggleLanguage = () => setLanguage(language === 'en' ? 'fr' : 'en');

  const openDropdown = (key: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setActiveDropdown(key);
  };

  const closeDropdown = () => {
    closeTimeout.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const stayOpen = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
  };

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  const isDark = !scrolled;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/80 shadow-sm'
          : 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[68px] items-center justify-between">

          {/* ── LOGO — circular seal, text ringed around an empty core ── */}
          <Link
            to="/"
            className="relative shrink-0 select-none group"
            aria-label="MSK Niagara Research Partnership — Home"
          >
            <svg
              className="w-14 h-14 transition-transform duration-700 ease-out group-hover:rotate-[360deg]"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <path id="logoRingTop" d="M 12 60 A 48 48 0 0 1 108 60" />
                <path id="logoRingBottom" d="M 12 60 A 48 48 0 0 0 108 60" />
              </defs>

              {/* outer rim */}
              <circle cx="60" cy="60" r="58" stroke="#CC0000" strokeWidth="1.5" />
              {/* inner rim — everything past this is the empty core */}
              <circle cx="60" cy="60" r="32" stroke="#CC0000" strokeOpacity="0.45" strokeWidth="1" />
              {/* four cardinal ticks marking the hole, like a compass/seal */}
              <circle cx="60" cy="24" r="1.6" fill="#CC0000" />
              <circle cx="60" cy="96" r="1.6" fill="#CC0000" />
              <circle cx="24" cy="60" r="1.6" fill="#CC0000" />
              <circle cx="96" cy="60" r="1.6" fill="#CC0000" />

              <text fill="#CC0000">
                <textPath
                  href="#logoRingTop"
                  startOffset="50%"
                  textAnchor="middle"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '15px',
                    letterSpacing: '0.05em',
                  }}
                >
                  MSK NIAGARA
                </textPath>
              </text>
              <text fill="#CC0000" fillOpacity="0.75">
                <textPath
                  href="#logoRingBottom"
                  startOffset="50%"
                  textAnchor="middle"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '8px',
                    letterSpacing: '0.22em',
                  }}
                >
                  RESEARCH PARTNERSHIP
                </textPath>
              </text>
            </svg>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <div className="hidden lg:flex items-center gap-1">

            {/* Home */}
            <Link
              to="/"
              className={`relative px-3.5 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                isActive('/')
                  ? isDark
                    ? 'text-white'
                    : 'text-[#0A0A0A]'
                  : isDark
                  ? 'text-white/65 hover:text-white hover:bg-white/8'
                  : 'text-gray-500 hover:text-[#0A0A0A] hover:bg-gray-100/70'
              }`}
            >
              {t('nav.home')}
              {isActive('/') && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#CC0000]" />
              )}
            </Link>

            {/* About — dropdown */}
            <div
              className="relative"
              onMouseEnter={() => openDropdown('about')}
              onMouseLeave={closeDropdown}
            >
              <button
                className={`relative inline-flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  location.pathname.startsWith('/about')
                    ? isDark
                      ? 'text-white'
                      : 'text-[#0A0A0A]'
                    : isDark
                    ? 'text-white/65 hover:text-white hover:bg-white/8'
                    : 'text-gray-500 hover:text-[#0A0A0A] hover:bg-gray-100/70'
                }`}
              >
                {t('nav.about')}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'about' ? 'rotate-180' : ''
                  }`}
                />
                {location.pathname.startsWith('/about') && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#CC0000]" />
                )}
              </button>

              {/* About dropdown */}
              {activeDropdown === 'about' && (
                <div
                  className="absolute left-0 top-full pt-3 w-72"
                  onMouseEnter={stayOpen}
                  onMouseLeave={closeDropdown}
                >
                  <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in-down">
                    <div className="h-[3px] bg-gradient-to-r from-[#CC0000] to-[#DA0C0C]" />
                    <div className="px-4 pt-3 pb-1 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500" style={{ fontFamily: 'var(--font-mono)' }}>
                      MSK // {language === 'en' ? 'About' : 'À propos'}
                    </div>
                    <div className="p-2 pt-1">
                      {dropdownItems.about.map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            to={item.href}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 group/item transition-all duration-150"
                          >
                            <span className="mt-0.5 text-[10px] font-semibold text-gray-500 tabular-nums" style={{ fontFamily: 'var(--font-mono)' }}>
                              0{i + 1}
                            </span>
                            <div className="mt-0.5 w-8 h-8 rounded-lg bg-[#CC0000]/8 flex items-center justify-center shrink-0 group-hover/item:bg-[#CC0000]/15 transition-colors">
                              <Icon className="w-4 h-4 text-[#CC0000]" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-[#0A0A0A] group-hover/item:text-[#CC0000] transition-colors">
                                {language === 'en' ? item.nameEn : item.nameFr}
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">
                                {language === 'en' ? item.desc : item.descFr}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Research — dropdown */}
            <div
              className="relative"
              onMouseEnter={() => openDropdown('research')}
              onMouseLeave={closeDropdown}
            >
              <button
                className={`relative inline-flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  location.pathname.startsWith('/research')
                    ? isDark
                      ? 'text-white'
                      : 'text-[#0A0A0A]'
                    : isDark
                    ? 'text-white/65 hover:text-white hover:bg-white/8'
                    : 'text-gray-500 hover:text-[#0A0A0A] hover:bg-gray-100/70'
                }`}
              >
                {t('nav.research')}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'research' ? 'rotate-180' : ''
                  }`}
                />
                {location.pathname.startsWith('/research') && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#CC0000]" />
                )}
              </button>

              {/* Research dropdown */}
              {activeDropdown === 'research' && (
                <div
                  className="absolute left-0 top-full pt-3 w-64"
                  onMouseEnter={stayOpen}
                  onMouseLeave={closeDropdown}
                >
                  <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in-down">
                    <div className="h-[3px] bg-gradient-to-r from-[#CC0000] to-[#DA0C0C]" />
                    <div className="px-4 pt-3 pb-1 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500" style={{ fontFamily: 'var(--font-mono)' }}>
                      MSK // {language === 'en' ? 'Research' : 'Recherche'}
                    </div>
                    <div className="p-2 pt-1">
                      {dropdownItems.research.map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            to={item.href}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 group/item transition-all duration-150"
                          >
                            <span className="mt-0.5 text-[10px] font-semibold text-gray-500 tabular-nums" style={{ fontFamily: 'var(--font-mono)' }}>
                              0{i + 1}
                            </span>
                            <div className="mt-0.5 w-8 h-8 rounded-lg bg-[#CC0000]/8 flex items-center justify-center shrink-0 group-hover/item:bg-[#CC0000]/15 transition-colors">
                              <Icon className="w-4 h-4 text-[#CC0000]" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-[#0A0A0A] group-hover/item:text-[#CC0000] transition-colors">
                                {language === 'en' ? item.nameEn : item.nameFr}
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">
                                {language === 'en' ? item.desc : item.descFr}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Engage — dropdown */}
            <div
              className="relative"
              onMouseEnter={() => openDropdown('engage')}
              onMouseLeave={closeDropdown}
            >
              <button
                className={`relative inline-flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  ['/partners', '/community', '/timeline', '/media'].some((p) => location.pathname.startsWith(p))
                    ? isDark
                      ? 'text-white'
                      : 'text-[#0A0A0A]'
                    : isDark
                    ? 'text-white/65 hover:text-white hover:bg-white/8'
                    : 'text-gray-500 hover:text-[#0A0A0A] hover:bg-gray-100/70'
                }`}
              >
                {language === 'en' ? 'Engage' : 'Participer'}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'engage' ? 'rotate-180' : ''
                  }`}
                />
                {['/partners', '/community', '/timeline', '/media'].some((p) => location.pathname.startsWith(p)) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#CC0000]" />
                )}
              </button>

              {/* Engage dropdown */}
              {activeDropdown === 'engage' && (
                <div
                  className="absolute left-0 top-full pt-3 w-72"
                  onMouseEnter={stayOpen}
                  onMouseLeave={closeDropdown}
                >
                  <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in-down">
                    <div className="h-[3px] bg-gradient-to-r from-[#CC0000] to-[#DA0C0C]" />
                    <div className="px-4 pt-3 pb-1 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500" style={{ fontFamily: 'var(--font-mono)' }}>
                      MSK // {language === 'en' ? 'Engage' : 'Participer'}
                    </div>
                    <div className="p-2 pt-1">
                      {dropdownItems.engage.map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            to={item.href}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 group/item transition-all duration-150"
                          >
                            <span className="mt-0.5 text-[10px] font-semibold text-gray-500 tabular-nums" style={{ fontFamily: 'var(--font-mono)' }}>
                              0{i + 1}
                            </span>
                            <div className="mt-0.5 w-8 h-8 rounded-lg bg-[#CC0000]/8 flex items-center justify-center shrink-0 group-hover/item:bg-[#CC0000]/15 transition-colors">
                              <Icon className="w-4 h-4 text-[#CC0000]" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-[#0A0A0A] group-hover/item:text-[#CC0000] transition-colors">
                                {language === 'en' ? item.nameEn : item.nameFr}
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">
                                {language === 'en' ? item.desc : item.descFr}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT ACTIONS ── */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${
                isDark
                  ? 'text-white/60 hover:text-white hover:bg-white/10'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5" />
              {language.toUpperCase()}
            </button>

            {/* Divider */}
            <div className={`w-px h-5 ${isDark ? 'bg-white/15' : 'bg-gray-200'}`} />

            {/* CTA — Support Us */}
            <Link
              to="/donate"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#CC0000] to-[#DA0C0C] text-white text-sm font-semibold rounded-full hover:shadow-[0_4px_16px_rgba(204,0,0,0.4)] hover:-translate-y-px transition-all duration-300 group"
            >
              {language === 'en' ? 'Support Us' : 'Nous Soutenir'}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* ── MOBILE CONTROLS ── */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className={`p-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
                isDark ? 'text-white/70 hover:bg-white/10' : 'text-gray-500 hover:bg-gray-100'
              }`}
              aria-label="Toggle language"
            >
              {language.toUpperCase()}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'text-white hover:bg-white/10'
                  : 'text-[#0A0A0A] hover:bg-gray-100'
              }`}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 animate-fade-in-down">
            <div className={`rounded-2xl overflow-hidden border ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
            } p-2 mt-2 space-y-0.5`}>
              <Link
                to="/"
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive('/')
                    ? 'bg-[#CC0000] text-white'
                    : isDark
                    ? 'text-white/80 hover:bg-white/10 hover:text-white'
                    : 'text-gray-700 hover:bg-white hover:text-[#0A0A0A]'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.home')}
                {isActive('/') && <ArrowRight className="w-4 h-4 opacity-70" />}
              </Link>

              {(
                [
                  { label: language === 'en' ? 'About' : 'À propos', items: dropdownItems.about },
                  { label: language === 'en' ? 'Research' : 'Recherche', items: dropdownItems.research },
                  { label: language === 'en' ? 'Engage' : 'Participer', items: dropdownItems.engage },
                ] as const
              ).map((group) => (
                <div key={group.label} className="pt-3 first:pt-0">
                  <div
                    className={`px-4 pb-1 text-[10px] font-bold tracking-[0.2em] uppercase ${
                      isDark ? 'text-white/50' : 'text-gray-500'
                    }`}
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {group.label}
                  </div>
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                        isActive(item.href)
                          ? 'bg-[#CC0000] text-white'
                          : isDark
                          ? 'text-white/80 hover:bg-white/10 hover:text-white'
                          : 'text-gray-700 hover:bg-white hover:text-[#0A0A0A]'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {language === 'en' ? item.nameEn : item.nameFr}
                      {isActive(item.href) && <ArrowRight className="w-4 h-4 opacity-70" />}
                    </Link>
                  ))}
                </div>
              ))}

              <div className="pt-3 px-2">
                <Link
                  to="/donate"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#CC0000] to-[#DA0C0C] text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {language === 'en' ? 'Support Us' : 'Nous Soutenir'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
