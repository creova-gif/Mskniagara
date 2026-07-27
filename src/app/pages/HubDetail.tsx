import { sanitizeEmail } from '../utils/security';
import { useLanguage } from '../contexts/LanguageContext';
import { useParams, Link } from 'react-router';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { RisingBubbles, HeartbeatLine, Constellation } from '../components/HeroAnimations';
import { usePageMeta } from '../hooks/usePageMeta';
import { Mail, Building2, User, GraduationCap, Users, ArrowLeft, Target, BookOpen } from 'lucide-react';

// Import profile images
const farahAhmadImg = '/80cf63058525c286b302f23654c290a0bb73d727.png';

export function HubDetail() {
  const { language } = useLanguage();
  const { hubId } = useParams<{ hubId: string }>();

  // Hub data
  // Hub data
  const hubs = {
    'childhood': {
      nameEn: 'Childhood and Growing Up Hub',
      nameFr: 'Pôle Enfance et développement',
      image: '/campus/childhood-hub-cover.jpg',
      descriptionEn: 'The Childhood and Growing Up Hub listens to and responds to newcomer children with respect to their experiences in housing, sport/recreation and schooling. Our research examines how children navigate multiple spaces and systems, and aims to amplify their voices in shaping more inclusive and equitable communities.',
      descriptionFr: 'Le Pôle Enfance et développement écoute et répond aux besoins des enfants nouveaux arrivants concernant leur logement, leurs activités sportives et récréatives et leur scolarité. Notre recherche examine comment les enfants naviguent dans de multiples espaces et systèmes, et vise à amplifier leurs voix dans la construction de communautés plus inclusives et équitables.',
      color: '#089EA5',
      icon: Users,
      objectivesEn: [
        'Create forums for newcomer children to share their experiences and perspectives',
        'Examine housing experiences and challenges faced by newcomer families',
        'Investigate access to and participation in sport and recreational activities',
        'Explore educational experiences and school integration processes',
        'Develop evidence-based recommendations for service providers and policymakers'
      ],
      objectivesFr: [
        'Créer des forums pour que les enfants nouveaux arrivants partagent leurs expériences et perspectives',
        'Examiner les expériences de logement et les défis auxquels font face les familles nouvelles arrivantes',
        'Investiguer l\'accès et la participation aux activités sportives et récréatives',
        'Explorer les expériences éducatives et les processus d\'intégration scolaire',
        'Développer des recommandations fondées sur des données probantes pour les fournisseurs de services et les décideurs'
      ],
      projectsEn: [
        {
          title: 'Newcomer Children Housing Experiences',
          description: 'Understanding the housing challenges and experiences of newcomer children and families in the Niagara region.'
        },
        {
          title: 'Sport and Recreation Access',
          description: 'Examining barriers and facilitators to sport and recreational participation among newcomer youth.'
        },
        {
          title: 'Educational Integration',
          description: 'Exploring how newcomer children navigate the education system and build connections in schools.'
        }
      ],
      projectsFr: [
        {
          title: 'Expériences de logement des enfants nouveaux arrivants',
          description: 'Comprendre les défis de logement et les expériences des enfants et familles nouveaux arrivants dans la région de Niagara.'
        },
        {
          title: 'Accès au sport et aux loisirs',
          description: 'Examiner les obstacles et les facilitateurs à la participation sportive et récréative parmi les jeunes nouveaux arrivants.'
        },
        {
          title: 'Intégration éducative',
          description: 'Explorer comment les enfants nouveaux arrivants naviguent le système éducatif et construisent des liens dans les écoles.'
        }
      ]
    },
    'health': {
      nameEn: 'Health Literacy Hub',
      nameFr: 'Pôle Littératie en santé',
      image: '/campus/brock-university-birdseye.jpg',
      descriptionEn: 'The Health Literacy Hub promotes health literacy in immigrant and refugee populations. Our research develops culturally responsive health information and programs to improve health outcomes and reduce health disparities among newcomer communities in the Niagara region.',
      descriptionFr: 'Le Pôle Littératie en santé promeut la littératie en santé auprès des populations immigrantes et réfugiées. Notre recherche développe des informations et programmes de santé culturellement adaptés pour améliorer les résultats de santé et réduire les disparités en santé parmi les communautés nouvelles arrivantes dans la région de Niagara.',
      color: '#C97B2E',
      icon: BookOpen,
      objectivesEn: [
        'Develop culturally responsive health literacy resources and programs',
        'Examine health information needs and preferences of newcomer populations',
        'Build capacity among community organizations to deliver health education',
        'Investigate barriers to accessing health services and information',
        'Create evidence-based tools to improve health communication and outcomes'
      ],
      objectivesFr: [
        'Développer des ressources et programmes de littératie en santé culturellement adaptés',
        'Examiner les besoins et préférences en information de santé des populations nouvelles arrivantes',
        'Renforcer la capacité des organismes communautaires à offrir de l\'éducation en santé',
        'Investiguer les obstacles à l\'accès aux services et informations de santé',
        'Créer des outils fondés sur des données probantes pour améliorer la communication et les résultats en santé'
      ],
      projectsEn: [
        {
          title: 'Community Health Literacy Assessment',
          description: 'Assessing health literacy levels and needs among diverse newcomer communities in Niagara.'
        },
        {
          title: 'Culturally Responsive Health Programs',
          description: 'Co-developing health education programs with community partners to address specific health priorities.'
        },
        {
          title: 'Health Navigation Services',
          description: 'Supporting newcomers to navigate the healthcare system and access appropriate services.'
        }
      ],
      projectsFr: [
        {
          title: 'Évaluation de la littératie en santé communautaire',
          description: 'Évaluer les niveaux et besoins de littératie en santé parmi diverses communautés nouvelles arrivantes à Niagara.'
        },
        {
          title: 'Programmes de santé culturellement adaptés',
          description: 'Co-développer des programmes d\'éducation en santé avec des partenaires communautaires pour répondre à des priorités de santé spécifiques.'
        },
        {
          title: 'Services de navigation en santé',
          description: 'Soutenir les nouveaux arrivants pour naviguer le système de santé et accéder aux services appropriés.'
        }
      ]
    },
    'identity': {
      nameEn: 'Identity, Connections and Belonging Hub',
      nameFr: 'Pôle Identité, relations et appartenance',
      image: '/campus/st-catharines-birdseye.jpg',
      descriptionEn: 'The Identity, Connections and Belonging Hub hosts three distinct projects which foster a sense of belonging amongst three populations: Afro-descendants, sexual and gender diverse young adult newcomers, and seasonal agricultural workers. Our research explores identity formation, community connections, and experiences of belonging in the Niagara region.',
      descriptionFr: 'Le Pôle Identité, relations et appartenance héberge trois projets distincts visant à favoriser un sentiment d\'appartenance chez trois groupes de populations : les personnes afro-descendantes, les jeunes adultes nouveaux arrivants de diverses identités sexuelles et de genre, et les travailleurs agricoles saisonniers. Notre recherche explore la formation de l\'identité, les connexions communautaires et les expériences d\'appartenance dans la région de Niagara.',
      color: '#7B5EA7',
      icon: Target,
      objectivesEn: [
        'Explore identity formation and belonging among Afro-descendant communities',
        'Examine experiences of sexual and gender diverse young adult newcomers',
        'Investigate the lives and experiences of seasonal agricultural workers',
        'Identify barriers and facilitators to community integration and belonging',
        'Develop community-based interventions to strengthen social connections'
      ],
      objectivesFr: [
        'Explorer la formation de l\'identité et l\'appartenance parmi les communautés afro-descendantes',
        'Examiner les expériences des jeunes adultes nouveaux arrivants de diverses identités sexuelles et de genre',
        'Investiguer les vies et expériences des travailleurs agricoles saisonniers',
        'Identifier les obstacles et facilitateurs à l\'intégration communautaire et l\'appartenance',
        'Développer des interventions communautaires pour renforcer les connexions sociales'
      ],
      projectsEn: [
        {
          title: 'Project #1: Identity & Belonging within Afro Descendants',
          description: 'Examining identity formation, community building, and experiences of belonging among Afro-descendant populations in Niagara.'
        },
        {
          title: 'Project #2: Migrant Farmworkers in Community',
          description: 'Investigating the experiences, labor conditions, and community integration of seasonal agricultural workers.'
        },
        {
          title: 'Project #3: ICT Use & SGD Newcomers',
          description: 'Exploring how sexual and gender diverse newcomers use information and communication technologies for support and community building.'
        }
      ],
      projectsFr: [
        {
          title: 'Projet #1 : Identité et appartenance parmi les Afro-descendants',
          description: 'Examiner la formation de l\'identité, la construction communautaire et les expériences d\'appartenance parmi les populations afro-descendantes à Niagara.'
        },
        {
          title: 'Projet #2 : Travailleurs agricoles migrants dans la communauté',
          description: 'Investiguer les expériences, conditions de travail et intégration communautaire des travailleurs agricoles saisonniers.'
        },
        {
          title: 'Projet #3 : Utilisation des TIC et nouveaux arrivants de diverses identités sexuelles et de genre',
          description: 'Explorer comment les nouveaux arrivants de diverses identités sexuelles et de genre utilisent les technologies de l\'information et de la communication pour le soutien et la construction communautaire.'
        }
      ]
    }
  };

  const currentHub = hubs[hubId as keyof typeof hubs];

  usePageMeta(
    currentHub
      ? `${language === 'en' ? currentHub.nameEn : currentHub.nameFr} | MSK Niagara`
      : 'Research Hubs | MSK Niagara',
    currentHub
      ? (language === 'en' ? currentHub.descriptionEn : currentHub.descriptionFr).slice(0, 180)
      : undefined
  );

  if (!currentHub) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Hub not found</p>
      </div>
    );
  }

  // Member data - will be imported from MemberBios
  const allMembers = getMembers();
  
  const hubMembers = allMembers.filter(member => {
    const hubName = currentHub.nameEn;
    return member.hub === hubName;
  });

  const HubIcon = currentHub.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden bg-cover bg-center min-h-[420px] flex items-center"
        style={{ backgroundImage: `url(${currentHub.image})` }}
      >
        {/* Deep dark-red multiplier overlay for perfect text contrast (WCAG AAA compliant) */}
        <div className="absolute inset-0 bg-[#8B0000]/85 mix-blend-multiply z-[1]"></div>
        
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
        <div className="absolute top-0 left-0 right-0 h-1.5 z-30" style={{ backgroundColor: currentHub.color || '#8B0000' }} />
        {/* Diagonal cut bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-white z-[3]"
          style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 pb-28">
          <Link
            to="/about/hubs"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-10 transition-colors text-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {language === 'en' ? 'Back to Research Hubs' : 'Retour aux pôles de recherche'}
          </Link>

          <div className="flex items-start gap-5 mb-6">
            <div className="p-3.5 rounded-xl flex-shrink-0"
              style={{ backgroundColor: (currentHub.color || '#8B0000') + '30' }}>
              <HubIcon className="w-10 h-10 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-px bg-white/40" />
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/50">
                  {language === 'en' ? 'Research Hub' : 'Pôle de recherche'}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold break-words text-white leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {language === 'en' ? currentHub.nameEn : currentHub.nameFr}
              </h1>
              <p className="text-sm text-white/50 mt-2 font-medium">
                {hubMembers.length} {language === 'en' ? 'Team Members' : 'Membres de l\'équipe'}
              </p>
            </div>
          </div>

          <p className="text-base md:text-lg leading-relaxed max-w-3xl text-white/70 break-words">
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
              <Card key={index} className="border-l-4 border-[#8B0000] hover:shadow-lg transition-shadow overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8B0000] text-white flex items-center justify-center font-semibold">
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
                  <div className="mb-4 p-3 bg-[#8B0000]/5 rounded-lg inline-block">
                    <BookOpen className="w-8 h-8 text-[#8B0000]" />
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
                <GraduationCap className="w-6 h-6 text-[#8B0000]" />
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
                <User className="w-6 h-6 text-[#8B0000]" />
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
                <Building2 className="w-6 h-6 text-[#8B0000]" />
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
      <section className="py-16 bg-[#8B0000] text-white">
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
              className="px-8 py-4 bg-white text-[#8B0000] rounded-lg hover:bg-gray-100 transition-colors font-semibold"
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
          <Avatar className="w-16 h-16 bg-[#8B0000] text-white flex-shrink-0">
            {member.image && <AvatarImage src={member.image} alt={member.name} />}
            <AvatarFallback className="bg-[#8B0000] text-white text-lg font-semibold">
              {member.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-[#0A0A0A] mb-1 leading-tight break-words">{member.name}</h4>
            <p className="text-sm text-[#8B0000] font-medium mb-1 break-words">
              {language === 'en' ? member.role : member.roleFr}
            </p>
            {member.isHubLeader && (
              <Badge className="bg-[#8B0000] text-white text-xs mb-2">
                {language === 'en' ? 'Hub Leader' : 'Responsable du pôle'}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="space-y-2 text-sm text-[#0A0A0A]/70">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 flex-shrink-0 text-[#8B0000]" />
            <span className="truncate">{language === 'en' ? member.institution : member.institutionFr}</span>
          </div>
          {member.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 flex-shrink-0 text-[#8B0000]" />
              <a href={`mailto:${sanitizeEmail(member.email)}`} className="text-[#8B0000] hover:underline truncate">
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

// Helper function to get members (this data would normally be imported)
function getMembers() {
  return [
    // Faculty Members - Childhood and Growing Up Hub
    {
      name: 'Dr. Christine Tardif-Williams',
      role: 'Professor',
      roleFr: 'Professeure',
      hub: 'Childhood and Growing Up Hub',
      hubFr: 'Pôle Enfance et croissance',
      institution: 'Brock University',
      institutionFr: 'Université Brock',
      email: 'ctardifwilliams@brocku.ca',
      type: 'faculty',
      bio: 'Dr. Tardif-Williams is a Professor at Brock University whose research focuses on childhood development, particularly in newcomer and racialized communities. Her work examines how children navigate housing, education, and social spaces.',
      bioFr: 'Dre Tardif-Williams est professeure à l\'Université Brock dont la recherche se concentre sur le développement de l\'enfance, particulièrement dans les communautés nouvelles arrivantes et racialisées. Son travail examine comment les enfants naviguent le logement, l\'éducation et les espaces sociaux.',
    },
    {
      name: 'Dr. Rebecca Raby',
      role: 'Professor, Hub Leader',
      roleFr: 'Professeure, Responsable du pôle',
      hub: 'Childhood and Growing Up Hub',
      hubFr: 'Pôle Enfance et croissance',
      institution: 'Brock University',
      institutionFr: 'Université Brock',
      email: 'rraby@brocku.ca',
      type: 'faculty',
      isHubLeader: true,
      bio: 'Dr. Raby is a Professor and Hub Leader at Brock University specializing in youth studies and the sociology of childhood. Her research focuses on how newcomer children experience housing insecurity, leisure, sport, and education.',
      bioFr: 'Dre Raby est professeure et responsable du pôle à l\'Université Brock, spécialisée dans les études sur la jeunesse et la sociologie de l\'enfance. Ses recherches se concentrent sur la façon dont les enfants nouveaux arrivants vivent l\'insécurité du logement, les loisirs, le sport et l\'éducation.',
    },
    {
      name: 'Dr. Dawn Trussell',
      role: 'Professor',
      roleFr: 'Professeure',
      hub: 'Childhood and Growing Up Hub',
      hubFr: 'Pôle Enfance et croissance',
      institution: 'Brock University',
      institutionFr: 'Université Brock',
      email: 'dtrussell@brocku.ca',
      type: 'faculty',
      bio: 'Dr. Trussell is a Professor at Brock University whose research explores leisure, recreation, and family dynamics. Her work examines how newcomer families access and engage with leisure opportunities in their communities.',
      bioFr: 'Dre Trussell est professeure à l\'Université Brock dont la recherche explore les loisirs, la récréation et la dynamique familiale. Son travail examine comment les familles nouvelles arrivantes accèdent et s\'engagent avec les opportunités de loisirs dans leurs communautés.',
    },
    {
      name: 'Dr. Diane Farmer',
      role: 'Professor',
      roleFr: 'Professeure',
      hub: 'Childhood and Growing Up Hub',
      hubFr: 'Pôle Enfance et croissance',
      institution: 'University of Toronto',
      institutionFr: 'Université de Toronto',
      email: 'diane.farmer@utoronto.ca',
      type: 'faculty',
      bio: 'Dr. Farmer is a Professor at the University of Toronto whose research focuses on francophone minority education, immigration, and bilingualism. Her work examines educational experiences of newcomer children in diverse linguistic contexts.',
      bioFr: 'Dre Farmer est professeure à l\'Université de Toronto dont la recherche se concentre sur l\'éducation en milieu francophone minoritaire, l\'immigration et le bilinguisme. Son travail examine les expériences éducatives des enfants nouveaux arrivants dans des contextes linguistiques diversifiés.',
    },
    // Students - Childhood Hub
    {
      name: 'Erika Alegria',
      role: 'PhD Student',
      roleFr: 'Étudiante au doctorat',
      hub: 'Childhood and Growing Up Hub',
      hubFr: 'Pôle Enfance et croissance',
      institution: 'Brock University',
      institutionFr: 'Université Brock',
      email: 'ea21pd@brocku.ca',
      type: 'student',
      bio: 'Erika Alegria is a PhD student at Brock University conducting research on childhood experiences and community engagement.',
      bioFr: 'Erika Alegria est étudiante au doctorat à l\'Université Brock menant des recherches sur les expériences de l\'enfance et l\'engagement communautaire.',
    },
    {
      name: 'Frederick Oppong',
      role: 'PhD Student',
      roleFr: 'Étudiant au doctorat',
      hub: 'Childhood and Growing Up Hub',
      hubFr: 'Pôle Enfance et croissance',
      institution: 'Brock University',
      institutionFr: 'Université Brock',
      email: 'Zw23la@brocku.ca',
      type: 'student',
      bio: 'Frederick Oppong is a PhD student at Brock University exploring childhood development and social inclusion.',
      bioFr: 'Frederick Oppong est étudiant au doctorat à l\'Université Brock explorant le développement de l\'enfance et l\'inclusion sociale.',
    },
    // Community Partners - Childhood Hub
    {
      name: 'Elisabeth Zimmermann',
      role: 'Executive Director',
      roleFr: 'Directrice exécutive',
      hub: 'Childhood and Growing Up Hub',
      hubFr: 'Pôle Enfance et croissance',
      institution: 'YWCA Niagara Region',
      institutionFr: 'YWCA Région de Niagara',
      email: 'ezimmermann@ywcaniagararegion.ca',
      type: 'community',
      bio: 'Elisabeth Zimmermann is the Executive Director of YWCA Niagara Region, providing leadership for shelter services, transitional housing, and support programs for women and families experiencing homelessness.',
      bioFr: 'Elisabeth Zimmermann est directrice exécutive de la YWCA Région de Niagara, assurant le leadership des services d\'hébergement, du logement transitoire et des programmes de soutien pour les femmes et les familles en situation d\'itinérance.',
    },
    {
      name: 'Emmanuel Mompongo',
      role: 'Project Coordinator',
      roleFr: 'Coordonnateur de projet',
      hub: 'Childhood and Growing Up Hub',
      hubFr: 'Pôle Enfance et croissance',
      institution: 'SOFIFRAN',
      institutionFr: 'SOFIFRAN',
      email: 'emmanuel@sofifran.org',
      type: 'community',
      bio: 'Emmanuel Mompongo is the Project Coordinator at SOFIFRAN (Société ontarienne des femmes immigrantes francophones), supporting francophone immigrant women and families in the Niagara region.',
      bioFr: 'Emmanuel Mompongo est coordonnateur de projet à SOFIFRAN (Société ontarienne des femmes immigrantes francophones), soutenant les femmes et les familles immigrantes francophones dans la région de Niagara.',
    },
    {
      name: 'Fété Ngira-Batware Kimpiobi',
      role: 'Community Partner',
      roleFr: 'Partenaire communautaire',
      hub: 'Childhood and Growing Up Hub',
      hubFr: 'Pôle Enfance et croissance',
      institution: 'SOFIFRAN',
      institutionFr: 'SOFIFRAN',
      email: 'info@sofifran.org',
      type: 'community',
      bio: 'Fété Ngira-Batware Kimpiobi works with SOFIFRAN to support francophone immigrant communities in accessing services and building connections.',
      bioFr: 'Fété Ngira-Batware Kimpiobi travaille avec SOFIFRAN pour soutenir les communautés immigrantes francophones dans l\'accès aux services et la construction de liens.',
    },
    {
      name: 'Mary Wiley',
      role: 'Director of Engagement',
      roleFr: 'Directrice de l\'engagement',
      hub: 'Childhood and Growing Up Hub',
      hubFr: 'Pôle Enfance et croissance',
      institution: 'Community Potential - Niagara Connects',
      institutionFr: 'Community Potential - Niagara Connects',
      email: 'mary.wiley@communitypotential.ca',
      type: 'community',
      bio: 'Mary Wiley is the Director of Engagement at Community Potential - Niagara Connects, working to strengthen community connections and support service coordination across the Niagara region.',
      bioFr: 'Mary Wiley est directrice de l\'engagement à Community Potential - Niagara Connects, travaillant à renforcer les liens communautaires et à soutenir la coordination des services dans la région de Niagara.',
    },

    // ==========================================
    // HEALTH LITERACY HUB (21 members)
    // ==========================================
    
    // Faculty Members
    {
      name: 'Joanne Crawford',
      role: 'Professor, Hub Co-Leader',
      roleFr: 'Professeure, Co-responsable du pôle',
      hub: 'Health Literacy Hub',
      hubFr: 'Pôle Littératie en santé',
      institution: 'Brock University',
      institutionFr: 'Université Brock',
      email: 'joanne.crawford@brocku.ca',
      type: 'faculty',
      isHubLeader: true,
      bio: 'Professor and Hub Co-Leader at Brock University focusing on health literacy in immigrant and refugee populations.',
      bioFr: 'Professeure et co-responsable du pôle à l\'Université Brock, se concentrant sur la littératie en santé dans les populations immigrantes et réfugiées.',
    },
    {
      name: 'Farah Ahmad',
      role: 'Professor',
      roleFr: 'Professeure',
      hub: 'Health Literacy Hub',
      hubFr: 'Pôle Littératie en santé',
      institution: 'York University',
      institutionFr: 'Université York',
      email: 'farahmad@yorku.ca',
      type: 'faculty',
      image: farahAhmadImg,
      bio: 'Professor at York University conducting research on health equity and immigrant health.',
      bioFr: 'Professeure à l\'Université York menant des recherches sur l\'équité en santé et la santé des immigrants.',
    },
    {
      name: 'Wooksoo Kim',
      role: 'Professor',
      roleFr: 'Professeur',
      hub: 'Health Literacy Hub',
      hubFr: 'Pôle Littératie en santé',
      institution: 'University at Buffalo',
      institutionFr: 'University at Buffalo',
      email: 'wkim5@buffalo.edu',
      type: 'faculty',
      bio: 'Professor at University at Buffalo specializing in community health and social work.',
      bioFr: 'Professeur à l\'University at Buffalo spécialisé dans la santé communautaire et le travail social.',
    },
    {
      name: 'Dr. Livianna Tossutti',
      role: 'Professor, Co-Director of Mobilizing Subjugated Knowledges for a Just and Inclusive Niagara and',
      roleFr: 'Professeure, Codirectrice de Mobiliser les savoirs marginalisés pour un Niagara juste et inclusif et',
      hub: 'Health Literacy Hub',
      hubFr: 'Pôle Littératie en santé',
      institution: 'Brock University',
      institutionFr: 'Université Brock',
      email: 'ltossutti@brocku.ca',
      type: 'faculty',
      bio: 'Professor at Brock University and Co-Director of Mobilizing Subjugated Knowledges for a Just and Inclusive Niagara. Dr. Tossutti contributes to health literacy research with immigrant and refugee populations.',
      bioFr: 'Professeure à l\'Université Brock et Codirectrice de Mobiliser les savoirs marginalisés pour un Niagara juste et inclusif. Dre Tossutti contribue à la recherche en littératie en santé auprès des populations immigrantes et réfugiées.',
    },
    
    // Students & Research Assistants
    {
      name: 'Karlie Janes',
      role: 'Research Assistant',
      roleFr: 'Assistante de recherche',
      hub: 'Health Literacy Hub',
      hubFr: 'Pôle Littératie en santé',
      institution: 'Brock University',
      institutionFr: 'Université Brock',
      email: 'pi23le@brocku.ca',
      type: 'student',
      bio: 'Research Assistant at Brock University supporting health literacy research.',
      bioFr: 'Assistante de recherche à l\'Université Brock soutenant la recherche en littératie en santé.',
    },
    {
      name: 'Hurakhsh Hazheer',
      role: 'Research Assistant',
      roleFr: 'Assistant de recherche',
      hub: 'Health Literacy Hub',
      hubFr: 'Pôle Littératie en santé',
      institution: 'Brock University',
      institutionFr: 'Université Brock',
      email: 'vd22bu@brocku.ca',
      type: 'student',
      bio: 'Research Assistant at Brock University contributing to health literacy projects.',
      bioFr: 'Assistant de recherche à l\'Université Brock contribuant aux projets de littératie en santé.',
    },
    
    // Community Partners
    {
      name: 'Marie Mouradikian',
      role: 'Executive Director/CEO',
      roleFr: 'Directrice exécutive/PDG',
      hub: 'Health Literacy Hub',
      hubFr: 'Pôle Littératie en santé',
      institution: 'Bridges Niagara',
      institutionFr: 'Bridges Niagara',
      email: 'mmouradikian@bridgesniagara.ca',
      type: 'community',
      bio: 'Executive Director/CEO of Bridges Niagara, supporting newcomer integration and settlement services.',
      bioFr: 'Directrice exécutive/PDG de Bridges Niagara, soutenant l\'intégration et les services d\'établissement pour les nouveaux arrivants.',
    },
    {
      name: 'Ijeoma Michael',
      role: 'Girls and Womens\' Projects Lead',
      roleFr: 'Responsable des projets pour les filles et les femmes',
      hub: 'Health Literacy Hub',
      hubFr: 'Pôle Littératie en santé',
      institution: 'Future Black Female',
      institutionFr: 'Future Black Female',
      email: 'ijeoma@futureblackfemale.com',
      type: 'community',
      bio: 'Girls and Womens\' Projects Lead at Future Black Female, empowering Black girls and women.',
      bioFr: 'Responsable des projets pour les filles et les femmes à Future Black Female, autonomisant les filles et les femmes noires.',
    },
    {
      name: 'Mariam Khayinza',
      role: 'Project Coordinator, Hub Co-Leader',
      roleFr: 'Coordonnatrice de projet, Co-responsable du pôle',
      hub: 'Health Literacy Hub',
      hubFr: 'Pôle Littératie en santé',
      institution: 'TOES Niagara',
      institutionFr: 'TOES Niagara',
      email: 'mariam@toesniagara.ca',
      type: 'community',
      isHubLeader: true,
      bio: 'Project Coordinator and Hub Co-Leader at TOES Niagara, leading community health initiatives.',
      bioFr: 'Coordonnatrice de projet et co-responsable du pôle à TOES Niagara, dirigeant les initiatives de santé communautaire.',
    },
    {
      name: 'Mary Wiley',
      role: 'Director of Engagement',
      roleFr: 'Directrice de l\'engagement',
      hub: 'Health Literacy Hub',
      hubFr: 'Pôle Littératie en santé',
      institution: 'Community Potential - Niagara Connects',
      institutionFr: 'Community Potential - Niagara Connects',
      email: 'mary.wiley@communitypotential.ca',
      type: 'community',
      bio: 'Director of Engagement at Community Potential - Niagara Connects.',
      bioFr: 'Directrice de l\'engagement à Community Potential - Niagara Connects.',
    },
    {
      name: 'Nyarai Kapisavanhu',
      role: 'Executive Director',
      roleFr: 'Directrice exécutive',
      hub: 'Health Literacy Hub',
      hubFr: 'Pôle Littératie en santé',
      institution: 'TOES Niagara',
      institutionFr: 'TOES Niagara',
      email: 'nyarai@toesniagara.ca',
      type: 'community',
      bio: 'Executive Director of TOES Niagara, supporting immigrant and refugee health.',
      bioFr: 'Directrice exécutive de TOES Niagara, soutenant la santé des immigrants et des réfugiés.',
    },
    {
      name: 'Shelby Cleveland',
      role: 'Health Promoter',
      roleFr: 'Promoteur de la santé',
      hub: 'Health Literacy Hub',
      hubFr: 'Pôle Littératie en santé',
      institution: 'Niagara Falls Community Health Center',
      institutionFr: 'Centre de santé communautaire de Niagara Falls',
      email: 'scleveland@nfchc.ca',
      type: 'community',
      bio: 'Health Promoter at Niagara Falls Community Health Center.',
      bioFr: 'Promoteur de la santé au Centre de santé communautaire de Niagara Falls.',
    },
    {
      name: 'Ailish Westaway',
      role: 'Health Promoter',
      roleFr: 'Promoteur de la santé',
      hub: 'Health Literacy Hub',
      hubFr: 'Pôle Littératie en santé',
      institution: 'QUEST Community Health Center',
      institutionFr: 'Centre de santé communautaire QUEST',
      email: 'awestaway@questchc.ca',
      type: 'community',
      bio: 'Health Promoter at QUEST Community Health Center.',
      bioFr: 'Promoteur de la santé au Centre de santé communautaire QUEST.',
    },
    {
      name: 'Zainab Awad',
      role: 'Manager Diversity, Equity and Inclusion',
      roleFr: 'Gestionnaire Diversité, Équité et Inclusion',
      hub: 'Health Literacy Hub',
      hubFr: 'Pôle Littératie en santé',
      institution: 'Niagara Health System',
      institutionFr: 'Système de santé de Niagara',
      email: 'zainab.awad@niagarahealth.on.ca',
      type: 'community',
      bio: 'Manager of Diversity, Equity and Inclusion at Niagara Health System.',
      bioFr: 'Gestionnaire de la diversité, de l\'équité et de l\'inclusion au Système de santé de Niagara.',
    },
    {
      name: 'Donna Mills',
      role: 'Team Lead Health Promotion',
      roleFr: 'Chef d\'équipe Promotion de la santé',
      hub: 'Health Literacy Hub',
      hubFr: 'Pôle Littératie en santé',
      institution: 'Niagara Public Health',
      institutionFr: 'Santé publique de Niagara',
      email: 'donna.mills@niagararegion.ca',
      type: 'community',
      bio: 'Team Lead for Health Promotion at Niagara Public Health.',
      bioFr: 'Chef d\'équipe pour la promotion de la santé à Santé publique de Niagara.',
    },
    {
      name: 'Karen Schmidt',
      role: 'Service System & Performance Management Advisor',
      roleFr: 'Conseillère en gestion des systèmes de services et de la performance',
      hub: 'Health Literacy Hub',
      hubFr: 'Pôle Littératie en santé',
      institution: 'Niagara Region Children\'s Services',
      institutionFr: 'Services à l\'enfance de la région de Niagara',
      email: 'Karen.Schmidt@niagararegion.ca',
      type: 'community',
      bio: 'Service System & Performance Management Advisor for Children\'s Services at Niagara Region.',
      bioFr: 'Conseillère en gestion des systèmes de services et de la performance pour les services à l\'enfance de la région de Niagara.',
    },
    {
      name: 'Holly Jones',
      role: 'Manager, Programming & Promotions',
      roleFr: 'Gestionnaire, Programmation et promotions',
      hub: 'Health Literacy Hub',
      hubFr: 'Pôle Littératie en santé',
      institution: 'St. Catharines Library',
      institutionFr: 'Bibliothèque de St. Catharines',
      email: 'hjones@myscpl.ca',
      type: 'community',
      bio: 'Manager of Programming & Promotions at St. Catharines Library.',
      bioFr: 'Gestionnaire de la programmation et des promotions à la bibliothèque de St. Catharines.',
    },
    {
      name: 'Melissa Broere',
      role: 'Branch Librarian',
      roleFr: 'Bibliothécaire de succursale',
      hub: 'Health Literacy Hub',
      hubFr: 'Pôle Littératie en santé',
      institution: 'St. Catharines Library',
      institutionFr: 'Bibliothèque de St. Catharines',
      email: 'mbroere@myscpl.ca',
      type: 'community',
      bio: 'Branch Librarian at St. Catharines Library.',
      bioFr: 'Bibliothécaire de succursale à la bibliothèque de St. Catharines.',
    },

    // ==========================================
    // IDENTITY, CONNECTIONS AND BELONGING HUB (19 members)
    // ==========================================
    
    // Faculty Members
    {
      name: 'Jean Ntakirutimana',
      role: 'Professor, Hub Leader',
      roleFr: 'Professeur, Responsable du pôle',
      hub: 'Identity, Connections and Belonging Hub',
      hubFr: 'Pôle Identité, relations et appartenance',
      institution: 'Brock University',
      institutionFr: 'Université Brock',
      email: 'jntakirutimana@brocku.ca',
      type: 'faculty',
      isHubLeader: true,
      bio: 'Professor and Hub Leader at Brock University, leading research on identity and belonging in Afro-descendant communities.',
      bioFr: 'Professeur et responsable du pôle à l\'Université Brock, dirigeant la recherche sur l\'identité et l\'appartenance dans les communautés afro-descendantes.',
    },
    {
      name: 'Julie Ham',
      role: 'Professor, Project Leader',
      roleFr: 'Professeure, Responsable de projet',
      hub: 'Identity, Connections and Belonging Hub',
      hubFr: 'Pôle Identité, relations et appartenance',
      institution: 'Brock University',
      institutionFr: 'Université Brock',
      email: 'jham@brocku.ca',
      type: 'faculty',
      bio: 'Professor at Brock University and Project #2 Leader focusing on migrant farmworkers in community.',
      bioFr: 'Professeure à l\'Université Brock et responsable du projet #2 se concentrant sur les travailleurs agricoles migrants dans la communauté.',
    },
    {
      name: 'Dane Marco Di Cesare',
      role: 'Professor, Project Leader',
      roleFr: 'Professeur, Responsable de projet',
      hub: 'Identity, Connections and Belonging Hub',
      hubFr: 'Pôle Identité, relations et appartenance',
      institution: 'Brock University',
      institutionFr: 'Université Brock',
      email: 'ddicesare@brocku.ca',
      type: 'faculty',
      bio: 'Professor at Brock University and Project #3 Leader researching ICT use and SGD newcomers.',
      bioFr: 'Professeur à l\'Université Brock et responsable du projet #3 étudiant l\'utilisation des TIC et les nouveaux arrivants de diverses identités sexuelles et de genre.',
    },
    {
      name: 'Pascal Lupien',
      role: 'Professor',
      roleFr: 'Professeur',
      hub: 'Identity, Connections and Belonging Hub',
      hubFr: 'Pôle Identité, relations et appartenance',
      institution: 'Brock University',
      institutionFr: 'Université Brock',
      email: 'plupien@brocku.ca',
      type: 'faculty',
      bio: 'Professor at Brock University contributing to research on identity and community connections.',
      bioFr: 'Professeur à l\'Université Brock contribuant à la recherche sur l\'identité et les connexions communautaires.',
    },
    {
      name: 'Shelley Craig',
      role: 'Professor',
      roleFr: 'Professeure',
      hub: 'Identity, Connections and Belonging Hub',
      hubFr: 'Pôle Identité, relations et appartenance',
      institution: 'University of Toronto',
      institutionFr: 'Université de Toronto',
      email: 'shelley.craig@utoronto.ca',
      type: 'faculty',
      bio: 'Professor at the University of Toronto specializing in social work and LGBTQ+ communities.',
      bioFr: 'Professeure à l\'Université de Toronto spécialisée dans le travail social et les communautés LGBTQ+.',
    },
    {
      name: 'Kaschka Watson',
      role: 'Professor',
      roleFr: 'Professeure',
      hub: 'Identity, Connections and Belonging Hub',
      hubFr: 'Pôle Identité, relations et appartenance',
      institution: 'Brock University',
      institutionFr: 'Université Brock',
      email: 'kwatson@brocku.ca',
      type: 'faculty',
      bio: 'Professor at Brock University conducting research on identity and belonging.',
      bioFr: 'Professeure à l\'Université Brock menant des recherches sur l\'identité et l\'appartenance.',
    },
    {
      name: 'Dr. Jennifer Holzer',
      role: 'Post Doctoral Fellow',
      roleFr: 'Boursière postdoctorale',
      hub: 'Identity, Connections and Belonging Hub',
      hubFr: 'Pôle Identité, relations et appartenance',
      institution: 'Brock University - Environmental Sustainability Research Centre',
      institutionFr: 'Université Brock - Centre de recherche sur la durabilité environnementale',
      email: 'jholzer@brocku.ca',
      type: 'faculty',
      bio: 'Post Doctoral Fellow at Brock University Environmental Sustainability Research Centre.',
      bioFr: 'Boursière postdoctorale au Centre de recherche sur la durabilité environnementale de l\'Université Brock.',
    },
    {
      name: 'Dr. Winston Benn',
      role: 'Post Doctoral Fellow',
      roleFr: 'Boursier postdoctoral',
      hub: 'Identity, Connections and Belonging Hub',
      hubFr: 'Pôle Identité, relations et appartenance',
      institution: 'CARICOM',
      institutionFr: 'CARICOM',
      email: 'bennwcnd@gmail.com',
      type: 'faculty',
      bio: 'Incoming Canada/Caricom Researcher and Post Doctoral Fellow.',
      bioFr: 'Chercheur Canada/Caricom entrant et boursier postdoctoral.',
    },
    
    // Students & Research Assistants
    {
      name: 'Justin Mafie',
      role: 'Undergraduate Research Assistant, Webmaster',
      roleFr: 'Assistant de recherche de premier cycle, Webmestre',
      hub: 'Identity, Connections and Belonging Hub',
      hubFr: 'Pôle Identité, relations et appartenance',
      institution: 'Brock University',
      institutionFr: 'Université Brock',
      email: 'jmafie@brocku.ca',
      type: 'student',
      bio: 'Undergraduate Research Assistant and Webmaster at Brock University.',
      bioFr: 'Assistant de recherche de premier cycle et webmestre à l\'Université Brock.',
    },
    
    // Community Partners
    {
      name: 'Emmanuel Mompongo',
      role: 'Project Coordinator',
      roleFr: 'Coordonnateur de projet',
      hub: 'Identity, Connections and Belonging Hub',
      hubFr: 'Pôle Identité, relations et appartenance',
      institution: 'SOFIFRAN',
      institutionFr: 'SOFIFRAN',
      email: 'emmanuel@sofifran.org',
      type: 'community',
      bio: 'Project Coordinator at SOFIFRAN supporting francophone immigrant communities.',
      bioFr: 'Coordonnateur de projet à SOFIFRAN soutenant les communautés immigrantes francophones.',
    },
    {
      name: 'Fété Ngira-Batware Kimpiobi',
      role: 'Community Partner',
      roleFr: 'Partenaire communautaire',
      hub: 'Identity, Connections and Belonging Hub',
      hubFr: 'Pôle Identité, relations et appartenance',
      institution: 'SOFIFRAN',
      institutionFr: 'SOFIFRAN',
      email: 'info@sofifran.org',
      type: 'community',
      bio: 'Community partner with SOFIFRAN.',
      bioFr: 'Partenaire communautaire avec SOFIFRAN.',
    },
    {
      name: 'Franklin Weledji',
      role: 'Community Liaison Officer',
      roleFr: 'Agent de liaison communautaire',
      hub: 'Identity, Connections and Belonging Hub',
      hubFr: 'Pôle Identité, relations et appartenance',
      institution: 'Centre canadien pour L\'unite de la famille (CCF)',
      institutionFr: 'Centre canadien pour L\'unite de la famille (CCF)',
      email: 'fleukam@cscmonavenir.ca',
      type: 'community',
      bio: 'Community Liaison Officer at Centre canadien pour L\'unite de la famille (CCF).',
      bioFr: 'Agent de liaison communautaire au Centre canadien pour L\'unite de la famille (CCF).',
    },
    {
      name: 'Janet Madume',
      role: 'Executive Director',
      roleFr: 'Directrice exécutive',
      hub: 'Identity, Connections and Belonging Hub',
      hubFr: 'Pôle Identité, relations et appartenance',
      institution: 'Bridges Niagara - Immigrant and Refugee Services',
      institutionFr: 'Bridges Niagara - Services pour immigrants et réfugiés',
      email: 'jmadume@wellandheritagecouncil.com',
      type: 'community',
      bio: 'Executive Director of Bridges Niagara - Immigrant and Refugee Services.',
      bioFr: 'Directrice exécutive de Bridges Niagara - Services pour immigrants et réfugiés.',
    },
    {
      name: 'Lori Webster',
      role: 'IEHP Hub Pilot/Labour Market Orientation',
      roleFr: 'Pilote du pôle IEHP/Orientation du marché du travail',
      hub: 'Identity, Connections and Belonging Hub',
      hubFr: 'Pôle Identité, relations et appartenance',
      institution: 'Bridges Niagara - Immigrant and Refugee Services',
      institutionFr: 'Bridges Niagara - Services pour immigrants et réfugiés',
      email: 'lwebster@wellandheritagecouncil.com',
      type: 'community',
      bio: 'IEHP Hub Pilot and Labour Market Orientation specialist at Bridges Niagara.',
      bioFr: 'Pilote du pôle IEHP et spécialiste de l\'orientation du marché du travail à Bridges Niagara.',
    },
    {
      name: 'Mariam Khayinza',
      role: 'Project Coordinator',
      roleFr: 'Coordonnatrice de projet',
      hub: 'Identity, Connections and Belonging Hub',
      hubFr: 'Pôle Identité, relations et appartenance',
      institution: 'TOES Niagara',
      institutionFr: 'TOES Niagara',
      email: 'mariam@toesniagara.ca',
      type: 'community',
      bio: 'Project Coordinator at TOES Niagara.',
      bioFr: 'Coordonnatrice de projet à TOES Niagara.',
    },
    {
      name: 'Mary Wiley',
      role: 'Director of Engagement',
      roleFr: 'Directrice de l\'engagement',
      hub: 'Identity, Connections and Belonging Hub',
      hubFr: 'Pôle Identité, relations et appartenance',
      institution: 'Community Potential - Niagara Connects',
      institutionFr: 'Community Potential - Niagara Connects',
      email: 'mary.wiley@communitypotential.ca',
      type: 'community',
      bio: 'Director of Engagement at Community Potential - Niagara Connects.',
      bioFr: 'Directrice de l\'engagement à Community Potential - Niagara Connects.',
    },
    {
      name: 'Mikhaela Sullivan',
      role: 'Project Officer',
      roleFr: 'Agente de projet',
      hub: 'Identity, Connections and Belonging Hub',
      hubFr: 'Pôle Identité, relations et appartenance',
      institution: 'Le Réseau en Immigration Francophone du Centre-Sud-Ouest de l\'Ontario',
      institutionFr: 'Le Réseau en Immigration Francophone du Centre-Sud-Ouest de l\'Ontario',
      email: 'mikhaela.sullivan@cschn.ca',
      type: 'community',
      bio: 'Project Officer at Le Réseau en Immigration Francophone du Centre-Sud-Ouest de l\'Ontario.',
      bioFr: 'Agente de projet au Réseau en Immigration Francophone du Centre-Sud-Ouest de l\'Ontario.',
    },
    {
      name: 'Nyarai Kapisavanhu',
      role: 'Executive Director',
      roleFr: 'Directrice exécutive',
      hub: 'Identity, Connections and Belonging Hub',
      hubFr: 'Pôle Identité, relations et appartenance',
      institution: 'TOES Niagara',
      institutionFr: 'TOES Niagara',
      email: 'nyarai@toesniagara.ca',
      type: 'community',
      bio: 'Executive Director of TOES Niagara.',
      bioFr: 'Directrice exécutive de TOES Niagara.',
    },
    {
      name: 'Daniel Tatarnic',
      role: 'Reverend Dr.',
      roleFr: 'Révérend Dr.',
      hub: 'Identity, Connections and Belonging Hub',
      hubFr: 'Pôle Identité, relations et appartenance',
      institution: 'Migrant Farm Workers Project: St. Alban\'s Anglican Church',
      institutionFr: 'Projet des travailleurs agricoles migrants : Église anglicane St. Alban',
      email: 'danieltatarnic@outlook.com',
      type: 'community',
      bio: 'Reverend Dr. at Migrant Farm Workers Project supporting seasonal agricultural workers.',
      bioFr: 'Révérend Dr. au Projet des travailleurs agricoles migrants soutenant les travailleurs agricoles saisonniers.',
    },
    {
      name: 'Amy Andrews',
      role: 'Research Analyst',
      roleFr: 'Analyste de recherche',
      hub: 'Identity, Connections and Belonging Hub',
      hubFr: 'Pôle Identité, relations et appartenance',
      institution: 'Niagara Local Immigration Partnership',
      institutionFr: 'Partenariat local en immigration de Niagara',
      email: 'amy.andrews@niagararegion.ca',
      type: 'community',
      bio: 'Research Analyst at Niagara Local Immigration Partnership.',
      bioFr: 'Analyste de recherche au Partenariat local en immigration de Niagara.',
    },
    {
      name: 'Lisa Garlent',
      role: 'Project Coordinator',
      roleFr: 'Coordonnatrice de projet',
      hub: 'Identity, Connections and Belonging Hub',
      hubFr: 'Pôle Identité, relations et appartenance',
      institution: 'Niagara Local Immigration Partnership',
      institutionFr: 'Partenariat local en immigration de Niagara',
      email: 'lisa.garlent@niagararegion.ca',
      type: 'community',
      bio: 'Project Coordinator at Niagara Local Immigration Partnership.',
      bioFr: 'Coordonnatrice de projet au Partenariat local en immigration de Niagara.',
    },
  ];
}