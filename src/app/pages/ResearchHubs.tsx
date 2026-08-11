import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { HubBars } from '../components/HeroAnimations';
import { usePageMeta } from '../hooks/usePageMeta';
import { Building2, Users, ArrowRight, Target, Lightbulb, Heart, GraduationCap, TrendingUp, Globe, ExternalLink, Handshake, Award, Home, Briefcase, Shield, BookOpen, Activity, UserPlus, HeartPulse, type LucideIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSanityQuery } from '../../lib/sanity/useSanityQuery';
import { researchHubsQuery, type ResearchHub } from '../../lib/sanity/queries/researchHub';
import { siteStatsQuery, type SiteStats } from '../../lib/sanity/queries/siteStats';
import { urlForImage } from '../../lib/sanity/image';

const HUB_ICONS: Record<string, LucideIcon> = { Users, BookOpen, Target, Heart, Lightbulb, GraduationCap, HeartPulse, Building2 };

// Import logos
const uoftOiseLogo = '/7b98ee478f466c3dd71a0410d27d1cae36bc7b2a.png';
const brockLogo = '/4825dd65e7c70d72bc4874a4e49e5ed0e76764db.png';
const ywcaLogo = '/af7a99d39d035b273d4e3d0f598d3a6831ad42e6.png';
const migrantFarmworkersLogo = '/c51299cab84d0db41025a7b6acc2f91dad241f19.png';
const stCatharinesLibraryLogo = '/8a7aff8c28e41c14965e60ee35fec519925a66c0.png';
const bridgesNiagaraLogo = '/42685716c968d89e0ce4c2df255a0e5fe47de6e5.png';
const niagaraFallsHealthLogo = '/a644b274274c47623c7f67a111672ede625bacd4.png';
const niagaraConnectsLogo = '/5554cc6019e321efeb2a5ae0621a2d5b54fe8190.png';
const wellandHeritageLogo = '/b988ec04fdec29b54dd9b6f3d4fa9715cff4d6cd.png';
const niagaraImmigrationPartnershipLogo = '/e3efa50a0dfbeae579a749859aab8f2f63920ab8.png';
const futureBlackFemaleLogo = '/e63ce6bc137a9cdd5b4c0dfb3801c54c434f206d.png';
const niagaraRegionLogo = '/584ab02c6f97daaed41f2ba77c0e96e670fdb60d.png';
const niagaraHealthLogo = '/628de4b1ee9f5dd370379633138c153274cc3bf5.png';
const toesNiagaraLogo = '/165706a2c9c6deebc6dc1cfda9805cf86e3cd39d.png';
const universityBuffaloLogo = '/1e02762e71863f48fceb1cc3277e8ecd07e53156.png';

