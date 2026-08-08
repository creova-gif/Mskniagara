import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Search, ChevronDown, ChevronUp, HelpCircle, BookOpen, Users, Mail, Calendar, FileText, X, Filter, Tag } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { motion, AnimatePresence } from 'motion/react';
import { sanitizeSearchQuery as sanitizeSearchInput, escapeRegex as escapeSpecialChars } from '../utils/security';
import { usePageMeta } from '../hooks/usePageMeta';

interface FAQItem {
  id: number | string;
  category: string;
  question: string;
  answer: string;
  icon: React.ReactNode;
}

export function HelpCenter() {
  const { t, language } = useLanguage();
  usePageMeta(
    language === 'en' ? 'Help Center | MSK Niagara' : "Centre d'aide | MSK Niagara",
    language === 'en'
      ? 'Answers to common questions about the MSK Niagara research partnership and this website.'
      : 'Réponses aux questions fréquentes sur le partenariat de recherche MSK Niagara et ce site web.'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openFAQs, setOpenFAQs] = useState<(number | string)[]>([]);

  // FAQ data in both languages
  const faqData: FAQItem[] = language === 'en' ? [
    {
      id: 1,
      category: 'about',
      question: 'What is the MSK Research Partnership?',
      answer: 'Mobilizing Subjugated Knowledges for a Just and Inclusive Niagara is a SSHRC-funded transnational university-community partnership committed to fostering social justice through collaborative research. We bring together 56 team members, leading universities, and 22 community organizations to advance knowledge for newcomer and marginalized communities across our 3 research hubs.',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      id: 2,
      category: 'about',
      question: 'What are the three research hubs?',
      answer: 'Our research is organized into three main hubs: (1) Childhood and Growing Up Hub - focusing on newcomer and racialized children\'s experiences in housing, education, and recreation with 45 members and 1 project, (2) Health Literacy Hub - advancing health literacy for immigrant and refugee populations with 20 members and 1 project, and (3) Identity, Connections and Belonging Hub - exploring identity and belonging among Afro-descendants, LGBTQ+ newcomers, and migrant farmworkers with 26 members and 3 projects.',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      id: 3,
      category: 'about',
      question: 'How many team members and partners do you have?',
      answer: 'We have 56 team members across all three research hubs, including faculty researchers, community leaders, and students from Brock University (lead), University of Toronto (OISE), York University, and University at Buffalo. We also partner with 22 community organizations in the Niagara region.',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 4,
      category: 'research',
      question: 'How can I participate in research studies?',
      answer: 'We welcome community participation in our research! Visit our Research Projects page to see current studies that are actively recruiting participants. You can also contact us directly at contact@msk-niagara.ca to learn about opportunities that match your interests.',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 'research-2',
      category: 'research',
      question: 'What types of research projects do you conduct?',
      answer: 'We conduct 5 active research projects across our hubs focusing on newcomer children\'s experiences, health literacy in immigrant and refugee populations, identity and belonging among Afro-descendant communities, migrant farmworker advocacy, and ICT use among SGD newcomers. All projects use participatory action research methods.',
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 6,
      category: 'community',
      question: 'How can my organization partner with MSK?',
      answer: 'We actively seek partnerships with community organizations, schools, health services, and other institutions. Contact us at contact@msk-niagara.ca to discuss potential collaborations. Visit our Community page to see our current 22 partner organizations.',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 7,
      category: 'community',
      question: 'Do you offer community workshops or presentations?',
      answer: 'Yes! We regularly host community engagement sessions, research presentations, and knowledge dissemination events. Check our Timeline & Events page for upcoming opportunities, or contact us to request a presentation for your organization.',
      icon: <Calendar className="w-5 h-5" />
    },
    {
      id: 8,
      category: 'contact',
      question: 'How do I contact the research team or hub leaders?',
      answer: 'For general inquiries, reach us at contact@msk-niagara.ca or call +1 (905) 688-5550. To contact specific hub leaders: Dr. Rebecca Raby (Childhood Hub) at rraby@brocku.ca, Dr. Joanne Crawford (Health Literacy Hub) at jcrawford@brocku.ca, or Dr. Jean Ntakirutimana (Identity Hub) at jntakirutimana@brocku.ca.',
      icon: <Mail className="w-5 h-5" />
    },
    {
      id: 9,
      category: 'contact',
      question: 'Where can I find publications and research outputs?',
      answer: 'Visit our Knowledge Dissemination page to access our research publications, reports, presentations, and other knowledge mobilization outputs. We are committed to making our research accessible to diverse audiences in multiple languages.',
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 10,
      category: 'events',
      question: 'How can I register for upcoming events?',
      answer: 'Visit our Timeline & Events page to see all upcoming events with registration details. Most events are free and open to the public. Some events may require advance registration due to limited capacity.',
      icon: <Calendar className="w-5 h-5" />
    },
    {
      id: 11,
      category: 'events',
      question: 'Are your events accessible?',
      answer: 'Yes, we are committed to WCAG 2.1 AA accessibility standards. All our events are designed to be inclusive and accessible. If you have specific accessibility needs, please contact us in advance so we can make appropriate arrangements.',
      icon: <Users className="w-5 h-5" />
    }
  ] : [
    {
      id: 1,
      category: 'about',
      question: 'Qu\'est-ce que le partenariat de recherche MSK?',
      answer: 'Mobiliser les savoirs marginalisés pour un Niagara juste et inclusif est un partenariat transnational université-communauté financé par le CRSH engagé à bâtir la justice sociale par la recherche collaborative. Nous réunissons 56 membres d\'équipe, des universités de premier plan et 22 organisations communautaires pour faire progresser les connaissances pour les communautés nouvelles arrivantes et marginalisées à travers nos 3 pôles de recherche.',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      id: 2,
      category: 'about',
      question: 'Quels sont les trois pôles de recherche?',
      answer: 'Notre recherche est organisée en trois pôles principaux: (1) Pôle Enfance et croissance - axé sur les expériences des enfants nouveaux arrivants et racialisés en logement, éducation et loisirs avec 45 membres et 1 projet, (2) Pôle Littératie en santé - faisant progresser la littératie en santé pour les populations immigrantes et réfugiées avec 20 membres et 1 projet, et (3) Pôle Identité, connexions et appartenance - explorant l\'identité et l\'appartenance parmi les Afro-descendants, nouveaux arrivants LGBTQ+ et travailleurs agricoles migrants avec 26 membres et 3 projets.',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      id: 3,
      category: 'about',
      question: 'Combien de membres d\'équipe et de partenaires avez-vous?',
      answer: 'Nous avons 56 membres d\'équipe à travers les trois pôles de recherche, incluant des chercheur·euse·s universitaires, des leaders communautaires et des étudiant·e·s de l\'Université Brock (chef de file), Université de Toronto (OISE), Université York et Université de Buffalo. Nous sommes aussi en partenariat avec 22 organisations communautaires dans la région de Niagara.',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 4,
      category: 'research',
      question: 'Comment puis-je participer aux études de recherche?',
      answer: 'Nous accueillons la participation communautaire à notre recherche! Visitez notre page Projets de recherche pour voir les études en cours qui recrutent activement des participants. Vous pouvez également nous contacter directement à contact@msk-niagara.ca pour connaître les opportunités qui correspondent à vos intérêts.',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 'research-2',
      category: 'research',
      question: 'Quels types de projets de recherche menez-vous?',
      answer: 'Nous menons 5 projets de recherche actifs à travers nos pôles axés sur les expériences des enfants nouveaux arrivants, la littératie en santé dans les populations immigrantes et réfugiées, l\'identité et l\'appartenance parmi les communautés afro-descendantes, la défense des travailleurs agricoles migrants et l\'utilisation des TIC par les nouveaux arrivants DSG. Tous les projets utilisent des méthodes de recherche-action participative.',
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 6,
      category: 'community',
      question: 'Comment mon organisation peut-elle s\'associer avec MSK?',
      answer: 'Nous recherchons activement des partenariats avec des organisations communautaires, des écoles, des services de santé et d\'autres institutions. Contactez-nous à contact@msk-niagara.ca pour discuter de collaborations potentielles. Visitez notre page Communauté pour voir nos 22 organisations partenaires actuelles.',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 7,
      category: 'community',
      question: 'Offrez-vous des ateliers ou présentations communautaires?',
      answer: 'Oui! Nous organisons régulièrement des séances d\'engagement communautaire, des présentations de recherche et des événements de diffusion des connaissances. Consultez notre page Chronologie et événements pour les opportunités à venir, ou contactez-nous pour demander une présentation pour votre organisation.',
      icon: <Calendar className="w-5 h-5" />
    },
    {
      id: 8,
      category: 'contact',
      question: 'Comment contacter l\'équipe de recherche ou les chefs de pôle?',
      answer: 'Pour les demandes générales, contactez-nous à contact@msk-niagara.ca ou appelez au +1 (905) 688-5550. Pour contacter des chefs de pôle spécifiques: Dre Rebecca Raby (Pôle Enfance) à rraby@brocku.ca, Dre Joanne Crawford (Pôle Littératie en santé) à jcrawford@brocku.ca, ou Dr. Jean Ntakirutimana (Pôle Identité) à jntakirutimana@brocku.ca.',
      icon: <Mail className="w-5 h-5" />
    },
    {
      id: 9,
      category: 'contact',
      question: 'Où puis-je trouver les publications et résultats de recherche?',
      answer: 'Visitez notre page Diffusion des connaissances pour accéder à nos publications de recherche, rapports, présentations et autres produits de mobilisation des connaissances. Nous nous engageons à rendre notre recherche accessible à divers publics en plusieurs langues.',
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 10,
      category: 'events',
      question: 'Comment puis-je m\'inscrire aux événements à venir?',
      answer: 'Visitez notre page Chronologie et événements pour voir tous les événements à venir avec les détails d\'inscription. La plupart des événements sont gratuits et ouverts au public. Certains événements peuvent nécessiter une inscription préalable en raison d\'une capacité limitée.',
      icon: <Calendar className="w-5 h-5" />
    },
    {
      id: 11,
      category: 'events',
      question: 'Vos événements sont-ils accessibles?',
      answer: 'Oui, nous nous engageons aux normes d\'accessibilité WCAG 2.1 AA. Tous nos événements sont conçus pour être inclusifs et accessibles. Si vous avez des besoins d\'accessibilité spécifiques, veuillez nous contacter à l\'avance afin que nous puissions prendre les dispositions appropriées.',
      icon: <Users className="w-5 h-5" />
    }
  ];

  // Categories
  const categories = language === 'en' 
    ? [
        { id: 'all', name: 'All Topics', icon: <HelpCircle className="w-4 h-4" /> },
        { id: 'about', name: 'About MSK', icon: <BookOpen className="w-4 h-4" /> },
        { id: 'research', name: 'Research', icon: <FileText className="w-4 h-4" /> },
        { id: 'community', name: 'Community', icon: <Users className="w-4 h-4" /> },
        { id: 'contact', name: 'Contact', icon: <Mail className="w-4 h-4" /> },
        { id: 'events', name: 'Events', icon: <Calendar className="w-4 h-4" /> }
      ]
    : [
        { id: 'all', name: 'Tous les sujets', icon: <HelpCircle className="w-4 h-4" /> },
        { id: 'about', name: 'À propos de MSK', icon: <BookOpen className="w-4 h-4" /> },
        { id: 'research', name: 'Recherche', icon: <FileText className="w-4 h-4" /> },
        { id: 'community', name: 'Communauté', icon: <Users className="w-4 h-4" /> },
        { id: 'contact', name: 'Contact', icon: <Mail className="w-4 h-4" /> },
        { id: 'events', name: 'Événements', icon: <Calendar className="w-4 h-4" /> }
      ];

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    return faqData.filter(faq => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory, faqData]);

  // Toggle FAQ open/close
  const toggleFAQ = (id: number | string) => {
    setOpenFAQs(prev => 
      prev.includes(id) ? prev.filter(faqId => faqId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#CC0000] to-[#6B0000] rounded-2xl mb-6 shadow-xl">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A0A0A] mb-4">
            {language === 'en' ? 'Help Center & FAQ' : 'Centre d\'aide et FAQ'}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            {language === 'en' 
              ? 'Find answers to common questions about our research partnership, projects, and community engagement.'
              : 'Trouvez des réponses aux questions courantes sur notre partenariat de recherche, nos projets et notre engagement communautaire.'}
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              aria-label={language === 'en' ? 'Search for answers' : 'Rechercher des réponses'}
              placeholder={language === 'en' ? 'Search for answers...' : 'Rechercher des réponses...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(sanitizeSearchInput(e.target.value))}
              className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#CC0000] focus:ring-4 focus:ring-[#CC0000]/10 transition-all text-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-[#CC0000] text-gray-600 hover:text-white transition-all duration-300"
                aria-label={language === 'en' ? 'Clear search' : 'Effacer la recherche'}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-2xl border-2 border-gray-100 p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#CC0000] to-[#A40000] flex items-center justify-center shadow-lg">
                <Filter className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-[#0A0A0A] mb-1">
                  {language === 'en' ? 'Filter by Topic' : 'Filtrer par sujet'}
                </h2>
                <p className="text-xs md:text-sm text-[#0A0A0A]/60">
                  {language === 'en' 
                    ? `Showing ${filteredFAQs.length} of ${faqData.length} questions`
                    : `Affichage de ${filteredFAQs.length} sur ${faqData.length} questions`}
                </p>
              </div>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold bg-white border-2 border-[#CC0000]/20 text-[#CC0000] hover:border-[#CC0000] hover:bg-[#CC0000] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm">{language === 'en' ? 'Clear' : 'Effacer'}</span>
                </button>
              )}
            </div>
            
            {/* Dropdown Select */}
            <div className="max-w-md">
              <label className="block text-xs font-bold text-[#0A0A0A]/50 uppercase tracking-wider mb-3">
                <span className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#CC0000]" />
                  {language === 'en' ? 'Topic Category' : 'Catégorie de sujet'}
                </span>
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger
                  aria-label={language === 'en' ? 'Topic Category' : 'Catégorie de sujet'}
                  className="w-full h-14 text-base font-semibold border-2 border-gray-200 hover:border-[#CC0000]/50 focus:border-[#CC0000] bg-white rounded-xl shadow-sm transition-all duration-300"
                >
                  <SelectValue placeholder={language === 'en' ? 'Select a topic...' : 'Sélectionner un sujet...'} />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-gray-200 rounded-xl shadow-2xl">
                  {categories.map((category) => (
                    <SelectItem 
                      key={category.id} 
                      value={category.id} 
                      className="text-base font-semibold py-3 cursor-pointer hover:bg-gray-50"
                    >
                      <span className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#CC0000]"></div>
                        <span className="text-[#CC0000]">{category.icon}</span>
                        {category.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Active Filter Display */}
            {selectedCategory !== 'all' && (
              <div className="mt-6 pt-6 border-t-2 border-gray-200">
                <p className="text-xs font-bold text-[#0A0A0A]/50 uppercase tracking-wider mb-3">
                  {language === 'en' ? 'Active Filter' : 'Filtre actif'}
                </p>
                <div className="flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#CC0000]/10 to-[#A40000]/10 border-2 border-[#CC0000]/30 text-[#CC0000] font-semibold shadow-sm">
                    <Tag className="w-4 h-4" />
                    <span className="text-sm">
                      {categories.find(cat => cat.id === selectedCategory)?.name}
                    </span>
                    <button 
                      onClick={() => setSelectedCategory('all')} 
                      className="hover:bg-[#CC0000] hover:text-white rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* FAQ List */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-start gap-3 sm:gap-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#CC0000]/10 rounded-xl flex items-center justify-center text-[#CC0000] mt-1">
                    {faq.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-[#0A0A0A] mb-1 break-words">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    {openFAQs.includes(faq.id) ? (
                      <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#CC0000]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openFAQs.includes(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 pb-4 sm:pb-5 pl-12 sm:pl-20">
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-500" />
              </div>
              <p className="text-xl text-gray-600">
                {language === 'en' 
                  ? 'No results found. Try a different search term or category.'
                  : 'Aucun résultat trouvé. Essayez un autre terme de recherche ou une autre catégorie.'}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-gradient-to-br from-[#CC0000] to-[#6B0000] rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-[rgb(255,247,247)]">
            {language === 'en' ? 'Still have questions?' : 'Vous avez encore des questions?'}
          </h2>
          <p className="text-lg mb-8 text-white/90">
            {language === 'en' 
              ? 'Our team is here to help. Reach out to us directly.'
              : 'Notre équipe est là pour vous aider. Contactez-nous directement.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@msk-niagara.ca"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#CC0000] rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              <Mail className="w-5 h-5" />
              {language === 'en' ? 'Email Us' : 'Nous écrire'}
            </a>
            <a
              href="tel:+19056885550"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/20 transition-all border-2 border-white/30"
            >
              <span>{language === 'en' ? 'Call Us' : 'Nous appeler'}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}