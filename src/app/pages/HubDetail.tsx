import { sanitizeEmail } from '../utils/security';
import { useLanguage } from '../contexts/LanguageContext';
import { useParams, Link } from 'react-router';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { RisingBubbles, HeartbeatLine, Constellation } from '../components/HeroAnimations';
import { usePageMeta } from '../hooks/usePageMeta';
import { Mail, Building2, User, GraduationCap, Users, ArrowLeft, Target, BookOpen, type LucideIcon } from 'lucide-react';
import { useMemo } from 'react';
import { PageLoader } from '../components/PageLoader';
import { useSanityQuery } from '../../lib/sanity/useSanityQuery';
import { researchHubBySlugQuery, type ResearchHub } from '../../lib/sanity/queries/researchHub';
import { teamMembersByHubSlugQuery, type TeamMember } from '../../lib/sanity/queries/teamMember';
import { urlForImage } from '../../lib/sanity/image';

const HUB_ICONS: Record<string, LucideIcon> = { Users, BookOpen, Target, Building2 };

export function HubDetail() {
  const { language } = useLanguage();
  const { hubId } = useParams<{ hubId: string }>();

  const { data: rawHub, loading: hubLoading } = useSanityQuery<ResearchHub | null>(
    researchHubBySlugQuery,
    { slug: hubId ?? '' }
  );
  const { data: rawMembers, loading: membersLoading } = useSanityQuery<TeamMember[]>(
    teamMembersByHubSlugQuery,
    { slug: hubId ?? '' }
  );


  const currentHub = useMemo(() => {
    if (!rawHub) return null;
    return {
      nameEn: rawHub.name.en,
      nameFr: rawHub.name.fr,
      image: urlForImage(rawHub.coverImage)?.width(1600).url() ?? '',
      descriptionEn: rawHub.description.en,
      descriptionFr: rawHub.description.fr,
      color: rawHub.color,
      icon: (rawHub.icon && HUB_ICONS[rawHub.icon]) || Building2,
      objectivesEn: rawHub.objectives.map((o) => o.en),
      objectivesFr: rawHub.objectives.map((o) => o.fr),
      projectsEn: (rawHub.highlightProjects ?? []).map((p) => ({ title: p.title.en, description: p.description.en })),
      projectsFr: (rawHub.highlightProjects ?? []).map((p) => ({ title: p.title.fr, description: p.description.fr })),
    };
  }, [rawHub]);

  usePageMeta(
    currentHub
      ? `${language === 'en' ? currentHub.nameEn : currentHub.nameFr} | MSK Niagara`
      : 'Research Hubs | MSK Niagara',
    currentHub
      ? (language === 'en' ? currentHub.descriptionEn : currentHub.descriptionFr).slice(0, 180)
      : undefined
  );

  if (hubLoading || membersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PageLoader />
      </div>
    );
  }

  if (!currentHub) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Hub not found</p>
      </div>
    );
  }

  const hubMembers = (rawMembers ?? []).map((m) => ({
    name: m.name,
    role: m.role?.en ?? '',
    roleFr: m.role?.fr ?? '',
    institution: m.institution?.en ?? '',
    institutionFr: m.institution?.fr ?? '',
    email: m.email,
    type: m.memberType,
    isHubLeader: m.isHubLeader,
    image: urlForImage(m.image)?.width(200).height(200).url(),
    bio: m.bio?.en,
    bioFr: m.bio?.fr,
  }));

  const HubIcon = currentHub.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden bg-cover bg-center min-h-[420px] flex items-center"
        style={{ backgroundImage: `url(${currentHub.image})` }}
      >
        {/* Deep dark-red multiplier overlay for perfect text contrast (WCAG AAA compliant) */}
        <div className="absolute inset-0 bg-[#CC0000]/85 mix-blend-multiply z-[1]"></div>
        
        {/* Dot-grid brand motif */}
        <div className="absolute inset-0 opacity-[0.06] z-[2]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
        />
        {/* Hub-specific thematic animation */}
        <div className="absolute inset-0 z-[2] pointer-events-none">
          {hubId === 'childhood' && <RisingBubbles color={currentHub.color || '#089EA5'} />}
          {hubId === 'health' && <HeartbeatLine color={currentHub.color || '#C97B2E'} />}
          {hubId === 'identity' && <Constellation color={currentHub.color || '#7B5EA7'} />}
        </div>
        {/* Hub accent color top stripe */}
        <div className="absolute top-0 left-0 right-0 h-1.5 z-30" style={{ backgroundColor: currentHub.color || '#CC0000' }} />
        {/* Diagonal cut bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-white z-[3]"
          style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 pb-28">
          <Link
            to="/about/hubs"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-10 transition-colors text-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {language === 'en' ? 'Back to Research Hubs' : 'Retour aux pôles de recherche'}
          </Link>

          <div className="flex items-start gap-5 mb-6">
            <div className="p-3.5 rounded-xl flex-shrink-0"
              style={{ backgroundColor: (currentHub.color || '#CC0000') + '30' }}>
              <HubIcon className="w-10 h-10 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 mb-2">
                <Target className="w-3.5 h-3.5 text-white/90" />
                <span className="text-xs text-white/90 font-semibold tracking-[0.12em] uppercase">
                  {language === 'en' ? 'Research Hub' : 'Pôle de recherche'}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold break-words text-white leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {language === 'en' ? currentHub.nameEn : currentHub.nameFr}
              </h1>
              <p className="text-sm text-white/90 mt-2 font-medium">
                {hubMembers.length} {language === 'en' ? 'Team Members' : 'Membres de l\'équipe'}
              </p>
            </div>
          </div>

          <p className="text-base md:text-lg leading-relaxed max-w-3xl text-white/90 break-words">
            {language === 'en' ? currentHub.descriptionEn : currentHub.descriptionFr}
          </p>
        </div>
      </section>

      {/* Research Objectives */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-8">
            {language === 'en' ? 'Research Objectives' : 'Objectifs de recherche'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(language === 'en' ? currentHub.objectivesEn : currentHub.objectivesFr).map((objective, index) => (
              <Card key={index} className="border-l-4 border-[#CC0000] hover:shadow-lg transition-shadow overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#CC0000] text-white flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <p className="text-[#0A0A0A] leading-relaxed pt-1 break-words">{objective}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Research Projects */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-8">
            {language === 'en' ? 'Research Projects' : 'Projets de recherche'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(language === 'en' ? currentHub.projectsEn : currentHub.projectsFr).map((project, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-4 p-3 bg-[#CC0000]/5 rounded-lg inline-block">
                    <BookOpen className="w-8 h-8 text-[#CC0000]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#0A0A0A] mb-3 break-words">{project.title}</h3>
                  <p className="text-[#0A0A0A]/80 leading-relaxed break-words">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-8">
            {language === 'en' ? 'Hub Team Members' : 'Membres de l\'équipe du pôle'} ({hubMembers.length})
          </h2>

          {/* Faculty Members */}
          {hubMembers.filter(m => m.type === 'faculty').length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-[#0A0A0A] mb-6 flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-[#CC0000]" />
                {language === 'en' ? 'Faculty Members' : 'Membres du corps professoral'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hubMembers.filter(m => m.type === 'faculty').map((member, index) => (
                  <MemberCard key={index} member={member} language={language} />
                ))}
              </div>
            </div>
          )}

          {/* Students */}
          {hubMembers.filter(m => m.type === 'student').length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-[#0A0A0A] mb-6 flex items-center gap-3">
                <User className="w-6 h-6 text-[#CC0000]" />
                {language === 'en' ? 'Students & Research Assistants' : 'Étudiants et assistants de recherche'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hubMembers.filter(m => m.type === 'student').map((member, index) => (
                  <MemberCard key={index} member={member} language={language} />
                ))}
              </div>
            </div>
          )}

          {/* Community Partners */}
          {hubMembers.filter(m => m.type === 'community').length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-[#0A0A0A] mb-6 flex items-center gap-3">
                <Building2 className="w-6 h-6 text-[#CC0000]" />
                {language === 'en' ? 'Community Partners' : 'Partenaires communautaires'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hubMembers.filter(m => m.type === 'community').map((member, index) => (
                  <MemberCard key={index} member={member} language={language} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#CC0000] text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 break-words text-[rgb(255,251,251)]">
            {language === 'en' ? 'Get Involved' : 'Participez'}
          </h2>
          <p className="text-xl mb-8 opacity-95 break-words text-[rgb(255,253,253)]">
            {language === 'en' 
              ? 'Learn more about our research or explore opportunities to collaborate'
              : 'En savoir plus sur notre recherche ou explorer les opportunités de collaboration'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/research/projects"
              className="px-8 py-4 bg-white text-[#CC0000] rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              {language === 'en' ? 'View All Projects' : 'Voir tous les projets'}
            </Link>
            <Link
              to="/community"
              className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-semibold"
            >
              {language === 'en' ? 'Partner With Us' : 'Devenez partenaire'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Member Card Component
function MemberCard({ member, language }: { member: any; language: string }) {
  return (
    <Card className="hover:shadow-lg transition-shadow h-full overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="w-16 h-16 bg-[#CC0000] text-white flex-shrink-0">
            {member.image && <AvatarImage src={member.image} alt={member.name} />}
            <AvatarFallback className="bg-[#CC0000] text-white text-lg font-semibold">
              {member.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-[#0A0A0A] mb-1 leading-tight break-words">{member.name}</h4>
            <p className="text-sm text-[#CC0000] font-medium mb-1 break-words">
              {language === 'en' ? member.role : member.roleFr}
            </p>
            {member.isHubLeader && (
              <Badge className="bg-[#CC0000] text-white text-xs mb-2">
                {language === 'en' ? 'Hub Leader' : 'Responsable du pôle'}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="space-y-2 text-sm text-[#0A0A0A]/70">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 flex-shrink-0 text-[#CC0000]" />
            <span className="truncate">{language === 'en' ? member.institution : member.institutionFr}</span>
          </div>
          {member.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 flex-shrink-0 text-[#CC0000]" />
              <a href={`mailto:${sanitizeEmail(member.email)}`} className="text-[#CC0000] hover:underline truncate">
                {member.email}
              </a>
            </div>
          )}
        </div>

        {member.bio && (
          <p className="mt-4 text-sm text-[#0A0A0A]/80 leading-relaxed line-clamp-4 break-words">
            {language === 'en' ? member.bio : member.bioFr}
          </p>
        )}
      </CardContent>
    </Card>
  );
}