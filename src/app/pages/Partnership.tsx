import { sanitizeUrl } from '../utils/security';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight, ExternalLink, Users, Shield } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { Link } from 'react-router';
import { NetworkNodes } from '../components/HeroAnimations';
import { usePageMeta } from '../hooks/usePageMeta';
import { useSanityQuery } from '../../lib/sanity/useSanityQuery';
import { partnershipFundersQuery, type CommunityPartner } from '../../lib/sanity/queries/communityPartner';
import { urlForImage } from '../../lib/sanity/image';

const HUB_COLORS = {
  childhood: '#089EA5',
  health: '#C97B2E',
  identity: '#7B5EA7',
};

export function Partnership() {
  const { t, language } = useLanguage();
  usePageMeta(
    language === 'en' ? 'Partnership | MSK Niagara' : 'Partenariat | MSK Niagara',
    language === 'en'
      ? 'Our academic & community network — how Brock University and Niagara community partners collaborate on the MSK research partnership.'
      : "Notre réseau académique et communautaire — comment l'Université Brock et les partenaires communautaires du Niagara collaborent au partenariat de recherche MSK."
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center', slidesToScroll: 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const introRef = useRef<HTMLDivElement>(null);
  const hubsRef = useRef<HTMLDivElement>(null);
  const govRef = useRef<HTMLDivElement>(null);
  const [introVisible, setIntroVisible] = useState(false);
  const [hubsVisible, setHubsVisible] = useState(false);
  const [govVisible, setGovVisible] = useState(false);

  useEffect(() => {
    const observe = (el: Element | null, setter: (v: boolean) => void) => {
      if (!el) return;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } }, { threshold: 0.1 });
      obs.observe(el);
      return () => obs.disconnect();
    };
    const c1 = observe(introRef.current, setIntroVisible);
    const c2 = observe(hubsRef.current, setHubsVisible);
    const c3 = observe(govRef.current, setGovVisible);
    return () => { c1?.(); c2?.(); c3?.(); };
  }, []);

  const { data: rawFunderPartners } = useSanityQuery<CommunityPartner[]>(partnershipFundersQuery);
  const partners = useMemo(
    () =>
      (rawFunderPartners ?? [])
        .filter((p) => p.category !== 'funder')
        .map((p) => ({
          name: p.name.en,
          nameFr: p.name.fr,
          type: p.category === 'research' ? 'Academic Partner' : 'Community Partner',
          typeFr: p.category === 'research' ? 'Partenaire académique' : 'Partenaire communautaire',
          url: p.website ?? '#',
          logo: urlForImage(p.logo)?.width(240).url() ?? '',
        })),
    [rawFunderPartners]
  );
  const sshrcLogo = useMemo(
    () => urlForImage((rawFunderPartners ?? []).find((p) => p.category === 'funder')?.logo)?.width(200).url(),
    [rawFunderPartners]
  );

  const goals = language === 'en' ? [
    'Provide a forum for African descendant and foreign-born persons in the Regional Municipality of Niagara to share their experiences, knowledge and accomplishments with non-profit, academic, government and para-public sectors.',
    'Provide community organizations with insights and tools to develop culturally responsive services.',
    'Contribute to scholarship.',
    'Provide training and mentoring for student and community-based researchers.',
  ] : [
    'Offrir un forum aux personnes d\'ascendance africaine et nées à l\'étranger dans la Municipalité régionale de Niagara pour partager leurs expériences, connaissances et réalisations avec les secteurs à but non lucratif, académique, gouvernemental et parapublic.',
    'Fournir aux organisations communautaires des outils pour développer des services culturellement adaptés.',
    'Contribuer au savoir académique.',
    'Offrir de la formation et du mentorat aux chercheurs étudiants et communautaires.',
  ];

  const hubs = [
    {
      id: 'childhood',
      color: HUB_COLORS.childhood,
      titleEn: 'Childhood and Growing Up Hub',
      titleFr: 'Pôle Enfance et développement',
      descEn: 'Will listen to and respond to newcomer children with respect to their experiences in housing, sport/recreation and schooling.',
      descFr: 'Écoute et répond aux enfants nouveaux arrivants concernant leur logement, sports et scolarité.',
    },
    {
      id: 'health',
      color: HUB_COLORS.health,
      titleEn: 'Health Literacy Hub',
      titleFr: 'Pôle Littératie en santé',
      descEn: 'Will promote health literacy in immigrant and refugee populations through culturally responsive programs.',
      descFr: 'Promeut la littératie en santé auprès des populations immigrantes et réfugiées.',
    },
    {
      id: 'identity',
      color: HUB_COLORS.identity,
      titleEn: 'Identity, Connections and Belonging Hub',
      titleFr: 'Pôle Identité, relations et appartenance',
      descEn: 'Hosts three distinct projects fostering belonging among Afro-descendants, gender-diverse newcomers, and seasonal agricultural workers.',
      descFr: 'Héberge trois projets visant l\'appartenance chez les Afro-descendants, les nouveaux arrivants de diverses identités de genre et les travailleurs agricoles saisonniers.',
    },
  ];

  const scrollPrev = useCallback(() => { if (emblaApi) emblaApi.scrollPrev(); }, [emblaApi]);
  const scrollNext = useCallback(() => { if (emblaApi) emblaApi.scrollNext(); }, [emblaApi]);
  const onSelect = useCallback(() => { if (!emblaApi) return; setSelectedIndex(emblaApi.selectedScrollSnap()); }, [emblaApi]);
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const fadeUp = (visible: boolean, delay = 0): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(32px)',
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  });

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <div className="relative overflow-hidden bg-[#CC0000]">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        {/* Network nodes animation — partnership connections */}
        <NetworkNodes />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white"
          style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 pb-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6" style={{ animation: 'fade-in-up 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s both' }}>
              <div className="w-8 h-px bg-white/40" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60">MSK Niagara</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-extrabold mb-6 tracking-tight leading-[1.05]"
              style={{ fontFamily: 'var(--font-heading)', animation: 'fade-in-up 0.65s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}>
              {t('nav.partnership')}
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed"
              style={{ animation: 'fade-in-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.35s both' }}>
              {language === 'en'
                ? 'Academic institutions, community organizations, and funding partners — united to advance knowledge for a just Niagara.'
                : 'Institutions académiques, organisations communautaires et partenaires financiers — unis pour un Niagara juste.'}
            </p>
          </div>
        </div>
      </div>

      {/* ── PARTNERS CAROUSEL ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <section className="mb-20">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-extrabold text-[#0A0A0A]" style={{ fontFamily: 'var(--font-heading)' }}>
                {language === 'en' ? 'Our Partners' : 'Nos partenaires'}
              </h2>
              <a href="/community" className="text-sm font-semibold text-[#CC0000] hover:underline flex items-center gap-1">
                {language === 'en' ? 'All partners' : 'Tous les partenaires'}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {partners.map((partner, index) => (
                    <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-3">
                      <a href={sanitizeUrl(partner.url)} target="_blank" rel="noopener noreferrer" className="block group h-full">
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-[#CC0000]/30 hover:shadow-lg transition-all duration-300 h-full flex flex-col items-center justify-center min-h-[220px] gap-4">
                          <div className="h-20 flex items-center justify-center">
                            <img src={partner.logo} alt={language === 'en' ? partner.name : partner.nameFr}
                              className="max-h-16 max-w-[160px] object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-semibold text-[#0A0A0A] group-hover:text-[#CC0000] transition-colors leading-snug">
                              {language === 'en' ? partner.name : partner.nameFr}
                            </p>
                            <p className="text-[11px] text-gray-400 mt-1 tracking-wide uppercase font-medium">
                              {language === 'en' ? partner.type : partner.typeFr}
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={scrollPrev} aria-label="Previous"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 hover:border-[#CC0000] hover:bg-[#CC0000] hover:text-white transition-all flex items-center justify-center z-10">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={scrollNext} aria-label="Next"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 hover:border-[#CC0000] hover:bg-[#CC0000] hover:text-white transition-all flex items-center justify-center z-10">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {partners.map((_, index) => (
                <button key={index} onClick={() => emblaApi?.scrollTo(index)} aria-label={`Go to partner ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${index === selectedIndex ? 'bg-[#CC0000] w-6' : 'bg-[#CC0000]/20 w-1.5 hover:bg-[#CC0000]/40'}`} />
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT + GOALS — editorial split ── */}
        <section ref={introRef} className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl border border-gray-100">

            {/* Left: intro text */}
            <div className="bg-[#0A0A0A] p-10 md:p-14 flex flex-col justify-between" style={fadeUp(introVisible, 0)}>
              <div>
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-5 h-px bg-[#CC0000]" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#CC0000]">
                    {language === 'en' ? 'About MSK Niagara' : 'À propos de MSK Niagara'}
                  </span>
                </div>
                <blockquote className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-8 bg-[#821d1d]"
                  style={{ fontFamily: 'var(--font-heading)' }}>
                  {language === 'en'
                    ? '"Mobilizing voices that have been marginalized from dominant knowledge structures."'
                    : '«\u00A0Mobiliser les voix marginalisées par les structures de savoir dominantes.\u00A0»'}
                </blockquote>
                <p className="text-white/50 text-sm leading-relaxed">
                  {language === 'en'
                    ? 'MSK Niagara is a transnational, university-community partnership funded by the Social Sciences and Humanities Research Council (SSHRC). Our interdisciplinary team of faculty, students and community organizations is committed to fostering a more just and inclusive Niagara. Through community-based participatory research conducted in English, French and Spanish, we mobilize knowledge that challenges dominant power structures.'
                    : 'MSK Niagara est un partenariat transnational université-communauté financé par le CRSH. Notre équipe interdisciplinaire mène des recherches participatives en anglais, français et espagnol pour mobiliser des connaissances qui défient les structures de pouvoir dominantes.'}
                </p>
              </div>
              <div className="mt-10 pt-8 border-t border-white/10">
                <a href="https://www.sshrc-crsh.gc.ca/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors">
                  <img src={sshrcLogo} alt="SSHRC" className="h-5 opacity-40 hover:opacity-70 transition-opacity invert" />
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Right: numbered goals */}
            <div className="bg-white p-10 md:p-14" style={fadeUp(introVisible, 100)}>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-5 h-px bg-[#CC0000]" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#CC0000]">
                  {language === 'en' ? 'Through our research, we will' : 'Grâce à notre recherche, nous allons'}
                </span>
              </div>
              <div className="space-y-0 divide-y divide-gray-100">
                {goals.map((goal, i) => (
                  <div key={i} className="py-5 flex gap-5 group" style={fadeUp(introVisible, 150 + i * 80)}>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full border border-[#CC0000]/20 flex items-center justify-center group-hover:bg-[#CC0000] group-hover:border-[#CC0000] transition-all duration-300">
                      <span className="text-[11px] font-black text-[#CC0000] group-hover:text-white transition-colors">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed pt-1">{goal}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── RESEARCH HUBS ── */}
        <section ref={hubsRef} className="mb-24">
          <div className="mb-10" style={fadeUp(hubsVisible, 0)}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-px bg-[#CC0000]" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#CC0000]">
                {language === 'en' ? 'Research Hubs' : 'Pôles de recherche'}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0A0A0A] leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}>
              {language === 'en' ? 'Three Focused Hubs' : 'Trois pôles ciblés'}
            </h2>
            <p className="text-gray-500 mt-3 text-sm max-w-xl">
              {language === 'en'
                ? 'Our work is organized into three research hubs that focus on areas critical to community well-being.'
                : 'Notre travail est organisé en trois pôles de recherche axés sur des domaines essentiels au bien-être communautaire.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-100 rounded-2xl overflow-hidden">
            {hubs.map(({ id, color, titleEn, titleFr, descEn, descFr }, i) => (
              <Link key={id} to={`/about/hubs/${id}`}
                className="group bg-white p-8 flex flex-col gap-6 hover:bg-gray-50 transition-colors duration-300"
                style={fadeUp(hubsVisible, i * 100)}>
                {/* Color swatch */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-1 rounded-full" style={{ backgroundColor: color }} />
                  <div className="w-2 h-2 rounded-full opacity-40" style={{ backgroundColor: color }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#0A0A0A] mb-3 leading-snug group-hover:text-[#CC0000] transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-heading)' }}>
                    {language === 'en' ? titleEn : titleFr}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {language === 'en' ? descEn : descFr}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-gray-300 group-hover:text-[#CC0000] transition-colors duration-300">
                  {language === 'en' ? 'Explore Hub' : 'Explorer'}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── GOVERNANCE ── */}
        <section ref={govRef} className="mb-8">
          <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-lg">
            {/* Header bar */}
            <div className="bg-[#CC0000] px-10 py-8 flex items-center gap-4" style={fadeUp(govVisible, 0)}>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-0.5">
                  {language === 'en' ? 'Structure' : 'Structure'}
                </p>
                <h2 className="text-2xl font-extrabold text-white leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
                  {language === 'en' ? 'Governance' : 'Gouvernance'}
                </h2>
              </div>
            </div>

            <div className="bg-white">
              {/* IC stats strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100" style={fadeUp(govVisible, 100)}>
                {[
                  { n: '10', label: language === 'en' ? 'IC Members' : 'Membres du CM' },
                  { n: '2', label: language === 'en' ? 'Co-Directors' : 'Codirecteurs' },
                  { n: '6', label: language === 'en' ? 'Hub Representatives' : 'Représentants des pôles' },
                  { n: '2', label: language === 'en' ? 'Student Representatives' : 'Représentants étudiants' },
                ].map((s, i) => (
                  <div key={i} className="bg-white px-8 py-6 flex flex-col">
                    <div className="w-4 h-0.5 bg-[#CC0000] mb-3 rounded-full" />
                    <div className="text-4xl font-extrabold text-[#0A0A0A] leading-none mb-1"
                      style={{ fontFamily: 'var(--font-heading)' }}>{s.n}</div>
                    <div className="text-[11px] font-semibold tracking-wide uppercase text-gray-400">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Two columns of detail */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100" style={fadeUp(govVisible, 200)}>
                <div className="bg-white p-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-4 h-4 text-[#CC0000]" />
                    <h3 className="text-base font-bold text-[#0A0A0A]">
                      {language === 'en' ? 'Implementation Council (IC)' : 'Conseil de mise en œuvre (CM)'}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {language === 'en'
                      ? 'Even though we work from 3 distinct Hubs and 5 projects, the MSK initiative is governed by the Implementation Council (IC) — a unifying body where each Hub and project is valued equally. The IC makes all important governance and administration decisions by consensus. Membership rotates annually so that all interested participants may serve.'
                      : 'Bien que nous travaillions à partir de 3 pôles distincts et 5 projets, l\'initiative MSK est gouvernée par le Conseil de mise en œuvre (CM) — un organe unificateur où chaque pôle et projet est valorisé également. Le CM prend toutes les décisions importantes par consensus. La composition varie annuellement pour que tous les participants intéressés puissent siéger.'}
                  </p>
                </div>
                <div className="bg-white p-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-4 h-4 text-[#CC0000]" />
                    <h3 className="text-base font-bold text-[#0A0A0A]">
                      {language === 'en' ? 'Hub Leaders & Co-Leaders' : 'Responsables et co-responsables des pôles'}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {language === 'en'
                      ? 'Each research hub is led or co-led by experienced university and/or community-based researchers who coordinate hub activities, facilitate collaboration, and ensure research quality. Hub and student representatives are chosen by Hub members based on the principle of annual rotating membership.'
                      : 'Chaque pôle de recherche est dirigé ou codirigé par des chercheurs universitaires et/ou communautaires expérimentés. Les représentants des pôles et des étudiants sont choisis par les membres du pôle selon le principe de rotation annuelle.'}
                  </p>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="px-10 py-8 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                style={fadeUp(govVisible, 300)}>
                <p className="text-sm text-gray-500 max-w-lg">
                  {language === 'en'
                    ? 'We invite you to learn more about the unique and exciting work unfolding in our Hubs. While our activities are Niagara-focussed, we hope that all small and mid-sized centres can draw on our work.'
                    : 'Nous vous invitons à en apprendre davantage sur le travail unique et passionnant qui se déroule dans nos pôles. Bien que nos activités soient axées sur Niagara, nous espérons que tous les petits et moyens centres pourront s\'en inspirer.'}
                </p>
                <Link to="/about/hubs"
                  className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#CC0000] text-white text-sm font-semibold rounded-xl hover:bg-[#DA0C0C] transition-colors">
                  {language === 'en' ? 'Explore Hubs' : 'Explorer les pôles'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
