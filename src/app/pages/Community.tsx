import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ExternalLink, Mail, MapPin, Heart, Users, Building2, Search, Filter, X, Tag } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useState } from 'react';
import { RippleRings } from '../components/HeroAnimations';
import { sanitizeSearchQuery, sanitizeUrl } from '../utils/security';
import { usePageMeta } from '../hooks/usePageMeta';

// Import logos
const ywcaLogo = '/af7a99d39d035b273d4e3d0f598d3a6831ad42e6.png';
const migrantFarmworkersLogo = '/c51299cab84d0db41025a7b6acc2f91dad241f19.png';
const caricomLogo = '/8e222bcbc2295324dfe444b5cc9c5d6e0bb243b8.png';
const communityPotentialLogo = '/2100957254f7eb0ea4050adcca17e3ef8003d39e.png';
const niagaraConnectsLogo = '/5554cc6019e321efeb2a5ae0621a2d5b54fe8190.png';
const nlipLogo = '/e3efa50a0dfbeae579a749859aab8f2f63920ab8.png';
const stCatharinesLibraryLogo = '/8a7aff8c28e41c14965e60ee35fec519925a66c0.png';
const niagaraHealthLogo = '/628de4b1ee9f5dd370379633138c153274cc3bf5.png';
const niagaraFallsCommunityHealthLogo = '/a644b274274c47623c7f67a111672ede625bacd4.png';
const brockESRCLogo = '/4825dd65e7c70d72bc4874a4e49e5ed0e76764db.png';
const brockLogo = '/6a2d35fb10f25faa07b97ffff38a76f184734ae4.png';
const uoftOiseLogo = '/d1667a3e49fcae0b8537fd7728ab5caca88e8bfd.png';
const questLogo = '/45580b648e85e534070440d247ccc4a1940072ad.png';
const bridgesNiagaraLogo = '/42685716c968d89e0ce4c2df255a0e5fe47de6e5.png';
const futureBlackFemaleLogo = '/e63ce6bc137a9cdd5b4c0dfb3801c54c434f206d.png';
const niagaraRegionLogo = '/b80316cbb5ce9244931d871f5cd787d687cfdafb.png';
const yorkUniversityLogo = '/c04bb3e0b2c20a914be2fc34dabdbd667e3f6fd3.png';
const sofifranLogo = '/cddb65d214ee95919d49c1eb86550bcd58f2def7.png';
const toesNiagaraLogo = '/165706a2c9c6deebc6dc1cfda9805cf86e3cd39d.png';
const universityAtBuffaloLogo = '/1e02762e71863f48fceb1cc3277e8ecd07e53156.png';
const rifLogo = '/9fafec0861e517a7ac37f6cf1244f35ee2d1fef3.png';
const ccfLogo = '/7f7ae1c7a4e3ad20ddc36735ca6ef245d569338a.png';
const wellandHeritageCouncilLogo = '/b988ec04fdec29b54dd9b6f3d4fa9715cff4d6cd.png';

