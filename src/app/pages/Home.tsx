/**
 * Home Page Component
 * 
 * Main landing page for the MSK Niagara Research Partnership website.
 * 
 * Sections:
 * 1. Hero Banner - Eye-catching introduction with animated elements
 * 2. Land Acknowledgment - Recognition of Indigenous territories
 * 3. Main Introduction - Project overview and objectives
 * 4. Research Objectives - 4 key goals with icons
 * 5. Research Hubs Overview - Summaries of 3 main hubs
 * 6. Governance Structure - Implementation Council details
 * 7. Co-Directors Section - Leadership profiles
 * 8. Quick Links - Cards to Research Hubs, Projects, and Community
 * 9. Call to Action - Partnership invitation
 * 
 * Features:
 * - Fully bilingual (English/French)
 * - Responsive design with mobile optimizations
 * - Smooth animations (fade-in, slide-in)
 * - External links to SSHRC and community pages
 * - Accessible with semantic HTML and ARIA labels
 * 
 * Color Scheme: Black, White & Dark Red (#8B0000)
 * 
 * @author MSK Development Team
 * @version 2.0
 */

import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router';
import { ArrowRight, Users, BookOpen, Calendar, ExternalLink, CheckCircle2, UserCheck, Code, Handshake, Database, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { useEffect, useRef, useState } from 'react';
import { EmberParticles } from '../components/HeroAnimations';

// Import co-director profile images
const jeanNtakirutimanaImg = '/a4bced4acbd5814bb109a187b7f1325cde395ea7.png';
const livianaTossuttiImg = '/438f2f96ee4c30da348ebf5afdbb45ab22a5947b.png';

export function Home() {
  const { language } = useLanguage();
  const workSectionRef = useRef<HTMLDivElement>(null);
  const [workVisible, setWorkVisible] = useState(false);

  useEffect(() => {
    const el = workSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setWorkVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /**
   * Co-Directors Data
   * Leadership profiles displayed on the home page
   */
  const coDirectors = [
    {
      name: 'Dr. Livianna Tossutti',
      titleEn: 'Professor and Co-Director, Brock University',
      titleFr: 'Professeure et Codirectrice, Université Brock',
      image: livianaTossuttiImg,
    },
    {
      name: 'Dr. Jean Ntakirutimana',
      titleEn: 'Professor and Co-Director, Brock University',
      titleFr: 'Professeur et Codirecteur, Université Brock',
      image: jeanNtakirutimanaImg,
    },
  ];

  return (
    <div>
      {/* Hero Banner - Video Background */}
      <section className="relative text-white py-20 md:py-28 overflow-hidden min-h-[520px] flex items-center">
        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source
            src="https://videos.pexels.com/video-files/3173312/3173312-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
          <source
            src="https://videos.pexels.com/video-files/6419194/6419194-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark red overlay for readability */}
        <div className="absolute inset-0 bg-[#8B0000]/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40"></div>

        {/* Black accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0A0A0A]/0 via-[#0A0A0A] to-[#0A0A0A]/0"></div>

        {/* Ember particles drifting upward */}
        <EmberParticles count={14} />

        <div className="relative w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl mb-6 font-bold animate-fade-in-up leading-tight text-white drop-shadow-lg">
            {language === 'en' 
              ? 'Mobilizing Subjugated Knowledges for a Just and Inclusive Niagara'
              : 'Mobiliser les savoirs marginalisés pour un Niagara juste et inclusif'}
          </h1>
          <p className="text-lg md:text-2xl max-w-4xl mx-auto animate-fade-in-up animate-delay-200 leading-relaxed text-white/95 drop-shadow">
            {language === 'en'
              ? 'A transnational, university-community partnership committed to fostering social justice'
              : 'Un partenariat transnational université-communauté engagé à bâtir la justice sociale'}
          </p>
          
          {/* CTA Buttons — Participation-First Entry Points */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animate-delay-300">
            <Link 
              to="/research/projects"
              className="group px-8 py-4 bg-[#8B0000] text-white rounded-full font-bold shadow-xl hover:bg-[#A40000] hover:shadow-[0_8px_25px_rgba(139,0,0,0.5)] transform hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2 text-base"
            >
              <UserCheck className="w-5 h-5 text-[#FFC956]" />
              {language === 'en' ? 'Participate in Research' : 'Participer à la recherche'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/partners"
              className="px-8 py-4 bg-[#0A0A0A] border-2 border-[#8B0000]/60 text-white rounded-full font-semibold hover:bg-white hover:text-[#0A0A0A] hover:border-white transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 text-base"
            >
              <Handshake className="w-5 h-5 text-[#089EA5]" />
              {language === 'en' ? 'Partner With Us' : 'Devenir partenaire'}
            </Link>
            <Link 
              to="/research/knowledge"
              className="px-6 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-semibold hover:bg-white/20 transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 text-sm"
            >
              <Database className="w-4 h-4 text-white/80" />
              {language === 'en' ? 'Explore Open Science' : 'Sciences ouvertes'}
            </Link>
          </div>
        </div>

        {/* Video credit */}
        <a
          href="https://www.pexels.com/video/the-strong-force-of-niagara-falls-3173312/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-4 text-white/50 hover:text-white/80 text-xs transition-colors"
          aria-label="Video credit"
        >
          Video by Aric Shelby · Pexels
        </a>
      </section>

      {/* Land Acknowledgment Section — atmospheric dark */}
      <section className="relative bg-[#0A0A0A] py-14 overflow-hidden">
        {/* Dot-grid brand motif */}
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}
        />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#8B0000] to-transparent" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-6">
            <div className="shrink-0 mt-1">
              <div className="w-8 h-8 rounded-lg bg-[#8B0000]/20 border border-[#8B0000]/30 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#8B0000]" />
              </div>
            </div>
            <div>
              <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-[#8B0000] mb-3">
                {language === 'en' ? 'Land Acknowledgment' : 'Reconnaissance territoriale'}
              </h2>
              <p className="text-white/55 leading-relaxed text-base max-w-3xl">
                {language === 'en'
                  ? 'Brock University is situated on the traditional territory of the Haudenosaunee and Anishinaabe peoples, many of whom continue to live and work here today. This territory is covered by the Upper Canada Treaties and is within the land protected by the Dish with One Spoon Wampum Agreement. We acknowledge the enduring presence and deep traditional knowledge, laws, and resources of Indigenous peoples, and are grateful to have the opportunity to work in this territory.'
                  : 'L\'Université Brock est située sur le territoire traditionnel des peuples Haudenosaunee et Anishinaabe, dont beaucoup continuent de vivre et de travailler ici aujourd\'hui. Ce territoire est couvert par les traités du Haut-Canada et se trouve sur le territoire protégé par l\'accord de wampum du plat à une cuillère. Nous reconnaissons la présence durable et les connaissances traditionnelles profondes, les lois et les ressources des peuples autochtones, et nous sommes reconnaissants d\'avoir l\'occasion de travailler sur ce territoire.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROLE-BASED FAST-TRACK ENTRY POINTS (Participatory UX) ── */}
      <section className="relative py-12 bg-gradient-to-b from-gray-900 to-[#0A0A0A] border-b border-white/10 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B0000]/30 border border-[#8B0000]/60 text-[#FFC956] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              {language === 'en' ? 'Interactive Virtual Lab Bench' : 'Banc de laboratoire virtuel'}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              {language === 'en' ? 'How Would You Like to Contribute?' : 'Comment souhaitez-vous contribuer?'}
            </h2>
            <p className="text-white/60 text-sm max-w-xl mx-auto mt-1">
              {language === 'en' 
                ? 'Select your pathway below to access tailored research resources, study opportunities, or partnership channels.'
                : 'Sélectionnez votre parcours ci-dessous pour accéder aux ressources de recherche et opportunités de partenariat.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Participant */}
            <Link to="/research/projects" className="group bg-white/5 border border-white/10 hover:border-[#8B0000] hover:bg-white/10 p-6 rounded-2xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#8B0000]/20 border border-[#8B0000]/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UserCheck className="w-6 h-6 text-[#FFC956]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FFC956] transition-colors">
                {language === 'en' ? 'I am a Community Member' : 'Je suis un membre de la communauté'}
              </h3>
              <p className="text-white/60 text-xs leading-relaxed mb-4">
                {language === 'en'
                  ? 'Participate in active research studies, share your story, or attend upcoming community-university symposiums.'
                  : 'Participez à nos études de recherche actives, partagez votre histoire ou assistez à nos symposiums.'}
              </p>
              <span className="text-xs font-bold text-[#FFC956] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                {language === 'en' ? 'View Active Studies' : 'Voir les études actives'} →
              </span>
            </Link>

            {/* Card 2: Researcher */}
            <Link to="/research/knowledge" className="group bg-white/5 border border-white/10 hover:border-[#089EA5] hover:bg-white/10 p-6 rounded-2xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#089EA5]/20 border border-[#089EA5]/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-[#089EA5]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#089EA5] transition-colors">
                {language === 'en' ? 'I am a Scholar / Researcher' : 'Je suis un chercheur / universitaire'}
              </h3>
              <p className="text-white/60 text-xs leading-relaxed mb-4">
                {language === 'en'
                  ? 'Access open-access publications, generate APA/BibTeX citations, or explore our GitHub open science code.'
                  : 'Accédez aux publications en libre accès, générez des citations APA/BibTeX ou explorez notre code GitHub.'}
              </p>
              <span className="text-xs font-bold text-[#089EA5] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                {language === 'en' ? 'Explore Open Science' : 'Explorer la science ouverte'} →
              </span>
            </Link>

            {/* Card 3: Partner / Funder */}
            <Link to="/partners" className="group bg-white/5 border border-white/10 hover:border-[#6635B1] hover:bg-white/10 p-6 rounded-2xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#6635B1]/20 border border-[#6635B1]/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Handshake className="w-6 h-6 text-[#B68DFF]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#B68DFF] transition-colors">
                {language === 'en' ? 'I am an Organization / Funder' : 'Je suis une organisation / bailleur'}
              </h3>
              <p className="text-white/60 text-xs leading-relaxed mb-4">
                {language === 'en'
                  ? 'Collaborate on community initiatives, join the Implementation Council, or support SSHRC-funded programs.'
                  : 'Collaborer à des initiatives communautaires, rejoindre le conseil de mise en œuvre ou soutenir nos programmes.'}
              </p>
              <span className="text-xs font-bold text-[#B68DFF] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                {language === 'en' ? 'Become a Partner' : 'Devenir partenaire'} →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission + Impact Strip */}
      <section id="mission" className="py-16 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Mission text */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-px bg-[#8B0000]" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B0000]">
                  {language === 'en' ? 'Our Mission' : 'Notre mission'}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A0A0A] leading-tight mb-5"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {language === 'en'
                  ? 'Research that centers the voices others have silenced'
                  : 'Une recherche qui centre les voix que d\'autres ont fait taire'}
              </h2>
              <p className="text-gray-500 leading-relaxed text-[15px]">
                {language === 'en'
                  ? 'MSK Niagara is a transnational, university-community partnership funded by SSHRC. Our interdisciplinary team conducts community-based participatory research in English, French, and Spanish to mobilize knowledge that has been marginalized from dominant structures of power.'
                  : 'MSK Niagara est un partenariat transnational université-communauté financé par le CRSH. Notre équipe interdisciplinaire mène des recherches participatives communautaires en anglais, français et espagnol pour mobiliser des connaissances marginalisées par les structures de pouvoir dominantes.'}
              </p>
            </div>

            {/* Impact numbers — 2×2 grid */}
            <div className="grid grid-cols-2 gap-px bg-gray-100 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              {[
                { n: '65', label: language === 'en' ? 'Team Members' : 'Membres' },
                { n: '26', label: language === 'en' ? 'Community Partners' : 'Partenaires communautaires' },
                { n: '3', label: language === 'en' ? 'Research Hubs' : 'Pôles de recherche' },
                { n: '5+', label: language === 'en' ? 'Active Projects' : 'Projets actifs' },
              ].map((s, i) => (
                <div key={s.n} className={`bg-white px-6 py-7 flex flex-col ${i === 0 ? 'rounded-tl-2xl' : ''} ${i === 1 ? 'rounded-tr-2xl' : ''} ${i === 2 ? 'rounded-bl-2xl' : ''} ${i === 3 ? 'rounded-br-2xl' : ''}`}>
                  <div className="w-5 h-0.5 bg-[#8B0000] mb-3 rounded-full" />
                  <div className="text-4xl font-extrabold text-[#0A0A0A] leading-none mb-2"
                    style={{ fontFamily: 'var(--font-heading)' }}>
                    {s.n}
                  </div>
                  <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-gray-400 leading-snug">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Research Hubs Visual Cards */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-[#0A0A0A]" style={{ fontFamily: 'var(--font-heading)' }}>
                {language === 'en' ? 'Three Research Hubs' : 'Trois pôles de recherche'}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {language === 'en' ? 'Focused areas critical to community well-being' : 'Domaines essentiels au bien-être communautaire'}
              </p>
            </div>
            <Link to="/about/hubs"
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-[#8B0000] hover:text-[#A31515] transition-colors">
              {language === 'en' ? 'Explore all hubs' : 'Explorer tous les pôles'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                number: '01',
                color: '#089EA5',
                image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=600',
                title: language === 'en' ? 'Childhood & Growing Up' : 'Enfance et croissance',
                desc: language === 'en'
                  ? 'Listening to newcomer children\'s experiences with housing, sport, education, and belonging.'
                  : 'Écouter les expériences des enfants nouveaux arrivants en matière de logement, sport, éducation et appartenance.',
                href: '/about/hubs/childhood',
                topics: language === 'en' ? ['Housing & Home', 'Leisure & Sport', 'Education'] : ['Logement', 'Loisirs', 'Éducation'],
              },
              {
                number: '02',
                color: '#C97B2E',
                image: '/community/health-literacy-symposium.jpg',
                title: language === 'en' ? 'Health Literacy' : 'Littératie en santé',
                desc: language === 'en'
                  ? 'Promoting health literacy in immigrant and refugee populations across Niagara.'
                  : 'Promouvoir la littératie en santé auprès des populations immigrantes et réfugiées.',
                href: '/about/hubs/health',
                topics: language === 'en' ? ['Healthcare Access', 'Newcomer Health', 'Resources'] : ['Accès aux soins', 'Santé', 'Ressources'],
              },
              {
                number: '03',
                color: '#7B5EA7',
                image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600',
                title: language === 'en' ? 'Identity, Connections & Belonging' : 'Identité, liens et appartenance',
                desc: language === 'en'
                  ? 'Fostering belonging among Afro-descendants, LGBTQ+ newcomers, and seasonal farmworkers.'
                  : 'Favoriser l\'appartenance chez les personnes afro-descendantes, les nouveaux arrivants LGBTQ+ et les travailleurs agricoles.',
                href: '/about/hubs/identity',
                topics: language === 'en' ? ['Afro-Descendants', 'LGBTQ+ Newcomers', 'Farmworkers'] : ['Afro-descendants', 'LGBTQ+', 'Travailleurs'],
              },
            ].map((hub) => (
              <Link
                key={hub.number}
                to={hub.href}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Hub Banner Image */}
                <div className="h-44 w-full overflow-hidden relative">
                  <img
                    src={hub.image}
                    alt={hub.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <span className="absolute bottom-3 left-4 text-3xl font-black leading-none text-white/40" style={{ fontFamily: 'var(--font-heading)' }}>
                    {hub.number}
                  </span>
                </div>
                {/* Top accent bar under image */}
                <div className="h-1 w-full" style={{ backgroundColor: hub.color }} />
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-[#0A0A0A] text-lg leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
                      {hub.title}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#8B0000] group-hover:translate-x-0.5 transition-all mt-1 flex-shrink-0" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{hub.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                    {hub.topics.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-full text-[11px] font-medium text-white"
                        style={{ backgroundColor: hub.color + 'CC' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY PHOTO GALLERY: "Voices from the Community" ── */}
      <section className="py-20 bg-[#0A0A0A] overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B0000]/30 border border-[#8B0000]/50 text-[#FFC956] text-xs font-bold uppercase tracking-wider mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFC956] animate-pulse" />
                {language === 'en' ? 'MSK/MSM Symposium · June 19, 2026' : 'Symposium MSK/MSM · 19 juin 2026'}
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                {language === 'en' ? 'Voices from' : 'Voix de la'}
                <span className="text-[#8B0000]"> {language === 'en' ? 'the Community' : 'communauté'}</span>
              </h2>
              <p className="text-white/50 text-sm mt-2 max-w-md">
                {language === 'en'
                  ? 'Real conversations. Real people. Real change. Photographs from our community-university partnership events.'
                  : 'Des conversations vraies. Des gens réels. Un changement réel. Photos de nos événements de partenariat.'}
              </p>
            </div>
            <Link
              to="/timeline"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white/70 hover:text-white hover:border-white/50 rounded-full text-sm font-semibold transition-all duration-200"
            >
              {language === 'en' ? 'View Symposium Details' : 'Voir le symposium'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Creative Masonry Gallery Grid */}
          <div className="grid grid-cols-12 grid-rows-2 gap-3 h-[520px] md:h-[600px]">

            {/* Cell 1 — Large left tile (spans 5 cols × 2 rows) */}
            <div className="col-span-12 md:col-span-5 row-span-2 group relative overflow-hidden rounded-3xl cursor-pointer">
              <img
                src="/community/community-voice-speaking.jpg"
                alt={language === 'en' ? 'A community member speaking passionately at an MSK research session' : 'Un membre de la communauté s\'exprimant lors d\'une séance MSK'}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFC956] mb-2 block">Community Voices</span>
                <p className="text-white font-semibold text-base leading-snug">
                  {language === 'en'
                    ? '"Sharing lived experiences that shape policy and practice"'
                    : '"Partager des expériences vécues qui façonnent les politiques"'}
                </p>
              </div>
            </div>

            {/* Cell 2 — Top-right wide tile (spans 4 cols) */}
            <div className="col-span-12 md:col-span-4 group relative overflow-hidden rounded-3xl cursor-pointer">
              <img
                src="/community/health-literacy-symposium.jpg"
                alt={language === 'en' ? 'Health Literacy Hub presentation at MSK Symposium June 2026' : 'Présentation du Pôle Littératie en santé au Symposium MSK juin 2026'}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#8B0000] text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFC956] animate-pulse" />
                  {language === 'en' ? 'Health Literacy Hub' : 'Pôle Santé'}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-sm leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {language === 'en' ? 'Promoting Health Literacy — MSK Symposium 2026' : 'Promouvoir la littératie en santé — Symposium MSK 2026'}
                </p>
              </div>
            </div>

            {/* Cell 3 — Top-right narrow tile (spans 3 cols) */}
            <div className="col-span-12 md:col-span-3 group relative overflow-hidden rounded-3xl cursor-pointer">
              <img
                src="/community/symposium-participants-discussion.jpg"
                alt={language === 'en' ? 'Symposium participants engaged in table discussion' : 'Participants du symposium en discussion de table'}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0A]/70" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/15 backdrop-blur-md rounded-2xl px-4 py-3 mx-4 text-center">
                  <p className="text-white text-xs font-semibold">{language === 'en' ? 'Engaged participants' : 'Participants engagés'}</p>
                </div>
              </div>
            </div>

            {/* Cell 4 — Bottom-right wide (spans 4 cols) */}
            <div className="col-span-12 md:col-span-4 group relative overflow-hidden rounded-3xl cursor-pointer">
              <img
                src="/community/researchers-engaging.jpg"
                alt={language === 'en' ? 'Researchers in conversation at a community meeting' : 'Chercheurs en conversation lors d\'une réunion communautaire'}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-sm font-semibold">
                  {language === 'en' ? 'Building knowledge together' : 'Construire le savoir ensemble'}
                </p>
              </div>
            </div>

            {/* Cell 5 — Bottom-right narrow (spans 3 cols) */}
            <div className="col-span-12 md:col-span-3 group relative overflow-hidden rounded-3xl cursor-pointer">
              <img
                src="/community/community-laughter-connection.jpg"
                alt={language === 'en' ? 'Community members sharing a moment of laughter and connection' : 'Membres de la communauté partageant un moment de rire et de connexion'}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />
              <div className="absolute inset-0 flex items-end justify-start p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-xs font-semibold bg-[#8B0000]/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  {language === 'en' ? 'Real connection ✦' : 'Connexion vraie ✦'}
                </span>
              </div>
            </div>

          </div>

          {/* Caption */}
          <p className="text-center text-white/30 text-xs mt-5">
            {language === 'en'
              ? 'Photography from MSK/MSM community-university partnership events, Niagara Region, 2024–2026'
              : 'Photographies des événements du partenariat communautaire-universitaire MSK/MSM, région de Niagara, 2024–2026'}
          </p>
        </div>
      </section>

      {/* Goals strip */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 items-start">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-px bg-[#8B0000]" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B0000]">
                  {language === 'en' ? 'What We Do' : 'Ce que nous faisons'}
                </span>
              </div>
              <h2 className="text-3xl font-extrabold text-[#0A0A0A] leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {language === 'en' ? 'Four goals driving our work' : 'Quatre objectifs qui guident notre travail'}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(language === 'en' ? [
                { n: '01', text: 'Provide a forum for African-descendant and foreign-born persons to share their knowledge and accomplishments.' },
                { n: '02', text: 'Equip community organizations with insights and tools to develop culturally responsive services.' },
                { n: '03', text: 'Contribute to scholarship through peer-reviewed research and knowledge dissemination.' },
                { n: '04', text: 'Offer training and mentoring for student and community-based researchers.' },
              ] : [
                { n: '01', text: 'Offrir un forum aux personnes d\'ascendance africaine et aux personnes nées à l\'étranger pour partager leurs connaissances.' },
                { n: '02', text: 'Fournir aux organismes communautaires des outils pour développer des services culturellement adaptés.' },
                { n: '03', text: 'Contribuer à la recherche par des publications et la diffusion des connaissances.' },
                { n: '04', text: 'Offrir de la formation et du mentorat aux chercheurs étudiants et communautaires.' },
              ]).map(goal => (
                <div key={goal.n} className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#8B0000]/20 transition-colors">
                  <span className="text-xl font-black text-[#8B0000]/20 leading-none shrink-0" style={{ fontFamily: 'var(--font-heading)' }}>
                    {goal.n}
                  </span>
                  <p className="text-sm text-gray-600 leading-relaxed">{goal.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Original detailed content — keeping for SEO/academic reference but visually restructured */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-start">
            
            {/* Left side: Text & Objectives */}
            <div className="prose prose-lg max-w-none">
              {language === 'en' ? (
                <>
                  <p className="text-lg text-[#0A0A0A]/90 leading-relaxed mb-6 animate-fade-in-up animate-delay-100">
                    <strong className="text-[#8B0000] text-xl">Mobilizing Subjugated Knowledges for a Just and Inclusive Niagara</strong> is a transnational, university-community partnership funded by the{' '}
                    <a 
                      href="https://www.sshrc-crsh.gc.ca/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#8B0000] hover:text-[#A40000] underline inline-flex items-center gap-1 font-semibold transition-colors"
                    >
                      Social Sciences and Humanities Research Council
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    . Our interdisciplinary team of faculty, students and{' '}
                    <Link to="/community" className="text-[#8B0000] hover:text-[#A40000] underline font-semibold transition-colors">
                      community organizations
                    </Link>
                    {' '}is committed to fostering a more just and inclusive Niagara. Our work is informed by the principles of social justice and a desire to mobilize voices that have been marginalized from the dominant knowledge structures that maintain and enhance power in society.
                  </p>

                  <p className="text-lg text-[#0A0A0A]/90 leading-relaxed mb-8 animate-fade-in-up animate-delay-200">
                    Through community-based participatory research and knowledge mobilization conducted in <strong className="text-[#8B0000]">English, French and Spanish</strong>, we will:
                  </p>

                  <div className="space-y-4 mb-12">
                    <div className="flex gap-4 p-4 bg-[#8B0000]/5 rounded-xl animate-slide-in-left animate-delay-100 hover:shadow-md transition-shadow">
                      <CheckCircle2 className="w-7 h-7 text-[#8B0000] flex-shrink-0 mt-1" />
                      <p className="text-[#0A0A0A]/90 leading-relaxed">
                        Provide a forum for African descendant and foreign-born persons in the Regional Municipality of Niagara to share their experiences, knowledge and accomplishments with the non-profit, academic, government and para-public sectors;
                      </p>
                    </div>
                    <div className="flex gap-4 p-4 bg-[#8B0000]/5 rounded-xl animate-slide-in-left animate-delay-200 hover:shadow-md transition-shadow">
                      <CheckCircle2 className="w-7 h-7 text-[#8B0000] flex-shrink-0 mt-1" />
                      <p className="text-[#0A0A0A]/90 leading-relaxed">
                        Provide community organizations with insights and tools to develop culturally responsive services;
                      </p>
                    </div>
                    <div className="flex gap-4 p-4 bg-[#8B0000]/5 rounded-xl animate-slide-in-left animate-delay-300 hover:shadow-md transition-shadow">
                      <CheckCircle2 className="w-7 h-7 text-[#8B0000] flex-shrink-0 mt-1" />
                      <p className="text-[#0A0A0A]/90 leading-relaxed">
                        Contribute to scholarship;
                      </p>
                    </div>
                    <div className="flex gap-4 p-4 bg-[#8B0000]/5 rounded-xl animate-slide-in-left animate-delay-400 hover:shadow-md transition-shadow">
                      <CheckCircle2 className="w-7 h-7 text-[#8B0000] flex-shrink-0 mt-1" />
                      <p className="text-[#0A0A0A]/90 leading-relaxed">
                        Provide training and mentoring for student and community-based researchers.
                      </p>
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl text-[#0A0A0A] mb-6 mt-12 animate-fade-in-up">Our Research Hubs</h2>
                  <p className="text-lg text-[#0A0A0A]/90 leading-relaxed mb-6 animate-fade-in-up animate-delay-100">
                    Our work is organized into three research Hubs that focus on areas critical to well-being:
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="p-5 bg-[#8B0000]/5 rounded-lg border-l-4 border-[#8B0000] animate-fade-in-up animate-delay-100">
                      <h3 className="text-xl font-semibold text-[#0A0A0A] mb-2">
                        <Link to="/about/hubs/childhood" className="hover:text-[#8B0000] transition-colors">
                          Childhood and Growing Up Hub
                        </Link>
                      </h3>
                      <p className="text-[#0A0A0A]/80">
                        Will listen to and respond to newcomer children with respect to their experiences in housing, sport/recreation and schooling.
                      </p>
                    </div>

                    <div className="p-5 bg-[#8B0000]/5 rounded-lg border-l-4 border-[#8B0000] animate-fade-in-up animate-delay-200">
                      <h3 className="text-xl font-semibold text-[#0A0A0A] mb-2">
                        <Link to="/about/hubs/health" className="hover:text-[#8B0000] transition-colors">
                          Health Literacy Hub
                        </Link>
                      </h3>
                      <p className="text-[#0A0A0A]/80">
                        Will promote health literacy in immigrant and refugee populations.
                      </p>
                    </div>

                    <div className="p-5 bg-[#8B0000]/5 rounded-lg border-l-4 border-[#8B0000] animate-fade-in-up animate-delay-300">
                      <h3 className="text-xl font-semibold text-[#0A0A0A] mb-2">
                        <Link to="/about/hubs/identity" className="hover:text-[#8B0000] transition-colors">
                          Identity, Connections and Belonging Hub
                        </Link>
                      </h3>
                      <p className="text-[#0A0A0A]/80">
                        Hosts three distinct projects which will foster a sense of belonging amongst three populations: Afro-descendants, sexual and gender diverse young adult newcomers, and seasonal agricultural workers.
                      </p>
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl text-[#0A0A0A] mb-6 mt-12 animate-fade-in-up">Governance Structure</h2>
                  <p className="text-lg text-[#0A0A0A]/90 leading-relaxed mb-6 animate-fade-in-up animate-delay-100">
                    Even though we are working from 3 distinct Hubs and 5 projects, the MSK initiative is governed by a unifying structure—<strong>the Implementation Council (IC)</strong>—in which each Hub and each project is valued in its interactions with other Hubs/projects. The IC is the body where important decisions regarding governance and administration are made by consensus.
                  </p>
                  <p className="text-lg text-[#0A0A0A]/90 leading-relaxed mb-6 animate-fade-in-up animate-delay-200">
                    The IC comprises 10 members: the 2 Co-Directors, 6 Hub representatives (2 from each Hub: 1 community organization representative + 1 faculty member) and 2 at-large student representatives. Hub and student representatives are chosen by Hub members, based on the principle of annual rotating membership so that all interested participants may serve if they wish.
                  </p>

                  <div className="p-6 bg-[#8B0000]/5 rounded-lg my-12 border border-[#8B0000]/20 animate-fade-in-up animate-delay-300">
                    <p className="text-lg text-[#0A0A0A] leading-relaxed mb-4">
                      <strong>We invite you to learn more about the unique and exciting work unfolding in our Hubs.</strong>
                    </p>
                    <p className="text-[#0A0A0A]/80">
                      While our activities are Niagara-focussed, we hope that all small and mid-sized centres can draw on our work as part of their efforts to build more just and inclusive communities.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-lg text-[#0A0A0A]/90 leading-relaxed mb-6 animate-fade-in-up">
                    <strong className="text-[#8B0000] text-xl">Mobiliser les savoirs marginalisés pour un Niagara juste et inclusif</strong> est un partenariat transnational université-communauté financé par le{' '}
                    <a 
                      href="https://www.sshrc-crsh.gc.ca/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#8B0000] hover:text-[#A40000] underline inline-flex items-center gap-1 font-semibold transition-colors"
                    >
                      Conseil de recherches en sciences humaines (CRSH)
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    . Notre équipe interdisciplinaire, composée de professeur.e.s, d'étudiant.e.s et{' '}
                    <Link to="/community" className="text-[#8B0000] hover:text-[#A40000] underline font-semibold transition-colors">
                      d'organismes communautaires
                    </Link>
                    , s'engage à bâtir un Niagara plus juste et inclusif. Nos travaux s'inspirent des principes de justice sociale et du désir de donner la parole aux personnes marginalisées par les structures de savoir dominantes qui maintiennent et renforcent leur pouvoir dans la société.
                  </p>

                  <p className="text-lg text-[#0A0A0A]/90 leading-relaxed mb-8 animate-fade-in-up animate-delay-100">
                    Par le biais de recherches participatives communautaires et de la mobilisation des connaissances menées en <strong className="text-[#8B0000]">anglais, en français et en espagnol</strong>, nous visons à :
                  </p>

                  <div className="space-y-4 mb-12">
                    <div className="flex gap-4 p-4 bg-[#8B0000]/5 rounded-xl animate-slide-in-left animate-delay-100 hover:shadow-md transition-shadow">
                      <CheckCircle2 className="w-7 h-7 text-[#8B0000] flex-shrink-0 mt-1" />
                      <p className="text-[#0A0A0A]/90 leading-relaxed">
                        Offrir aux personnes d'ascendance africaine et aux personnes nées à l'étranger résidant dans la municipalité régionale de Niagara, une tribune pour partager leurs expériences, leurs connaissances et leurs réalisations, avec les secteurs sans but lucratif, avec le milieu académique, ainsi qu'avec les secteurs gouvernementaux et parapublics;
                      </p>
                    </div>
                    <div className="flex gap-4 p-4 bg-[#8B0000]/5 rounded-xl animate-slide-in-left animate-delay-200 hover:shadow-md transition-shadow">
                      <CheckCircle2 className="w-7 h-7 text-[#8B0000] flex-shrink-0 mt-1" />
                      <p className="text-[#0A0A0A]/90 leading-relaxed">
                        Fournir aux organismes communautaires des perspectives et des outils pour développer des services adaptés à différentes réalités culturelles;
                      </p>
                    </div>
                    <div className="flex gap-4 p-4 bg-[#8B0000]/5 rounded-xl animate-slide-in-left animate-delay-300 hover:shadow-md transition-shadow">
                      <CheckCircle2 className="w-7 h-7 text-[#8B0000] flex-shrink-0 mt-1" />
                      <p className="text-[#0A0A0A]/90 leading-relaxed">
                        Contribuer à la recherche;
                      </p>
                    </div>
                    <div className="flex gap-4 p-4 bg-[#8B0000]/5 rounded-xl animate-slide-in-left animate-delay-400 hover:shadow-md transition-shadow">
                      <CheckCircle2 className="w-7 h-7 text-[#8B0000] flex-shrink-0 mt-1" />
                      <p className="text-[#0A0A0A]/90 leading-relaxed">
                        Offrir de la formation et du mentorat aux étudiant.e.s et aux chercheur.e.s communautaires.
                      </p>
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl text-[#0A0A0A] mb-6 mt-12 animate-fade-in-up">Nos pôles de recherche</h2>
                  <p className="text-lg text-[#0A0A0A]/90 leading-relaxed mb-6 animate-fade-in-up animate-delay-100">
                    Nos travaux s'articulent autour de trois pôles de recherche axés sur des domaines essentiels au bien-être :
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="p-5 bg-[#8B0000]/5 rounded-lg border-l-4 border-[#8B0000] animate-fade-in-up animate-delay-100">
                      <h3 className="text-xl font-semibold text-[#0A0A0A] mb-2">
                        <Link to="/about/hubs/childhood" className="hover:text-[#8B0000] transition-colors">
                          Pôle Enfance et développement
                        </Link>
                      </h3>
                      <p className="text-[#0A0A0A]/80">
                        Écoutera et répondra aux besoins des enfants nouvellement arrivés concernant leur logement, leurs activités sportives et récréatives et leur scolarité.
                      </p>
                    </div>

                    <div className="p-5 bg-[#8B0000]/5 rounded-lg border-l-4 border-[#8B0000] animate-fade-in-up animate-delay-200">
                      <h3 className="text-xl font-semibold text-[#0A0A0A] mb-2">
                        <Link to="/about/hubs/health" className="hover:text-[#8B0000] transition-colors">
                          Pôle Littératie en santé
                        </Link>
                      </h3>
                      <p className="text-[#0A0A0A]/80">
                        Promouvra la littératie en santé auprès des populations immigrantes et réfugiées.
                      </p>
                    </div>

                    <div className="p-5 bg-[#8B0000]/5 rounded-lg border-l-4 border-[#8B0000] animate-fade-in-up animate-delay-300">
                      <h3 className="text-xl font-semibold text-[#0A0A0A] mb-2">
                        <Link to="/about/hubs/identity" className="hover:text-[#8B0000] transition-colors">
                          Pôle Identité, relations et appartenance
                        </Link>
                      </h3>
                      <p className="text-[#0A0A0A]/80">
                        Héberge trois projets distincts visant à favoriser un sentiment d'appartenance chez trois groupes de populations : les personnes afro-descendantes, les jeunes adultes nouvellement arrivé.e.s et ayant une identité de genre et une orientation sexuelle diverses, et le personnel agricole saisonnier.
                      </p>
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl text-[#0A0A0A] mb-6 mt-12 animate-fade-in-up">Structure de gouvernance</h2>
                  <p className="text-lg text-[#0A0A0A]/90 leading-relaxed mb-6 animate-fade-in-up animate-delay-100">
                    Bien que nous travaillions à partir de trois pôles et de cinq projets distincts, l'initiative MSK est régie par une structure unificatrice : <strong>le Conseil de mise en œuvre (CM)</strong>. Au sein de ce Conseil, chaque pôle et chaque projet est valorisé dans ses interactions avec les autres pôles et projets. Le CM est l'instance où les décisions importantes concernant la gouvernance et l'administration sont prises par consensus.
                  </p>
                  <p className="text-lg text-[#0A0A0A]/90 leading-relaxed mb-6 animate-fade-in-up animate-delay-200">
                    Le CM est composé de dix membres : les deux membres de la codirection, six représentant.e.s des pôles (deux par pôle : 1 représentant.e d'un organisme communautaire + 1 membre du corps professoral) et 2 représentant.e.s étudiant.e.s. Les représentant.e.s des pôles et les représentant.e.s étudiant.e.s sont choisi.e.s par les membres des pôles, selon le principe d'une rotation annuelle des membres, permettant ainsi à toute personne intéressée de s'impliquer.
                  </p>

                  <div className="p-6 bg-[#8B0000]/5 rounded-lg my-12 border border-[#8B0000]/20 animate-fade-in-up animate-delay-300">
                    <p className="text-lg text-[#0A0A0A] leading-relaxed mb-4">
                      <strong>Nous vous invitons à découvrir le travail unique et stimulant qui se déroule au sein de nos Pôles.</strong>
                    </p>
                    <p className="text-[#0A0A0A]/80">
                      Bien que nos activités soient axées sur la région de Niagara, nous espérons que toutes les régions de petite et moyenne envergure pourront s'inspirer de notre travail dans le cadre de leurs efforts pour bâtir des communautés plus justes et inclusives.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Right side: Beautiful visual anchor of Niagara Falls */}
            <div className="relative lg:sticky lg:top-24 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.01] transition-transform duration-500 group/img w-full flex-shrink-0 mt-8 lg:mt-0">
              <div className="absolute inset-0 bg-[#8B0000]/10 mix-blend-multiply z-10"></div>
              {/* Highlight border decoration */}
              <div className="absolute inset-0 border-2 border-[#8B0000]/30 rounded-2xl z-20 pointer-events-none m-2"></div>
              <img 
                src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800" 
                alt={language === 'en' ? 'Stunning Niagara Falls landscape representing the Niagara Region partnership' : 'Magnifique paysage des chutes du Niagara représentant le partenariat régional'}
                className="w-full h-[500px] lg:h-[650px] object-cover transition-transform duration-700 group-hover/img:scale-105"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 z-20 text-white">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#EF4444] mb-2 block">
                  {language === 'en' ? 'Niagara Region' : 'Région de Niagara'}
                </span>
                <h4 className="text-xl font-bold mb-2 font-heading" style={{ fontFamily: 'var(--font-heading)' }}>
                  {language === 'en' ? 'Mobilizing Knowledge, Transforming Communities' : 'Mobiliser les savoirs, transformer les communautés'}
                </h4>
                <p className="text-xs text-white/80 leading-relaxed">
                  {language === 'en'
                    ? 'A partnership bridging Brock University and community partners across Saint Catharines, Welland, and Niagara Falls.'
                    : 'Un partenariat reliant l\'Université Brock et les partenaires communautaires à Saint Catharines, Welland et Niagara Falls.'}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Co-Directors Section */}
      <section className="py-16 bg-[#8B0000]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-white mb-8 text-center">
            {language === 'en' ? 'Co-Directors' : 'La Codirection'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coDirectors.map((director, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow bg-white">
                <CardHeader className="text-center pb-4">
                  <Avatar className="mx-auto mb-4 w-24 h-24 rounded-full bg-[#8B0000]">
                    <AvatarImage src={director.image} alt={`${director.name}'s profile`} />
                    <AvatarFallback className="text-white text-3xl font-semibold">
                      {director.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-2xl text-[#0A0A0A]">{director.name}</CardTitle>
                  <CardDescription className="text-base text-[#8B0000] font-medium mt-2">
                    {language === 'en' ? director.titleEn : director.titleFr}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section id="explore" ref={workSectionRef} className="py-20 bg-[#0A0A0A] overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-14"
            style={{
              opacity: workVisible ? 1 : 0,
              transform: workVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-px bg-[#8B0000]" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B0000]">
                {language === 'en' ? 'Explore' : 'Explorer'}
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-none"
              style={{ fontFamily: 'var(--font-heading)' }}>
              {language === 'en' ? 'Our Work' : 'Nos travaux'}
            </h2>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {[
              {
                to: '/about/hubs',
                num: '01',
                Icon: Users,
                titleEn: 'Research Hubs',
                titleFr: 'Pôles de recherche',
                descEn: 'Three collaborative hubs advancing community health, youth development, and belonging in Niagara.',
                descFr: 'Trois pôles collaboratifs pour la santé communautaire, le développement des jeunes et l\'appartenance.',
                delay: 0,
                bgImage: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600'
              },
              {
                to: '/research/projects',
                num: '02',
                Icon: BookOpen,
                titleEn: 'Research Projects',
                titleFr: 'Projets de recherche',
                descEn: 'Five active projects generating knowledge across housing, health, sport, and identity.',
                descFr: 'Cinq projets actifs produisant des connaissances en logement, santé, sport et identité.',
                delay: 100,
                bgImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600'
              },
              {
                to: '/community',
                num: '03',
                Icon: Calendar,
                titleEn: 'Community Partners',
                titleFr: 'Partenaires communautaires',
                descEn: '26 partner organizations co-creating equitable programs across the Niagara region.',
                descFr: '26 organisations partenaires co-créant des programmes équitables dans la région de Niagara.',
                delay: 200,
                bgImage: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=600'
              },
            ].map(({ to, num, Icon, titleEn, titleFr, descEn, descFr, delay, bgImage }) => (
              <Link
                key={to}
                to={to}
                className="group relative bg-[#0A0A0A] p-8 md:p-10 flex flex-col gap-8 overflow-hidden"
                style={{
                  opacity: workVisible ? 1 : 0,
                  transform: workVisible ? 'translateY(0)' : 'translateY(40px)',
                  transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
                }}
              >
                {/* Background image overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-[0.05] group-hover:opacity-[0.15] group-hover:scale-105 transition-all duration-700 ease-out pointer-events-none"
                  style={{ backgroundImage: `url(${bgImage})` }}
                />
                {/* Ghost number */}
                <span
                  className="absolute top-5 right-7 text-8xl font-black select-none pointer-events-none"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: 'rgba(139,0,0,0.08)',
                    transition: 'color 0.4s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(139,0,0,0.18)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(139,0,0,0.08)'; }}
                >
                  {num}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#8B0000]/15 flex items-center justify-center group-hover:bg-[#8B0000]/30 transition-colors duration-500">
                  <Icon className="w-6 h-6 text-[#8B0000]" />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3 leading-tight"
                    style={{ fontFamily: 'var(--font-heading)' }}>
                    {language === 'en' ? titleEn : titleFr}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                    {language === 'en' ? descEn : descFr}
                  </p>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-white/20 group-hover:text-[#8B0000] transition-colors duration-400">
                  <span className="text-[10px] font-bold tracking-[0.18em] uppercase">
                    {language === 'en' ? 'Explore' : 'Explorer'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>

                {/* Animated bottom rule */}
                <div className="absolute bottom-0 left-0 h-[2px] bg-[#8B0000] w-0 group-hover:w-full transition-all duration-500 ease-out" />

                {/* Side glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000]/0 to-[#8B0000]/0 group-hover:from-[#8B0000]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#8B0000] text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-4 font-semibold text-white">
            {language === 'en' ? 'Join Our Partnership' : 'Rejoignez notre partenariat'}
          </h2>
          <p className="text-xl mb-8 opacity-95 text-[rgb(255,255,255)]">
            {language === 'en' 
              ? 'Become part of our collaborative effort to build a more just and inclusive community'
              : 'Devenez membre de notre effort collaboratif pour bâtir une communauté plus juste et inclusive'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/about/hubs"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#8B0000] rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              {language === 'en' ? 'Learn More' : 'En savoir plus'}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/community"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium"
            >
              {language === 'en' ? 'Partner With Us' : 'Devenez partenaire'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}