export function ResearchHubs() {
  const { t, language } = useLanguage();
  usePageMeta(
    language === 'en' ? 'Research Hubs | MSK Niagara' : 'Pôles de recherche | MSK Niagara',
    language === 'en'
      ? '3 research hubs across the Niagara region driving community-based participatory research within the MSK partnership.'
      : '3 pôles de recherche à travers la région de Niagara menant une recherche participative communautaire au sein du partenariat MSK.'
  );
  const [hoveredHub, setHoveredHub] = useState<number | null>(null);
  const [hoveredPartner, setHoveredPartner] = useState<number | null>(null);

  const { data: rawHubs } = useSanityQuery<ResearchHub[]>(researchHubsQuery);
  const { data: siteStats } = useSanityQuery<SiteStats>(siteStatsQuery);
  const hubs = useMemo(
    () =>
      (rawHubs ?? []).map((hub) => ({
        id: hub.slug,
        name: hub.name.en,
        nameFr: hub.name.fr,
        image: urlForImage(hub.coverImage)?.width(800).height(500).url(),
        description: hub.description.en,
        descriptionFr: hub.description.fr,
        members: hub.memberCount ?? 0,
        projects: hub.projectCount ?? 0,
        leader: hub.leaders?.join(' & ') ?? '',
        leaderFr: hub.leaders?.join(' et ') ?? '',
        color: hub.color ?? '#CC0000',
        gradient: 'from-[#CC0000] to-[#A40000]',
        icon: (hub.icon && HUB_ICONS[hub.icon]) || Building2,
      })),
    [rawHubs]
  );

  // Helper function to get category icon and color
  const getCategoryStyle = (category: string) => {
    const styles: { [key: string]: { icon: any; gradient: string; color: string } } = {
      'Housing & Support': { icon: Home, gradient: 'from-[#CC0000] to-[#A40000]', color: '#CC0000' },
      'Settlement Services': { icon: Users, gradient: 'from-[#089EA5] to-[#12647F]', color: '#089EA5' },
      'Employment Support': { icon: Briefcase, gradient: 'from-[#6635B1] to-[#CC0000]', color: '#6635B1' },
      'Labor Rights': { icon: Shield, gradient: 'from-[#FFC956] to-[#FF9A3C]', color: '#FFC956' },
      'Community Education': { icon: BookOpen, gradient: 'from-[#12647F] to-[#089EA5]', color: '#12647F' },
      'Cultural Integration': { icon: Globe, gradient: 'from-[#6635B1] to-[#CC0000]', color: '#6635B1' },
      'Healthcare Access': { icon: Activity, gradient: 'from-[#089EA5] to-[#12647F]', color: '#089EA5' },
      'Recreation & Wellness': { icon: Heart, gradient: 'from-[#CC0000] to-[#A40000]', color: '#CC0000' },
      'Education': { icon: GraduationCap, gradient: 'from-[#FFC956] to-[#FF9A3C]', color: '#FFC956' },
      'Public Health': { icon: HeartPulse, gradient: 'from-[#089EA5] to-[#12647F]', color: '#089EA5' },
      'Newcomer Support': { icon: UserPlus, gradient: 'from-[#6635B1] to-[#CC0000]', color: '#6635B1' },
      'Employment Services': { icon: Briefcase, gradient: 'from-[#12647F] to-[#089EA5]', color: '#12647F' },
    };
    return styles[category] || { icon: Building2, gradient: 'from-gray-400 to-gray-600', color: '#666666' };
  };

  const allCommunityPartners = [
    { name: 'YWCA Niagara Region', category: 'Housing & Support', categoryFr: 'Logement et soutien', logo: ywcaLogo },
    { name: 'Bridges Niagara', category: 'Settlement Services', categoryFr: 'Services d\'établissement', logo: bridgesNiagaraLogo },
    { name: 'TOES Niagara', category: 'Employment Support', categoryFr: 'Soutien à l\'emploi', logo: toesNiagaraLogo },
    { name: 'Migrant Farm Workers Project', category: 'Labor Rights', categoryFr: 'Droits du travail', logo: migrantFarmworkersLogo },
    { name: 'St. Catharines Public Library', category: 'Community Education', categoryFr: 'Éducation communautaire', logo: stCatharinesLibraryLogo },
    { name: 'Community Health Centres', category: 'Healthcare Access', categoryFr: 'Accès aux soins de santé', logo: niagaraFallsHealthLogo },
    { name: 'Niagara Region Public Health', category: 'Public Health', categoryFr: 'Santé publique', logo: niagaraRegionLogo },
    { name: 'Niagara Connects', category: 'Settlement Services', categoryFr: 'Services d\'établissement', logo: niagaraConnectsLogo },
    { name: 'Welland Heritage', category: 'Community Education', categoryFr: 'Éducation communautaire', logo: wellandHeritageLogo },
    { name: 'Niagara Immigration Partnership', category: 'Settlement Services', categoryFr: 'Services d\'établissement', logo: niagaraImmigrationPartnershipLogo },
    { name: 'Niagara Health', category: 'Healthcare Access', categoryFr: 'Accès aux soins de santé', logo: niagaraHealthLogo },
    { name: 'Future Black Female', category: 'Community Education', categoryFr: 'Éducation communautaire', logo: futureBlackFemaleLogo },
  ];

  const stats = [
    {
      label: language === 'en' ? 'Research Hubs' : 'Pôles de recherche',
      value: String(siteStats?.researchHubs ?? 3),
      icon: Target,
      color: '#CC0000'
    },
    {
      label: language === 'en' ? 'Team Members' : 'Membres d\'équipe',
      value: String(siteStats?.teamMembers ?? ''),
      icon: Users,
      color: '#089EA5'
    },
    {
      label: language === 'en' ? 'Active Projects' : 'Projets actifs',
      value: String(siteStats?.researchProjects ?? ''),
      icon: TrendingUp,
      color: '#6635B1'
    },
    {
      label: language === 'en' ? 'Partner Organizations' : 'Organisations partenaires',
      value: String(siteStats?.communityPartners ?? ''),
      icon: Handshake,
      color: '#FFC956'
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-[#CC0000] overflow-hidden">
        {/* Dot-grid brand motif */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        {/* Three hub color bars rising — research in progress */}
        <HubBars />
        {/* Diagonal cut bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-white"
          style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 pt-20 md:pt-24 pb-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 mb-8"
            style={{ animation: 'fade-in-down 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s both' }}>
            <Users className="w-3.5 h-3.5 text-white/90" />
            <span className="text-xs text-white/90 font-semibold tracking-[0.12em] uppercase">
              {language === 'en' ? 'Research Hubs' : 'Pôles de recherche'}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl text-white mb-5 font-extrabold tracking-tight leading-none"
            style={{ fontFamily: 'var(--font-heading)', animation: 'fade-in-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}>
            {t('nav.hubs')}
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed"
            style={{ animation: 'fade-in-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.38s both' }}>
            {language === 'en'
              ? 'Our research is organized into collaborative hubs, each focusing on specific aspects of community health, youth development, and social well-being.'
              : 'Notre recherche est organisée en pôles collaboratifs, chacun se concentrant sur des aspects spécifiques de la santé communautaire, du développement des jeunes et du bien-être social.'}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 relative z-20 mb-20">
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

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 relative z-20">
        
        {/* Research Hubs Section */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#CC0000] to-[#A40000] flex items-center justify-center shadow-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#0A0A0A]">
                {language === 'en' ? 'Our Research Hubs' : 'Nos pôles de recherche'}
              </h2>
              <p className="text-sm text-[#0A0A0A]/60">
                {language === 'en' 
                  ? 'Collaborative teams focused on community-engaged research'
                  : 'Équipes collaboratives axées sur la recherche communautaire'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {hubs.map((hub, index) => {
              const IconComponent = hub.icon;
              return (
                <Link 
                  to={`/about/hubs/${hub.id}`} 
                  key={index}
                  onMouseEnter={() => setHoveredHub(index)}
                  onMouseLeave={() => setHoveredHub(null)}
                  className="block"
                >
                  <div className={`group relative bg-white rounded-3xl overflow-hidden transition-all duration-500 border-2 h-full flex flex-col ${
                    hoveredHub === index 
                      ? 'shadow-2xl scale-[1.02] border-white/0' 
                      : 'shadow-lg border-gray-100'
                  }`}>
                    {/* Gradient Border Effect */}
                    {hoveredHub === index && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${hub.gradient} opacity-100 transition-opacity duration-500`}></div>
                    )}
                    <div className="absolute inset-[2px] bg-white rounded-3xl overflow-hidden flex flex-col">
                      
                      {/* Hub Image Banner */}
                      <div className="h-48 w-full overflow-hidden relative flex-shrink-0">
                        <img
                          src={hub.image}
                          alt={language === 'en' ? hub.name : hub.nameFr}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        
                        {/* Floating Icon */}
                        <div className="absolute bottom-4 right-4 z-20">
                          <div className={`w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg transform transition-all duration-500 ${
                            hoveredHub === index ? 'scale-110' : ''
                          }`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>

                      <div className="relative z-10 p-6 flex flex-col flex-1">

                      {/* Title */}
                      <h3 className={`text-2xl font-bold text-[#0A0A0A] mb-4 leading-tight transition-colors duration-300 ${
                        hoveredHub === index ? 'text-[#CC0000]' : ''
                      }`}>
                        {language === 'en' ? hub.name : hub.nameFr}
                      </h3>

                      {/* Leader */}
                      {hub.leader && (
                        <div className="mb-4 pb-4 border-b border-gray-100">
                          <p className="text-sm text-[#0A0A0A]/60 mb-1">
                            {language === 'en' ? 'Hub Leader' : 'Chef de pôle'}
                          </p>
                          <p className="font-semibold text-[#0A0A0A]">
                            {language === 'en' ? hub.leader : hub.leaderFr}
                          </p>
                        </div>
                      )}

                      {/* Stats */}
                      <div className="flex gap-2 mb-4">
                        <Badge 
                          className="font-semibold text-xs px-3 py-1 border-2"
                          style={{ 
                            borderColor: '#CC0000',
                            backgroundColor: '#CC000015',
                            color: '#CC0000'
                          }}
                        >
                          <Users className="w-3 h-3 inline mr-1" />
                          {hub.members} {language === 'en' ? 'Members' : 'Membres'}
                        </Badge>
                        <Badge 
                          className="font-semibold text-xs px-3 py-1 border-2"
                          style={{ 
                            borderColor: '#CC0000',
                            backgroundColor: '#CC000015',
                            color: '#CC0000'
                          }}
                        >
                          {hub.projects} {language === 'en' ? (hub.projects === 1 ? 'Project' : 'Projects') : (hub.projects === 1 ? 'Projet' : 'Projets')}
                        </Badge>
                      </div>

                      {/* Description */}
                      <p className="text-[#0A0A0A]/80 mb-6 leading-relaxed line-clamp-4 flex-1">
                        {language === 'en' ? hub.description : hub.descriptionFr}
                      </p>

                      {/* View Details Button */}
                      <Button
                        className="w-full bg-gradient-to-r from-[#CC0000] to-[#A40000] hover:shadow-xl text-white font-semibold rounded-xl transition-all duration-300 group/btn border-0 mt-auto"
                      >
                        {language === 'en' ? 'View Hub Details' : 'Voir les détails du pôle'}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
        </section>

        {/* Community Partners Section */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#CC0000] to-[#6B0000] flex items-center justify-center shadow-lg">
              <Handshake className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#0A0A0A]">
                {language === 'en' ? 'Community Partners' : 'Partenaires communautaires'}
              </h2>
              <p className="text-sm text-[#0A0A0A]/60">
                {language === 'en' 
                  ? `Collaborating with ${allCommunityPartners.length}+ organizations across Niagara`
                  : `Collaboration avec plus de ${allCommunityPartners.length} organisations à travers Niagara`}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#CC0000] via-[#CC0000] to-[#6B0000] rounded-3xl p-8 md:p-12 border-2 border-[#CC0000]/20 shadow-2xl overflow-hidden relative">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              {/* Header with icon */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/20 flex items-center justify-center shadow-lg">
                    <Handshake className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl md:text-4xl text-white mb-2">
                      {language === 'en' ? 'Community Partnerships' : 'Partenariats communautaires'}
                    </h3>
                    <p className="text-white/90 text-lg">
                      {language === 'en' 
                        ? 'Building bridges between research and community action'
                        : 'Construire des ponts entre la recherche et l\'action communautaire'}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-4xl">
                {language === 'en'
                  ? 'We work closely with community organizations to ensure our research addresses real-world needs and is informed by diverse perspectives. Our partnerships strengthen the impact of our research and create meaningful change in the Niagara community.'
                  : 'Nous travaillons en étroite collaboration avec les organisations communautaires pour nous assurer que notre recherche répond aux besoins du monde réel et est éclairée par des perspectives diverses. Nos partenariats renforcent l\'impact de notre recherche et créent un changement significatif dans la communauté de Niagara.'}
              </p>

              {/* Partnership Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">22</div>
                  <div className="text-white/80 text-sm font-medium">
                    {language === 'en' ? 'Community Partners' : 'Partenaires communautaires'}
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">10</div>
                  <div className="text-white/80 text-sm font-medium">
                    {language === 'en' ? 'Service Categories' : 'Catégories de services'}
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">3</div>
                  <div className="text-white/80 text-sm font-medium">
                    {language === 'en' ? 'Research Hubs' : 'Pôles de recherche'}
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">100%</div>
                  <div className="text-white/80 text-sm font-medium">
                    {language === 'en' ? 'Community-Driven' : 'Axé sur la communauté'}
                  </div>
                </div>
              </div>

              {/* Partnership Categories */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 mb-10">
                <h4 className="text-xl md:text-2xl text-white font-semibold mb-6 flex items-center gap-3">
                  <Building2 className="w-6 h-6" />
                  {language === 'en' ? 'Our Partner Organizations Include:' : 'Nos organisations partenaires incluent :'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: HeartPulse, label: language === 'en' ? 'Health Services' : 'Services de santé' },
                    { icon: UserPlus, label: language === 'en' ? 'Newcomer Services' : 'Services aux nouveaux arrivants' },
                    { icon: GraduationCap, label: language === 'en' ? 'Education & Libraries' : 'Éducation et bibliothèques' },
                    { icon: Heart, label: language === 'en' ? 'Social Services' : 'Services sociaux' },
                    { icon: Users, label: language === 'en' ? 'Youth Empowerment' : 'Autonomisation des jeunes' },
                    { icon: Shield, label: language === 'en' ? 'Government & Public Health' : 'Gouvernement et santé publique' },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-center gap-3 text-white/90">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-medium">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center">
                <Link to="/community">
                  <Button
                    size="lg"
                    className="gap-3 bg-white text-[#CC0000] hover:bg-gray-50 shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105 text-lg px-10 py-7 rounded-2xl font-bold group"
                  >
                    <Building2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    {language === 'en' ? 'Explore All Community Partners' : 'Découvrir tous les partenaires'}
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
                <p className="text-white/90 text-sm mt-4">
                  {language === 'en' 
                    ? 'Visit our Community page to learn more about each organization'
                    : 'Visitez notre page Communauté pour en savoir plus sur chaque organisation'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="relative">
          {/* Background Blur Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#CC0000] via-[#A40000] to-[#CC0000] rounded-[3rem] blur-3xl opacity-20"></div>
          
          <div className="relative bg-gradient-to-br from-[#CC0000] via-[#A40000] to-[#6B0000] rounded-[3rem] p-12 md:p-16 lg:p-20 overflow-hidden shadow-2xl">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mb-48"></div>
            
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full mb-8 shadow-lg">
                <Globe className="w-5 h-5" />
                <span className="font-semibold">
                  {language === 'en' ? 'Join Our Network' : 'Rejoignez notre réseau'}
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {language === 'en' 
                  ? 'Become a Research Partner' 
                  : 'Devenez un partenaire de recherche'}
              </h2>
              
              <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
                {language === 'en' 
                  ? 'Interested in collaborating with our research hubs? We welcome partnerships with community organizations, researchers, and institutions.'
                  : 'Intéressé à collaborer avec nos pôles de recherche ? Nous accueillons les partenariats avec les organisations communautaires, les chercheurs et les institutions.'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:contact@msk-niagara.ca">
                  <Button className="bg-white text-[#CC0000] hover:bg-gray-100 font-bold px-10 py-7 rounded-xl text-lg shadow-xl transition-all duration-300 hover:scale-105">
                    {language === 'en' ? 'Contact Us' : 'Nous contacter'}
                  </Button>
                </a>
                <Link to="/about/partnership">
                  <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-bold px-10 py-7 rounded-xl text-lg backdrop-blur-sm transition-all duration-300 hover:scale-105">
                    {language === 'en' ? 'Learn More' : 'En savoir plus'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}