import { Link, useLocation } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronDown, Menu, X, ArrowRight, Users, BookOpen, Building2, Lightbulb, Globe } from 'lucide-react';
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

          {/* ── LOGO ── */}
          <Link
            to="/"
            className="flex items-center gap-3 group shrink-0 select-none"
            aria-label="MSK Niagara Research Partnership — Home"
          >
            {/* Brand mark — circular "rising voices" mark */}
            <div className="relative w-11 h-11 shrink-0">
              <svg
                className="absolute inset-0 w-full h-full transition-transform duration-500 ease-out group-hover:rotate-3"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* circle field */}
                <circle cx="22" cy="22" r="22" fill="#CC0000" />
                {/* faint inner ring for craft */}
                <circle cx="22" cy="22" r="17.5" stroke="white" strokeOpacity="0.14" strokeWidth="1" />
                {/* source point — the community / the subjugated */}
                <circle cx="22" cy="30.5" r="2.6" fill="white" />
                {/* three ascending arcs — knowledge mobilized outward & up */}
                <path
                  d="M15 27 Q22 20.5 29 27"
                  stroke="white" strokeWidth="2.4" strokeLinecap="round" fill="none"
                  className="origin-center transition-opacity duration-300"
                />
                <path
                  d="M11.5 24 Q22 13 32.5 24"
                  stroke="white" strokeOpacity="0.72" strokeWidth="2.4" strokeLinecap="round" fill="none"
                />
                <path
                  d="M8.5 21.5 Q22 7 35.5 21.5"
                  stroke="white" strokeOpacity="0.42" strokeWidth="2.4" strokeLinecap="round" fill="none"
                />
              </svg>
            </div>

            {/* Wordmark */}
            <div className="hidden sm:flex flex-col justify-center leading-none">
              {/* Primary name line */}
              <div className="flex items-center gap-2">
                <span
                  className={`font-extrabold text-[20px] leading-none transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-[#0A0A0A]'
                  }`}
                  style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.045em' }}
                >
                  MSK
                </span>
                <span
                  className={`w-px h-[18px] transition-colors duration-300 ${
                    isDark ? 'bg-white/25' : 'bg-gray-300'
                  }`}
                />
                <span
                  className={`text-[13px] font-medium leading-none transition-colors duration-300 ${
                    isDark ? 'text-white/75' : 'text-gray-600'
                  }`}
                  style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}
                >
                  Niagara
                </span>
              </div>
              {/* Sub-label */}
              <span
                className={`mt-[5px] text-[9px] font-semibold tracking-[0.24em] uppercase leading-none transition-colors duration-300 ${
                  isDark ? 'text-white/40' : 'text-gray-400'
                }`}
              >
                Research&nbsp;Partnership
              </span>
            </div>
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
                    <div className="p-2">
                      {dropdownItems.about.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            to={item.href}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 group/item transition-all duration-150"
                          >
                            <div className="mt-0.5 w-8 h-8 rounded-lg bg-[#CC0000]/8 flex items-center justify-center shrink-0 group-hover/item:bg-[#CC0000]/15 transition-colors">
                              <Icon className="w-4 h-4 text-[#CC0000]" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-[#0A0A0A] group-hover/item:text-[#CC0000] transition-colors">
                                {language === 'en' ? item.nameEn : item.nameFr}
                              </div>
                              <div className="text-xs text-gray-400 mt-0.5">
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
                    <div className="p-2">
                      {dropdownItems.research.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            to={item.href}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 group/item transition-all duration-150"
                          >
                            <div className="mt-0.5 w-8 h-8 rounded-lg bg-[#CC0000]/8 flex items-center justify-center shrink-0 group-hover/item:bg-[#CC0000]/15 transition-colors">
                              <Icon className="w-4 h-4 text-[#CC0000]" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-[#0A0A0A] group-hover/item:text-[#CC0000] transition-colors">
                                {language === 'en' ? item.nameEn : item.nameFr}
                              </div>
                              <div className="text-xs text-gray-400 mt-0.5">
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

            {/* Single nav items */}
            {[
              { label: language === 'en' ? 'Partners' : 'Partenaires', href: '/partners' },
              { label: t('nav.community'), href: '/community' },
              { label: t('nav.timeline'), href: '/timeline' },
              { label: language === 'en' ? 'Media' : 'Médias', href: '/media' },
            ].map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  isActive(item.href)
                    ? isDark
                      ? 'text-white'
                      : 'text-[#0A0A0A]'
                    : isDark
                    ? 'text-white/65 hover:text-white hover:bg-white/8'
                    : 'text-gray-500 hover:text-[#0A0A0A] hover:bg-gray-100/70'
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#CC0000]" />
                )}
              </Link>
            ))}
          </div>

          {/* ── RIGHT ACTIONS ── */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${
                isDark
                  ? 'text-white/60 hover:text-white hover:bg-white/10'
                  : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
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

            {/* CTA — Get Involved */}
            <Link
              to="/about/partnership"
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-full border-2 transition-all duration-200 group ${
                isDark 
                  ? 'border-white/20 text-white hover:bg-white/10' 
                  : 'border-gray-200 text-[#0A0A0A] hover:border-[#CC0000] hover:text-[#CC0000]'
              }`}
            >
              {language === 'en' ? 'Get Involved' : 'Participer'}
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
              {[
                { label: t('nav.home'), href: '/' },
                { label: t('nav.partnership'), href: '/about/partnership' },
                { label: t('nav.hubs'), href: '/about/hubs' },
                { label: t('nav.members'), href: '/about/members' },
                { label: language === 'en' ? 'Partners' : 'Partenaires', href: '/partners' },
                { label: t('nav.projects'), href: '/research/projects' },
                { label: t('nav.knowledge'), href: '/research/knowledge' },
                { label: t('nav.community'), href: '/community' },
                { label: t('nav.timeline'), href: '/timeline' },
                { label: language === 'en' ? 'Media' : 'Médias', href: '/media' },
              ].map((item) => (
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
                  {item.label}
                  {isActive(item.href) && <ArrowRight className="w-4 h-4 opacity-70" />}
                </Link>
              ))}

              <div className="pt-2 px-2 flex flex-col gap-2">
                <Link
                  to="/donate"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#CC0000] to-[#DA0C0C] text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {language === 'en' ? 'Support Us' : 'Nous Soutenir'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/about/partnership"
                  className={`flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold rounded-xl transition-colors border-2 ${
                    isDark ? 'border-white/20 text-white' : 'border-gray-200 text-[#0A0A0A]'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {language === 'en' ? 'Get Involved' : 'Participer'}
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
