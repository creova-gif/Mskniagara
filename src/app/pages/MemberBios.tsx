import { sanitizeEmail } from '../utils/security';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Building2, User, GraduationCap, Mail, Award, Target } from 'lucide-react';
import { MemberDots } from '../components/HeroAnimations';
import { usePageMeta } from '../hooks/usePageMeta';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { useMemo, useState } from 'react';
import { PageLoader } from '../components/PageLoader';
import { useSanityQuery } from '../../lib/sanity/useSanityQuery';
import { teamMembersQuery, type TeamMember } from '../../lib/sanity/queries/teamMember';
import { urlForImage } from '../../lib/sanity/image';

export function MemberBios() {
  const { language } = useLanguage();
  usePageMeta(
    language === 'en' ? 'Team Members | MSK Niagara' : "Membres de l'équipe | MSK Niagara",
    language === 'en'
      ? 'Meet the researchers, students, and community partners driving the MSK Niagara research partnership.'
      : "Rencontrez les chercheurs, étudiants et partenaires communautaires qui animent le partenariat de recherche MSK Niagara."
  );
  const [selectedHub, setSelectedHub] = useState<string>('All');

  // Hub translation mapping
  const getHubLabel = (hubName: string) => {
    const hubTranslations: Record<string, { en: string; fr: string }> = {
      'All': { en: 'All Members', fr: 'Tous les membres' },
      'Childhood and Growing Up Hub': { 
        en: 'Childhood and Growing Up Hub', 
        fr: 'Pôle Enfance et croissance' 
      },
      'Health Literacy Hub': { 
        en: 'Health Literacy Hub', 
        fr: 'Pôle Littératie en santé' 
      },
      'Identity, Connections and Belonging Hub': { 
        en: 'Identity, Connections and Belonging Hub', 
        fr: 'Pôle Identité, connexions et appartenance' 
      },
    };
    
    return language === 'en' 
      ? hubTranslations[hubName]?.en || hubName
      : hubTranslations[hubName]?.fr || hubName;
  };

  const { data: rawMembers, loading } = useSanityQuery<TeamMember[]>(teamMembersQuery);

  // Transform Sanity's nested {en,fr} shape into the flat legacy shape
  // (roleEn/roleFr-style pairs) this component's render logic already
  // expects, so nothing below this needs to change.
  const members = useMemo(
    () =>
      (rawMembers ?? []).map((m) => ({
        name: m.name,
        role: m.role?.en ?? '',
        roleFr: m.role?.fr ?? '',
        hub: m.hub?.name.en ?? '',
        hubFr: m.hub?.name.fr ?? '',
        institution: m.institution?.en ?? '',
        institutionFr: m.institution?.fr ?? '',
        email: m.email,
        type: m.memberType ?? '',
        isPostDoc: m.isPostDoc,
        isCoDirector: m.isCoDirector,
        isHubLeader: m.isHubLeader,
        isProjectLeader: m.isProjectLeader,
        projectLeaderTitle: m.projectLeaderTitle?.en,
        projectLeaderTitleFr: m.projectLeaderTitle?.fr,
        image: urlForImage(m.image)?.width(400).url(),
        bio: m.bio?.en ?? '',
        bioFr: m.bio?.fr ?? '',
      })),
    [rawMembers]
  );

  const hubs = ['All', ...Array.from(new Set(members.map(m => m.hub)))];

  const getMemberTypeLabel = (type: string) => {
    const labels: Record<string, { en: string; fr: string }> = {
      faculty: { en: 'Faculty', fr: 'Corps professoral' },
      student: { en: 'Graduate Student', fr: 'Étudiant diplômé' },
      community: { en: 'Community Partner', fr: 'Partenaire communautaire' },
    };
    return language === 'en' ? labels[type]?.en : labels[type]?.fr;
  };

  const getMemberTypeColor = (type: string) => {
    switch (type) {
      case 'faculty': return 'bg-dark-red text-white';
      case 'student': return 'bg-primary text-white';
      case 'community': return 'bg-dark-red/80 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getMemberTypeIcon = (type: string) => {
    switch (type) {
      case 'faculty': return <GraduationCap className="w-4 h-4" />;
      case 'student': return <User className="w-4 h-4" />;
      case 'community': return <Building2 className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const filteredMembers = selectedHub === 'All'
    ? members
    : members.filter(m => m.hub === selectedHub);

  // Group members by type
  const groupedMembers = {
    faculty: filteredMembers.filter(m => m.type === 'faculty'),
    student: filteredMembers.filter(m => m.type === 'student'),
    community: filteredMembers.filter(m => m.type === 'community'),
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section — left-aligned, split layout, distinct from other pages */}
      <div className="relative overflow-hidden bg-[#0A0A0A] py-20 md:py-28">
        {/* Dot-grid brand motif */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }}
        />
        {/* Cascading member dots — representing the team */}
        <MemberDots />
        {/* Crimson accent gradient — right side */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#CC0000]/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: text */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-px bg-[#CC0000]" />
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/50">
                  {language === 'en' ? 'Our People' : 'Notre équipe'}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {language === 'en' ? (
                  <>The People<br /><span className="text-[#CC0000]">Behind</span><br />the Research</>
                ) : (
                  <>L'équipe<br /><span className="text-[#CC0000]">derrière</span><br />la recherche</>
                )}
              </h1>
              <p className="text-lg text-white/60 leading-relaxed max-w-lg">
                {language === 'en'
                  ? 'Faculty researchers, graduate students, and community co-leaders working together across three hubs to mobilize knowledge for a more just Niagara.'
                  : 'Chercheurs, étudiants et co-responsables communautaires travaillant ensemble dans trois pôles pour mobiliser les connaissances pour un Niagara plus juste.'}
              </p>
            </div>

            {/* Right: photo mosaic with stat overlays */}
            <div className="grid grid-cols-2 gap-3 relative">
              {/* Photo 1 — discussion */}
              <div className="relative overflow-hidden rounded-2xl h-44 group">
                <img
                  src="/community/bilateral-conversation-yellow-glasses.jpg"
                  alt="Community participant Julie and researcher in discussion at MSK event"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <div className="text-2xl font-extrabold text-white leading-none" style={{ fontFamily: 'var(--font-heading)' }}>56</div>
                  <div className="text-[10px] text-white/70 font-medium mt-0.5">{language === 'en' ? 'Team Members' : 'Membres'}</div>
                </div>
              </div>
              {/* Photo 2 — presenter */}
              <div className="relative overflow-hidden rounded-2xl h-44 group">
                <img
                  src="/community/researcher-presenting-brocku.jpg"
                  alt="Researcher presenting research findings to a community audience at Brock University"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <div className="text-2xl font-extrabold text-white leading-none" style={{ fontFamily: 'var(--font-heading)' }}>3</div>
                  <div className="text-[10px] text-white/70 font-medium mt-0.5">{language === 'en' ? 'Research Hubs' : 'Pôles'}</div>
                </div>
              </div>
              {/* Photo 3 — networking */}
              <div className="relative overflow-hidden rounded-2xl h-44 group">
                <img
                  src="/community/researcher-networking-postgathering.jpg"
                  alt="Researcher engaging in post-event conversations with attendees"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <div className="text-2xl font-extrabold text-white leading-none" style={{ fontFamily: 'var(--font-heading)' }}>5+</div>
                  <div className="text-[10px] text-white/70 font-medium mt-0.5">{language === 'en' ? 'Institutions' : 'Institutions'}</div>
                </div>
              </div>
              {/* Photo 4 — greeting */}
              <div className="relative overflow-hidden rounded-2xl h-44 group">
                <img
                  src="/community/researcher-greeting-attendees.jpg"
                  alt="Researcher greeting and welcoming event attendees"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <div className="text-2xl font-extrabold text-white leading-none" style={{ fontFamily: 'var(--font-heading)' }}>26</div>
                  <div className="text-[10px] text-white/70 font-medium mt-0.5">{language === 'en' ? 'Community Partners' : 'Partenaires'}</div>
                </div>
              </div>
              {/* Crimson corner accent */}
              <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-full bg-[#CC0000]/30 blur-xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>


      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-16 pb-20 relative z-20">

        {/* Tabs by Hub */}
        <Tabs value={selectedHub} onValueChange={setSelectedHub} className="w-full">
          <div className="flex justify-center mb-8 overflow-x-auto scrollbar-hide px-4">
            <TabsList className="h-auto bg-white/95 sm:bg-white shadow-lg border-2 border-[#CC0000]/20 rounded-xl p-2 inline-flex gap-2 min-w-min transition-all backdrop-blur-sm">
              {hubs.map((hub) => (
                <TabsTrigger 
                  key={hub} 
                  value={hub}
                  className="data-[state=active]:bg-[#CC0000] data-[state=active]:text-white data-[state=inactive]:text-[#0A0A0A] data-[state=inactive]:hover:bg-gray-100 transition-all rounded-lg px-4 sm:px-6 py-3 font-medium text-sm sm:text-base whitespace-nowrap"
                >
                  {getHubLabel(hub)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={selectedHub} className="mt-0">
            {/* Faculty Section */}
            {groupedMembers.faculty.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-dark-red flex-shrink-0" />
                  <span>{language === 'en' ? 'Faculty Researchers' : 'Chercheurs du corps professoral'}</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {groupedMembers.faculty.map((member, index) => (
                    <Card 
                      key={index} 
                      className={`hover:shadow-xl transition-all duration-300 border-l-4 ${
                        member.isHubLeader ? 'border-[#CC0000] bg-gradient-to-br from-[#CC0000]/5 to-white' : 'border-[#CC0000]/60'
                      } animate-fade-in-up`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-start gap-3 sm:gap-4 mb-4">
                          <Avatar className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-[#CC0000]/20 flex-shrink-0">
                            {member.image && <AvatarImage src={member.image} alt={member.name} />}
                            <AvatarFallback className="text-base sm:text-lg bg-[#CC0000] text-white font-semibold">
                              {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-xl font-semibold text-[#0A0A0A] mb-1 break-words">
                              {member.name}
                            </h3>
                            
                            {/* Position/Role Tags */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              {/* Display ALL roles from the role field as separate badges */}
                              {(language === 'en' ? member.role : member.roleFr).split(',').map((roleItem, idx) => (
                                <Badge key={idx} className="bg-[#0A0A0A] text-white text-xs">
                                  <span className="flex items-center gap-1">
                                    {idx === 0 && getMemberTypeIcon(member.type)}
                                    {roleItem.trim()}
                                  </span>
                                </Badge>
                              ))}
                              
                              {/* Project Leader Badge */}
                              {member.isProjectLeader && member.projectLeaderTitle && (
                                <Badge className="bg-[#CC0000] text-white text-xs">
                                  <Target className="w-3 h-3 mr-1" />
                                  {language === 'en' ? member.projectLeaderTitle : member.projectLeaderTitleFr}
                                </Badge>
                              )}
                            </div>
                            
                            {/* Institution */}
                            <p className="text-xs sm:text-sm text-[#555555] flex items-center gap-1 break-words">
                              <Building2 className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span>{language === 'en' ? member.institution : member.institutionFr}</span>
                            </p>
                          </div>
                        </div>
                        
                        {/* Bio - Selectable Text */}
                        <p className="text-sm sm:text-base text-[#555555] leading-relaxed select-text cursor-text mb-4">
                          {language === 'en' ? member.bio : member.bioFr}
                        </p>
                        
                        {/* Contact Button for Hub Leaders and Co-Directors */}
                        {(member.isHubLeader || member.isCoDirector) && member.email && (
                          <a
                            href={`mailto:${sanitizeEmail(member.email)}`}
                            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-[#CC0000] to-[#6B0000] text-white hover:from-[#A40000] hover:to-[#CC0000] rounded-lg transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm sm:text-base"
                          >
                            <Mail className="w-4 h-4" />
                            <span>{language === 'en' ? 'Contact' : 'Contacter'}</span>
                          </a>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Graduate Students Section */}
            {groupedMembers.student.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl sm:text-2xl font-semibold text-[#0A0A0A] mb-6 flex items-center gap-2">
                  <User className="w-6 h-6 sm:w-7 sm:h-7 text-[#0A0A0A] flex-shrink-0" />
                  <span>{language === 'en' ? 'Graduate Students' : 'Étudiants diplômés'}</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {groupedMembers.student.map((member, index) => (
                    <Card 
                      key={index} 
                      className="hover:shadow-xl transition-all duration-300 border-l-4 border-[#0A0A0A] animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-start gap-3 sm:gap-4 mb-4">
                          <Avatar className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-primary/20 flex-shrink-0">
                            {member.image && <AvatarImage src={member.image} alt={member.name} />}
                            <AvatarFallback className="text-base sm:text-lg bg-[#0A0A0A] text-white font-semibold">
                              {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-xl font-semibold text-[#0A0A0A] mb-1 break-words">
                              {member.name}
                            </h3>
                            
                            {/* Position/Role Tags */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              {/* Display ALL roles from the role field as separate badges */}
                              {(language === 'en' ? member.role : member.roleFr).split(',').map((roleItem, idx) => (
                                <Badge key={idx} className="bg-[#0A0A0A] text-white text-xs">
                                  <span className="flex items-center gap-1">
                                    {idx === 0 && getMemberTypeIcon(member.type)}
                                    {roleItem.trim()}
                                  </span>
                                </Badge>
                              ))}
                            </div>
                            
                            {/* Institution */}
                            <p className="text-xs sm:text-sm text-[#555555] flex items-center gap-1 break-words">
                              <Building2 className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span>{language === 'en' ? member.institution : member.institutionFr}</span>
                            </p>
                          </div>
                        </div>
                        
                        {/* Bio - Selectable Text */}
                        <p className="text-sm sm:text-base text-[#555555] leading-relaxed select-text cursor-text">
                          {language === 'en' ? member.bio : member.bioFr}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Community Partners Section */}
            {groupedMembers.community.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl sm:text-2xl font-semibold text-[#0A0A0A] mb-6 flex items-center gap-2">
                  <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-[#CC0000]/80 flex-shrink-0" />
                  <span>{language === 'en' ? 'Community Partners' : 'Partenaires communautaires'}</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {groupedMembers.community.map((member, index) => (
                    <Card 
                      key={index} 
                      className="hover:shadow-xl transition-all duration-300 border-l-4 border-[#CC0000]/80 animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-start gap-3 sm:gap-4 mb-4">
                          <Avatar className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-[#CC0000]/20 flex-shrink-0">
                            {member.image && <AvatarImage src={member.image} alt={member.name} />}
                            <AvatarFallback className="text-base sm:text-lg bg-[#CC0000]/80 text-white font-semibold">
                              {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-xl font-semibold text-[#0A0A0A] mb-1 break-words">
                              {member.name}
                            </h3>
                            
                            {/* Position/Role Tags */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              {/* Display ALL roles from the role field as separate badges */}
                              {(language === 'en' ? member.role : member.roleFr).split(',').map((roleItem, idx) => (
                                <Badge key={idx} className="bg-[#0A0A0A] text-white text-xs">
                                  <span className="flex items-center gap-1">
                                    {idx === 0 && getMemberTypeIcon(member.type)}
                                    {roleItem.trim()}
                                  </span>
                                </Badge>
                              ))}
                            </div>
                            
                            {/* Institution */}
                            <p className="text-xs sm:text-sm text-[#555555] flex items-center gap-1 break-words">
                              <Building2 className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span>{language === 'en' ? member.institution : member.institutionFr}</span>
                            </p>
                          </div>
                        </div>
                        
                        {/* Bio - Selectable Text */}
                        <p className="text-sm sm:text-base text-[#555555] leading-relaxed select-text cursor-text mb-4">
                          {language === 'en' ? member.bio : member.bioFr}
                        </p>
                        
                        {/* Contact Button for Community Hub Leaders */}
                        {member.isHubLeader && member.email && (
                          <a
                            href={`mailto:${sanitizeEmail(member.email)}`}
                            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-[#CC0000] to-[#6B0000] text-white hover:from-[#A40000] hover:to-[#CC0000] rounded-lg transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm sm:text-base"
                          >
                            <Mail className="w-4 h-4" />
                            <span>{language === 'en' ? 'Contact' : 'Contacter'}</span>
                          </a>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Stats Summary */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-t-4 border-dark-red bg-gradient-to-br from-dark-red/5 to-white">
            <CardContent className="p-6 text-center">
              <GraduationCap className="w-12 h-12 text-dark-red mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary mb-2">
                {groupedMembers.faculty.length}
              </div>
              <div className="text-primary/70 text-sm sm:text-base">
                {language === 'en' ? 'Faculty Researchers' : 'Chercheurs du corps professoral'}
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-primary bg-gradient-to-br from-primary/5 to-white">
            <CardContent className="p-6 text-center">
              <User className="w-12 h-12 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary mb-2">
                {groupedMembers.student.length}
              </div>
              <div className="text-primary/70 text-sm sm:text-base">
                {language === 'en' ? 'Graduate Students' : 'Étudiants diplômés'}
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-dark-red/80 bg-gradient-to-br from-dark-red/5 to-white">
            <CardContent className="p-6 text-center">
              <Building2 className="w-12 h-12 text-dark-red/80 mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary mb-2">
                {groupedMembers.community.length}
              </div>
              <div className="text-primary/70 text-sm sm:text-base">
                {language === 'en' ? 'Community Partners' : 'Partenaires communautaires'}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}