export function Community() {
  const { t, language } = useLanguage();
  usePageMeta(
    language === 'en' ? 'Community | MSK Niagara' : 'Communauté | MSK Niagara',
    language === 'en'
      ? 'Community organizations and health partners across the Niagara region working alongside MSK Niagara.'
      : 'Organismes communautaires et partenaires de santé de la région de Niagara collaborant avec MSK Niagara.'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const organizations = [
    // 1. Bridges Niagara - Alphabetical Order
    {
      name: 'Bridges Niagara - Immigrant and Refugee Services',
      nameFr: 'Bridges Niagara - Services pour immigrants et réfugiés',
      description: 'Bridges Niagara provides comprehensive settlement and integration services to newcomers, immigrants, and refugees in the Niagara Region. They offer language training, employment support, community connections, and settlement assistance.',
      descriptionFr: 'Bridges Niagara fournit des services complets d\'établissement et d\'intégration aux nouveaux arrivants, immigrants et réfugiés dans la région de Niagara.',
      services: ['Settlement Services', 'Language Training', 'Employment Support', 'Community Integration', 'Refugee Services'],
      servicesFr: ['Services d\'établissement', 'Formation linguistique', 'Soutien à l\'emploi', 'Intégration communautaire', 'Services aux réfugiés'],
      website: 'https://www.bridgesniagara.ca/',
      contact: 'info@bridgesniagara.ca',
      category: 'newcomer-services',
      location: 'Niagara Region',
      logo: bridgesNiagaraLogo,
      color: '#F20014',
    },
    // 2. Brock University ESRC
    {
      name: 'Brock University ESRC',
      nameFr: 'Centre de recherche sur la durabilité environnementale de l\'Universit Brock',
      description: 'The Environmental Sustainability Research Centre (ESRC) at Brock University conducts interdisciplinary research focused on environmental sustainability, climate change, sustainable communities, and environmental policy.',
      descriptionFr: 'Le Centre de recherche sur la durabilité environnementale (ESRC) de l\'Université Brock mène des recherches interdisciplinaires axées sur la durabilité environnementale.',
      services: ['Environmental Research', 'Climate Change Studies', 'Sustainability Programs', 'Community Partnerships'],
      servicesFr: ['Recherche environnementale', 'Études sur le changement climatique', 'Programmes de durabilité', 'Partenariats communautaires'],
      website: 'https://www.brocku.ca/esrc/',
      contact: 'esrc@brocku.ca',
      category: 'research',
      location: 'St. Catharines',
      logo: brockESRCLogo,
      color: '#8B0000',
    },
    // 3. CARICOM
    {
      name: 'CARICOM',
      nameFr: 'CARICOM',
      description: 'CARICOM is a regional intergovernmental organization that promotes economic integration and cooperation among its member states in the Caribbean.',
      descriptionFr: 'CARICOM est une organisation intergouvernementale régionale qui promeut l\'intégration économique et la coopération entre ses États membres dans les Caraïbes.',
      services: ['Economic Integration', 'Cooperation', 'Trade Agreements', 'Development Programs'],
      servicesFr: ['Intégration économique', 'Coopération', 'Accords commerciaux', 'Programmes de développement'],
      website: 'https://www.caricom.org/',
      contact: 'info@caricom.org',
      category: 'international',
      location: 'Caribbean',
      logo: caricomLogo,
      color: '#8B0000',
    },
    // 4. Centre canadien pour L'unité de la famille (CCF)
    {
      name: 'Centre canadien pour L\'unité de la famille (CCF)',
      nameFr: 'Centre canadien pour L\'unité de la famille (CCF)',
      description: 'The Canadian Centre for Family Unity (CCF), in partnership with Conseil Scolaire Catholique MonAvenir, is dedicated to supporting Francophone families and promoting family unity through educational programs, family support services, and community engagement. CCF provides a range of services including parenting support, family counseling, cultural programming, and educational initiatives that strengthen family bonds and promote healthy child development in Francophone communities.',
      descriptionFr: 'Le Centre canadien pour L\'unité de la famille (CCF), en partenariat avec le Conseil Scolaire Catholique MonAvenir, se consacre au soutien des familles francophones et à la promotion de l\'unité familiale par le biais de programmes éducatifs, de services de soutien familial et d\'engagement communautaire.',
      services: ['Family Support Services', 'Parenting Programs', 'Educational Initiatives', 'Cultural Programming', 'Family Counseling'],
      servicesFr: ['Services de soutien familial', 'Programmes parentaux', 'Initiatives éducatives', 'Programmation culturelle', 'Conseil familial'],
      website: 'https://centrecanadiendelafamille.ca/en/?playlist=4f24e01&video=e3ac633',
      contact: 'info@centrecanadiendelafamille.ca',
      category: 'social-services',
      location: 'Ontario',
      logo: ccfLogo,
      color: '#F20014',
    },
    // 5. Community Potential
    {
      name: 'Community Potential',
      nameFr: 'Potentiel communautaire',
      description: 'Community Potential is a registered charity and innovative social service agency serving the Niagara Region. They work to build community capacity and enable individuals, families, and communities to reach their full potential through comprehensive programs including housing support, mental health services, youth programs, family resources, and community development initiatives. Community Potential focuses on strengthening communities by fostering connections, building resilience, and creating opportunities for positive change.',
      descriptionFr: 'Potentiel communautaire est un organisme de bienfaisance enregistré et une agence innovante de services sociaux au service de la région de Niagara. Ils travaillent à renforcer la capacité communautaire et à permettre aux individus, aux familles et aux communautés d\'atteindre leur plein potentiel.',
      services: ['Housing Support', 'Mental Health Services', 'Youth Programs', 'Family Resources', 'Community Development', 'Capacity Building'],
      servicesFr: ['Soutien au logement', 'Services de santé mentale', 'Programmes jeunesse', 'Ressources familiales', 'Développement communautaire', 'Renforcement des capacités'],
      website: 'https://www.communitypotential.ca/',
      contact: 'info@communitypotential.ca',
      category: 'social-services',
      location: 'Niagara Region',
      logo: communityPotentialLogo,
      color: '#8B0000',
    },
    // 6. Future Black Female
    {
      name: 'Future Black Female',
      nameFr: 'Future Black Female',
      description: 'Future Black Female is a grassroots organization dedicated to empowering young Black women and girls through mentorship, education, leadership development, and community support. The organization creates safe spaces for Black females to connect, learn, grow, and thrive.',
      descriptionFr: 'Future Black Female est une organisation communautaire dédiée à l\'autonomisation des jeunes femmes et filles noires par le mentorat, l\'éducation, le développement du leadership et le soutien communautaire.',
      services: ['Mentorship Programs', 'Leadership Development', 'Educational Support', 'Community Building', 'Youth Empowerment'],
      servicesFr: ['Programmes de mentorat', 'Développement du leadership', 'Soutien éducatif', 'Construction communautaire', 'Autonomisation des jeunes'],
      website: 'https://www.futureblackfemale.org/',
      contact: 'info@futureblackfemale.org',
      category: 'youth',
      location: 'Niagara Region',
      logo: futureBlackFemaleLogo,
      color: '#8B0000',
    },
    // 7. Migrant Farmworkers Project
    {
      name: 'Migrant Farmworkers Project',
      nameFr: 'Migrant Farmworkers Project',
      description: 'Migrant Farmworkers Project is a hospitality and pastoral care ministry that accompanies and empowers migrant farmworkers during their work season in the Niagara region. We build bridges and bring together seasonal migrant farmworkers, volunteers, and community partners, as we together make community and provide a safe space for a mutual relationship.',
      descriptionFr: 'Le Migrant Farmworkers Project est un ministère d\'hospitalité et de soins pastoraux qui accompagne et habilite les travailleurs agricoles migrants pendant leur saison de travail dans la région de Niagara.',
      services: ['Hospitality & Pastoral Care', 'Integrated Services', 'Spiritual Support', 'Medical & Physical Needs', 'Community Building'],
      servicesFr: ['Hospitalité et soins pastoraux', 'Services intégrés', 'Soutien spirituel', 'Besoins médicaux et physiques', 'Construction communautaire'],
      website: 'https://migrantfarmworkers.ca/',
      contact: 'info@migrantfarmworkers.ca',
      category: 'social-services',
      location: 'Niagara Region',
      logo: migrantFarmworkersLogo,
      color: '#F20014',
    },
    // 8. Niagara Falls Community Health
    {
      name: 'Niagara Falls Community Health',
      nameFr: 'Santé communautaire de Niagara Falls',
      description: 'Niagara Falls Community Health is a health care provider that offers a wide range of services to residents of the Niagara Region, including primary care, specialized care, and community health programs.',
      descriptionFr: 'Niagara Falls Community Health est un fournisseur de soins de santé qui offre une large gamme de services aux résidents de la région de Niagara.',
      services: ['Primary Care', 'Specialized Care', 'Community Health Programs', 'Health Education'],
      servicesFr: ['Soins primaires', 'Soins spécialisés', 'Programmes de santé communautaire', 'Éducation à la santé'],
      website: 'https://www.niagarafallscommunityhealth.ca/',
      contact: 'info@niagarafallscommunityhealth.ca',
      category: 'health',
      location: 'Niagara Falls',
      logo: niagaraFallsCommunityHealthLogo,
      color: '#F20014',
    },
    // 9. Niagara Health
    {
      name: 'Niagara Health',
      nameFr: 'Niagara Health',
      description: 'Niagara Health is a regional hospital network operating five hospital sites across Niagara Region (St. Catharines, Niagara Falls, Welland, Fort Erie, Port Colborne). Services include acute care, emergency departments, surgical services, specialized medicine, and diagnostic imaging.',
      descriptionFr: 'Niagara Health est un réseau hospitalier régional exploitant cinq sites hospitaliers dans la région de Niagara (St. Catharines, Niagara Falls, Welland, Fort Erie, Port Colborne). Les services comprennent les soins aigus, les départements d\'urgence, les services chirurgicaux, la médecine spécialisée et l\'imagerie diagnostique.',
      services: ['Acute Care', 'Emergency Services', 'Surgical Services', 'Specialized Medicine', 'Diagnostic Imaging'],
      servicesFr: ['Soins aigus', 'Services d\'urgence', 'Services chirurgicaux', 'Médecine spécialisée', 'Imagerie diagnostique'],
      website: 'https://www.niagarahealth.on.ca/',
      contact: 'info@niagarahealth.on.ca',
      category: 'health',
      location: 'Niagara Region',
      logo: niagaraHealthLogo,
      color: '#8B0000',
    },
    // 10. Niagara Local Immigration Partnership (NLIP)
    {
      name: 'Niagara Local Immigration Partnership (NLIP)',
      nameFr: 'Partenariat local pour l\'immigration de Niagara (PLIN)',
      description: 'The Niagara Local Immigration Partnership (NLIP) is a multi-sectoral partnership hosted by the Regional Municipality of Niagara that brings together service providers, government, employers, and community organizations to support immigrant integration and settlement in the Niagara Region. NLIP coordinates strategic planning, community engagement, and collaborative initiatives to enhance newcomer services and promote welcoming communities.',
      descriptionFr: 'Le Partenariat local pour l\'immigration de Niagara (PLIN) est un partenariat multisectoriel hébergé par la municipalité régionale de Niagara qui rassemble les fournisseurs de services, le gouvernement, les employeurs et les organisations communautaires pour soutenir l\'intégration et l\'établissement des immigrants dans la région de Niagara.',
      services: ['Strategic Planning', 'Community Engagement', 'Partnership Coordination', 'Immigrant Integration', 'Settlement Support'],
      servicesFr: ['Planification stratégique', 'Engagement communautaire', 'Coordination de partenariats', 'Intégration des immigrants', 'Soutien à l\'établissement'],
      website: 'https://www.niagararegion.ca/living/immigration/default.aspx',
      contact: 'immigration@niagararegion.ca',
      category: 'government',
      location: 'Niagara Region',
      logo: nlipLogo,
      color: '#8B0000',
    },
    // 11. Niagara Region
    {
      name: 'Niagara Region',
      nameFr: 'Région de Niagara',
      description: 'The Regional Municipality of Niagara is a local government that serves 12 area municipalities across the Niagara Region. The Region provides essential services including public health, social services, emergency medical services, waste management, and regional planning.',
      descriptionFr: 'La municipalité régionale de Niagara est une administration locale qui dessert 12 municipalités de la région de Niagara.',
      services: ['Public Health', 'Social Services', 'Emergency Services', 'Regional Planning', 'Community Programs'],
      servicesFr: ['Santé publique', 'Services sociaux', 'Services d\'urgence', 'Planification régionale', 'Programmes communautaires'],
      website: 'https://www.niagararegion.ca/',
      contact: 'info@niagararegion.ca',
      category: 'government',
      location: 'Niagara Region',
      logo: niagaraRegionLogo,
      color: '#F20014',
    },
    // 12. QUEST Community Health Centre
    {
      name: 'QUEST Community Health Centre',
      nameFr: 'Centre de santé communautaire QUEST',
      description: 'QUEST Community Health Centre (Quest CHC) is a non-profit registered charitable organization providing primary health care, health promotion, and community capacity building to residents of the St. Catharines area and Niagara Region. Quest CHC\'s staff is made up of a wide range of interdisciplinary health care providers working in a shared care team model, with a focus on client-centred holistic health care that addresses the Social Determinants of Health.',
      descriptionFr: 'Le Centre de santé communautaire QUEST (Quest CHC) est un organisme de bienfaisance enregistré à but non lucratif offrant des soins de santé primaires, la promotion de la santé et le renforcement des capacités communautaires aux résidents de la région de St. Catharines et de Niagara.',
      services: ['Primary Health Care', 'Health Promotion', 'Community Capacity Building', 'Interdisciplinary Care', 'Social Determinants of Health'],
      servicesFr: ['Soins de santé primaires', 'Promotion de la santé', 'Renforcement des capacités communautaires', 'Soins interdisciplinaires', 'Déterminants sociaux de la santé'],
      website: 'https://www.questchc.ca/',
      contact: 'info@questchc.ca',
      category: 'health',
      location: 'St. Catharines',
      logo: questLogo,
      color: '#8B0000',
    },
    // 13. Réseau en immigration francophone du Centre-Sud-Ouest de l'Ontario (RIF CSO)
    {
      name: 'Réseau en immigration francophone du Centre-Sud-Ouest de l\'Ontario (RIF CSO)',
      nameFr: 'Réseau en immigration francophone du Centre-Sud-Ouest de l\'Ontario (RIF CSO)',
      description: 'The Francophone Immigration Network of Centre-South-West Ontario (RIF CSO) is dedicated to supporting French-speaking newcomers and promoting Francophone immigration in the region. RIF CSO coordinates settlement services, community partnerships, and strategic initiatives to strengthen Francophone communities and ensure welcoming environments for French-speaking immigrants.',
      descriptionFr: 'Le Réseau en immigration francophone du Centre-Sud-Ouest de l\'Ontario (RIF CSO) se consacre au soutien des nouveaux arrivants francophones et à la promotion de l\'immigration francophone dans la région. Le RIF CSO coordonne les services d\'établissement, les partenariats communautaires et les initiatives stratégiques pour renforcer les communautés francophones.',
      services: ['Francophone Settlement Services', 'Community Partnerships', 'Strategic Planning', 'Immigrant Support', 'Francophone Community Development'],
      servicesFr: ['Services d\'établissement francophones', 'Partenariats communautaires', 'Planification stratégique', 'Soutien aux immigrants', 'Développement de la communauté francophone'],
      website: 'https://immigrationfrancophone.ca/fr/strategie-communautaire/reseaux-en-immigration-francophone/',
      contact: 'info@rifcso.ca',
      category: 'newcomer-services',
      location: 'Centre-Sud-Ouest Ontario',
      logo: rifLogo,
      color: '#8B0000',
    },
    // 14. Social Justice Research Institute (SJRI)
    {
      name: 'Social Justice Research Institute (SJRI)',
      nameFr: 'Institut de recherche sur la justice sociale (IRJS)',
      description: 'The Social Justice Research Institute (SJRI) at Brock University is a founding member of this research partnership. SJRI conducts community-engaged research focused on social justice, equity, inclusion, and transformative social change. The Institute bridges academic research with community action to address systemic inequities and mobilize subjugated knowledges.',
      descriptionFr: 'L\'Institut de recherche sur la justice sociale (IRJS) de l\'Université Brock est un membre fondateur de ce partenariat de recherche. L\'IRJS mène des recherches communautaires axées sur la justice sociale, l\'équité, l\'inclusion et le changement social transformateur.',
      services: ['Social Justice Research', 'Community-Engaged Scholarship', 'Equity Studies', 'Knowledge Mobilization', 'Partnership Development'],
      servicesFr: ['Recherche en justice sociale', 'Recherche engagée avec la communauté', 'Études sur l\'équité', 'Mobilisation des connaissances', 'Développement de partenariats'],
      website: 'https://www.brocku.ca/social-justice-research-institute/',
      contact: 'sjri@brocku.ca',
      category: 'research',
      location: 'St. Catharines',
      logo: brockLogo,
      color: '#F20014',
    },
    // 15. SOFIFRAN
    {
      name: 'SOFIFRAN',
      nameFr: 'SOFIFRAN',
      description: 'SOFIFRAN (Société ontarienne des femmes immigrantes francophones / Ontario Society of Francophone Immigrant Women) is a francophone community organization supporting French-speaking immigrant women and families in Niagara Region. Services include settlement assistance, cultural programming, family support, and community engagement activities.',
      descriptionFr: 'SOFIFRAN (Société ontarienne des femmes immigrantes francophones) est une organisation communautaire francophone qui soutient les femmes immigrantes francophones et leurs familles dans la région de Niagara. Les services comprennent l\'aide à l\'établissement, la programmation culturelle, le soutien familial et les activités d\'engagement communautaire.',
      services: ['Francophone Settlement Services', 'Language Support', 'Cultural Integration', 'Community Building', 'Solidarity Programs'],
      servicesFr: ['Services d\'établissement francophones', 'Soutien linguistique', 'Intégration culturelle', 'Construction communautaire', 'Programmes de solidarité'],
      website: 'https://www.sofifran.ca/',
      contact: 'info@sofifran.ca',
      category: 'newcomer-services',
      location: 'Welland',
      logo: sofifranLogo,
      color: '#F20014',
    },
    // 16. St. Catharines Public Library
    {
      name: 'St. Catharines Public Library',
      nameFr: 'Bibliothèque publique de St-Catharines',
      description: 'The St. Catharines Public Library is a community resource that provides access to a wide range of information and resources, including books, magazines, and digital media, to support lifelong learning and community engagement.',
      descriptionFr: 'La Bibliothèque publique de St-Catharines est une ressource communautaire qui fournit un accès à une large gamme d\'informations et de ressources.',
      services: ['Library Access', 'Digital Resources', 'Community Programs', 'Learning Support'],
      servicesFr: ['Accès à la bibliothèque', 'Ressources numériques', 'Programmes communautaires', 'Soutien à l\'apprentissage'],
      website: 'https://www.stcatharineslibrary.ca/',
      contact: 'info@stcatharineslibrary.ca',
      category: 'education',
      location: 'St. Catharines',
      logo: stCatharinesLibraryLogo,
      color: '#F20014',
    },
    // 17. TOES Niagara
    {
      name: 'TOES Niagara',
      nameFr: 'TOES Niagara',
      description: 'TOES Niagara (Tools Of Empowerment for Success) is a grassroots community organization dedicated to empowering individuals and families through comprehensive support services. The organization provides life skills development, employment training, educational support, and community-building programs.',
      descriptionFr: 'TOES Niagara (Tools Of Empowerment for Success) est une organisation communautaire de base dédiée à l\'autonomisation des individus et des familles.',
      services: ['Life Skills Development', 'Employment Training', 'Educational Support', 'Community Building', 'Empowerment Programs'],
      servicesFr: ['Développement des compétences de vie', 'Formation à l\'emploi', 'Soutien éducatif', 'Construction communautaire', 'Programmes d\'autonomisation'],
      website: 'https://www.toesniagara.ca/',
      contact: 'info@toesniagara.ca',
      category: 'social-services',
      location: 'Niagara Region',
      logo: toesNiagaraLogo,
      color: '#8B0000',
    },
    // 18. University at Buffalo
    {
      name: 'University at Buffalo',
      nameFr: 'Université de Buffalo',
      description: 'The University at Buffalo (UB), The State University of New York, is a premier public research university and a flagship institution of the SUNY system. As a cross-border research partner, UB contributes world-class expertise in community health, social sciences, equity research, and interdisciplinary scholarship.',
      descriptionFr: 'L\'Université de Buffalo (UB), l\'Université d\'État de New York, est une université de recherche publique de premier plan.',
      services: ['Research Excellence', 'Cross-Border Collaboration', 'Community Health Research', 'Social Equity Studies', 'Knowledge Exchange'],
      servicesFr: ['Excellence en recherche', 'Collaboration transfrontalière', 'Recherche en santé communautaire', 'Études sur l\'équité sociale', 'Échange de connaissances'],
      website: 'https://www.buffalo.edu/',
      contact: 'info@buffalo.edu',
      category: 'research',
      location: 'Buffalo, NY',
      logo: universityAtBuffaloLogo,
      color: '#F20014',
    },
    // 19. University of Toronto - OISE
    {
      name: 'University of Toronto - OISE',
      nameFr: 'Université de Toronto - OISE',
      description: 'The Ontario Institute for Studies in Education (OISE) at the University of Toronto is a world-renowned research institute dedicated to educational research, teacher education, and community development. As a research partner, OISE contributes expertise in educational equity, social justice pedagogy, community-based research, and knowledge translation.',
      descriptionFr: 'L\'Institut d\'études pédagogiques de l\'Ontario (IEPO) de l\'Université de Toronto est un institut de recherche de renommée mondiale dédié à la recherche en éducation, à la formation des enseignants et au développement communautaire.',
      services: ['Educational Research', 'Teacher Education', 'Community Development', 'Social Justice Pedagogy', 'Knowledge Translation'],
      servicesFr: ['Recherche en éducation', 'Formation des enseignants', 'Développement communautaire', 'Pédagogie de justice sociale', 'Traduction des connaissances'],
      website: 'https://www.oise.utoronto.ca/',
      contact: 'oise.info@utoronto.ca',
      category: 'research',
      location: 'Toronto',
      logo: uoftOiseLogo,
      color: '#F20014',
    },
    // 20. Welland Heritage Council & Multicultural Centre
    {
      name: 'Welland Heritage Council & Multicultural Centre',
      nameFr: 'Conseil de patrimoine de Welland et Centre multiculturel',
      description: 'Welland Heritage Council & Multicultural Centre provides settlement services and employment programming to newcomers in Welland and Niagara Region. Services include settlement planning, employment counseling, the Internationally Educated Health Professionals (IEHP) Hub Project, refugee claimant support, and pre-arrival services.',
      descriptionFr: 'Le Conseil de patrimoine de Welland et Centre multiculturel offre des services d\'établissement et de programmation d\'emploi aux nouveaux arrivants à Welland et dans la région de Niagara. Les services comprennent la planification de l\'établissement, le counseling d\'emploi, le projet Hub pour professionnels de la santé formés à l\'étranger, le soutien aux demandeurs d\'asile et les services pré-arrivée.',
      services: ['Newcomer Settlement Program', 'Employment Solutions', 'Health Professionals HUB Project', 'Refugee Support', 'Workforce Integration'],
      servicesFr: ['Programme d\'établissement pour nouveaux arrivants', 'Solutions d\'emploi', 'Projet HUB pour professionnels de la santé', 'Soutien aux réfugiés', 'Intégration professionnelle'],
      website: 'https://www.wellandheritagecouncil.ca/',
      contact: 'info@wellandheritagecouncil.ca',
      category: 'newcomer-services',
      location: 'Welland',
      logo: wellandHeritageCouncilLogo,
      color: '#8B0000',
    },
    // 21. York University
    {
      name: 'York University',
      nameFr: 'Université York',
      description: 'York University is a leading public research university in Toronto, Ontario, known for its commitment to social justice, equity, and community engagement. As a research partner, York University contributes expertise in social sciences, community-engaged scholarship, and transformative education.',
      descriptionFr: 'L\'Université York est une université de recherche publique de premier plan à Toronto, en Ontario, connue pour son engagement envers la justice sociale.',
      services: ['Academic Programs', 'Social Justice Research', 'Community-Engaged Scholarship', 'Student Training', 'Knowledge Mobilization'],
      servicesFr: ['Programmes académiques', 'Recherche en justice sociale', 'Recherche engagée avec la communauté', 'Formation étudiante', 'Mobilisation des connaissances'],
      website: 'https://www.yorku.ca/',
      contact: 'info@yorku.ca',
      category: 'research',
      location: 'Toronto',
      logo: yorkUniversityLogo,
      color: '#8B0000',
    },
    // 22. YWCA Niagara Region
    {
      name: 'YWCA Niagara Region',
      nameFr: 'YWCA Région de Niagara',
      description: 'The YWCA provides services to homeless women and their families and has been operating since 1915. They currently provide shelter beds, transitional housing, skills development and addictions recovery support across the Niagara Region.',
      descriptionFr: 'La YWCA offre des services aux femmes sans-abri et à leurs familles et fonctionne depuis 1915. Ils fournissent actuellement des lits d\'hébergement, des logements transitoires, du développement de compétences et un soutien en rétablissement des dépendances dans toute la région du Niagara.',
      services: ['Shelter Services', 'Transitional Housing', 'Skills Development', 'Addictions Recovery Support'],
      servicesFr: ['Services d\'hébergement', 'Logement transitoire', 'Développement des compétences', 'Soutien au rétablissement des dépendances'],
      website: 'https://www.ywcaniagararegion.ca/',
      contact: 'info@ywcaniagararegion.ca',
      category: 'social-services',
      location: 'Niagara Region',
      logo: ywcaLogo,
      color: '#8B0000',
    },
  ];

  const categories = [
    { value: 'all', label: language === 'en' ? 'All Organizations' : 'Toutes les organisations', icon: Building2 },
    { value: 'health', label: language === 'en' ? 'Health Services' : 'Services de santé', icon: Heart },
    { value: 'newcomer-services', label: language === 'en' ? 'Newcomer Services' : 'Services aux nouveaux arrivants', icon: Users },
    { value: 'youth', label: language === 'en' ? 'Youth Services' : 'Services aux jeunes', icon: Users },
    { value: 'social-services', label: language === 'en' ? 'Social Services' : 'Services sociaux', icon: Heart },
    { value: 'education', label: language === 'en' ? 'Education' : 'Éducation', icon: Building2 },
    { value: 'research', label: language === 'en' ? 'Research' : 'Recherche', icon: Building2 },
    { value: 'government', label: language === 'en' ? 'Government' : 'Gouvernement', icon: Building2 },
    { value: 'international', label: language === 'en' ? 'International' : 'International', icon: Building2 },
    { value: 'community', label: language === 'en' ? 'Community' : 'Communauté', icon: Building2 },
  ];

  const filteredOrganizations = organizations.filter(org => {
    const matchesCategory = selectedCategory === 'all' || org.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      (language === 'en' ? org.name : org.nameFr).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (language === 'en' ? org.description : org.descriptionFr).toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#8B0000]">
        {/* Dot-grid brand motif */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
        />
        {/* Ripple rings expanding outward — community ripple effect */}
        <RippleRings count={6} />
        {/* Diagonal cut bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-white"
          style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 pb-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 shadow-lg"
              style={{ animation: 'fade-in-down 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s both' }}>
              <Heart className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-medium">
                {language === 'en' ? '22 Community Organizations' : '22 Organisations communautaires'}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl text-white font-extrabold mb-6 tracking-tight"
              style={{ fontFamily: 'var(--font-heading)', animation: 'fade-in-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}>
              {language === 'en' ? 'Community' : 'Communauté'}
            </h1>
            <p className="text-lg sm:text-xl text-white/75 max-w-3xl mx-auto leading-relaxed px-4"
              style={{ animation: 'fade-in-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.35s both' }}>
              {language === 'en'
                ? 'Working together with community service organizations dedicated to supporting newcomers, youth, diverse communities, and families across Niagara.'
                : 'Travailler ensemble avec des organisations de services communautaires dédiées au soutien des nouveaux arrivants, des jeunes, des communautés diverses et des familles dans Niagara.'}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-20 relative z-20">
        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border-2 border-gray-100 p-8 md:p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8B0000] to-[#A40000] flex items-center justify-center shadow-lg">
                <Filter className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] mb-1">
                  {language === 'en' ? 'Find Organizations' : 'Trouver des organisations'}
                </h2>
                <p className="text-sm text-[#0A0A0A]/60">
                  {language === 'en' 
                    ? `Showing ${filteredOrganizations.length} of ${organizations.length} community partners`
                    : `Affichage de ${filteredOrganizations.length} sur ${organizations.length} partenaires communautaires`}
                </p>
              </div>
              {(selectedCategory !== 'all' || searchTerm !== '') && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchTerm('');
                  }}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold bg-white border-2 border-[#8B0000]/20 text-[#8B0000] hover:border-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">{language === 'en' ? 'Clear All' : 'Tout effacer'}</span>
                </button>
              )}
            </div>
            
            {/* Search and Category Filter */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Search */}
              <div>
                <label className="block text-xs font-bold text-[#0A0A0A]/50 uppercase tracking-wider mb-3">
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-[#8B0000]" />
                    {language === 'en' ? 'Search Organizations' : 'Rechercher des organisations'}
                  </span>
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={language === 'en' ? 'Enter organization name...' : 'Entrez le nom de l\'organisation...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(sanitizeSearchQuery(e.target.value))}
                    className="w-full h-14 pl-12 pr-12 text-base font-semibold border-2 border-gray-200 hover:border-[#8B0000]/50 focus:border-[#8B0000] focus:outline-none focus:ring-4 focus:ring-[#8B0000]/10 bg-white rounded-xl shadow-sm transition-all duration-300"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-[#8B0000] text-gray-600 hover:text-white transition-all duration-300"
                      aria-label={language === 'en' ? 'Clear search' : 'Effacer la recherche'}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block text-xs font-bold text-[#0A0A0A]/50 uppercase tracking-wider mb-3">
                  <span className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#8B0000]" />
                    {language === 'en' ? 'Category' : 'Catégorie'}
                  </span>
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full h-14 text-base font-semibold border-2 border-gray-200 hover:border-[#8B0000]/50 focus:border-[#8B0000] bg-white rounded-xl shadow-sm transition-all duration-300">
                    <SelectValue placeholder={language === 'en' ? 'Select category...' : 'Sélectionner la catégorie...'} />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-200 rounded-xl shadow-2xl">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <SelectItem 
                          key={category.value} 
                          value={category.value} 
                          className="text-base font-semibold py-3 cursor-pointer hover:bg-gray-50"
                        >
                          <span className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#8B0000]"></div>
                            <Icon className="w-4 h-4 text-[#8B0000]" />
                            {category.label}
                          </span>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedCategory !== 'all' || searchTerm !== '') && (
              <div className="pt-6 border-t-2 border-gray-200">
                <p className="text-xs font-bold text-[#0A0A0A]/50 uppercase tracking-wider mb-3">
                  {language === 'en' ? 'Active Filters' : 'Filtres actifs'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedCategory !== 'all' && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8B0000]/10 border-2 border-[#8B0000]/30 text-[#8B0000] font-semibold">
                      <Tag className="w-4 h-4" />
                      <span className="text-sm">
                        {categories.find(cat => cat.value === selectedCategory)?.label}
                      </span>
                      <button 
                        onClick={() => setSelectedCategory('all')} 
                        className="hover:bg-[#8B0000] hover:text-white rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                  {searchTerm !== '' && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8B0000]/10 border-2 border-[#8B0000]/30 text-[#8B0000] font-semibold">
                      <Search className="w-4 h-4" />
                      <span className="text-sm">
                        "{searchTerm}"
                      </span>
                      <button 
                        onClick={() => setSearchTerm('')} 
                        className="hover:bg-[#8B0000] hover:text-white rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Organizations Grid */}
        {filteredOrganizations.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredOrganizations.map((org, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden bg-white relative"
                style={{
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
                }}
              >
                {/* Accent Bar — uses each org's own brand color */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-all duration-500 group-hover:h-1.5"
                  style={{ backgroundColor: org.color || '#8B0000' }}
                />

                <CardContent className="p-6 md:p-8">
                  {/* Logo + color swatch */}
                  {org.logo && (
                    <div className="flex items-center justify-center p-4 md:p-5 bg-white rounded-2xl border border-gray-100 mb-5 min-h-[110px] md:min-h-[130px] group-hover:border-gray-200 transition-all shadow-sm">
                      <img
                        src={org.logo}
                        alt={`${org.name} logo`}
                        className="max-h-16 md:max-h-20 max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Organization Name */}
                  <h3
                    className="text-lg md:text-xl font-bold mb-1.5 text-[#0A0A0A] leading-snug transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {language === 'fr' ? org.nameFr : org.name}
                  </h3>

                  {/* Location */}
                  {org.location && (
                    <div className="flex items-center gap-1.5 mb-3 text-gray-400">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="text-xs font-medium">{org.location}</span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed line-clamp-3">
                    {language === 'fr' ? org.descriptionFr : org.description}
                  </p>

                  {/* Services Tags — org's own color */}
                  <div className="mb-5">
                    <div className="flex flex-wrap gap-1.5">
                      {(language === 'fr' ? org.servicesFr : org.services).slice(0, 4).map((service, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-full text-[11px] font-semibold"
                          style={{
                            backgroundColor: (org.color || '#8B0000') + '15',
                            color: org.color || '#8B0000',
                          }}
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                    <Button
                      variant="default"
                      size="lg"
                      className="flex-1 gap-2 bg-[#8B0000] hover:bg-[#7A0000] text-white group/btn transition-all duration-300 text-sm md:text-base"
                      onClick={() => window.open(sanitizeUrl(org.website), '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 flex-shrink-0 transition-transform group-hover/btn:rotate-12" />
                      <span className="truncate">{language === 'en' ? 'Visit Website' : 'Site web'}</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1 gap-2 hover:bg-gray-50 text-sm md:text-base"
                      onClick={() => (window.location.href = `mailto:${org.contact}`)}
                    >
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{language === 'en' ? 'Contact' : 'Contacter'}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl text-[#0A0A0A] mb-3">
              {language === 'en' ? 'No organizations found' : 'Aucune organisation trouvée'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'en' 
                ? 'Try adjusting your search or filter to find what you\'re looking for.'
                : 'Essayez d\'ajuster votre recherche ou votre filtre pour trouver ce que vous cherchez.'}
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-[#8B0000] hover:bg-[#7A0000]"
            >
              {language === 'en' ? 'Clear Filters' : 'Effacer les filtres'}
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <section className="mt-16 relative overflow-hidden rounded-3xl bg-[#8B0000] p-12 md:p-16 text-center shadow-2xl">
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-8 shadow-lg">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl text-white mb-6">
              {language === 'en' ? 'Partner With Us' : 'Devenez Partenaire'}
            </h2>
            <p className="text-white/90 text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
              {language === 'en'
                ? 'Are you a community organization interested in partnering with our research network? We welcome collaborations that advance community health, support newcomers and youth, and promote social well-being.'
                : 'Êtes-vous une organisation communautaire intéressée à devenir partenaire de notre réseau de recherche? Nous accueillons les collaborations qui font progresser la santé communautaire.'}
            </p>
            <Button
              size="lg"
              className="gap-3 bg-white text-[#8B0000] hover:bg-gray-50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg px-8 py-6"
            >
              <Mail className="w-6 h-6" />
              {language === 'en' ? 'Get in Touch' : 'Contactez-nous'}
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}