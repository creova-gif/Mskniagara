/**
 * Language Context Provider
 * 
 * Provides bilingual support (English/French) throughout the MSK Niagara website.
 * This context manages:
 * - Current language state (English or French)
 * - Language switching functionality with localStorage persistence
 * - Translation function for all UI text
 * - Smooth transition animations
 * 
 * Usage:
 * const { language, setLanguage, t } = useLanguage();
 * 
 * @author MSK Development Team
 * @version 3.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { secureStorage } from '../utils/security';

// Language type: supports English (en) and French (fr)
export type Language = 'en' | 'fr';

// Context interface
interface LanguageContextType {
  language: Language;                    // Current active language
  setLanguage: (lang: Language) => void; // Function to change language
  t: (key: string) => string;            // Translation function
  isTransitioning: boolean;              // Transition state for animations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Translation Dictionary
 * 
 * Contains all bilingual text used throughout the website.
 * Organized by section: navigation, home page, about, research, common terms.
 * 
 * To add new translations:
 * 1. Add key-value pair to 'en' object
 * 2. Add corresponding translation to 'fr' object
 */
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation Menu Items
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.partnership': 'Partnership',
    'nav.hubs': 'Research Hubs & Affiliations',
    'nav.members': 'Member Bios',
    'nav.research': 'Research',
    'nav.projects': 'Research Projects',
    'nav.knowledge': 'Knowledge Dissemination',
    'nav.community': 'Community',
    'nav.organizations': 'Organizations & Partnerships',
    'nav.timeline': 'Timeline & Events',
    'nav.media': 'Media & Documentation',
    
    // Home Page Content
    'home.title': 'MSK Research Partnership',
    'home.subtitle': 'Advancing Community Health and Social Research Through Collaboration',
    'home.welcome': 'Welcome to our research partnership dedicated to advancing knowledge in community health, youth development, and social well-being. Explore our research hubs, projects, and community partnerships.',
    'home.recent_events': 'Recent Events',
    'home.view_all': 'View All',
    
    // About Section
    'about.partnership.title': 'Partnership Overview',
    'about.partnership.desc': 'Our partnership brings together leading researchers, universities, and community organizations to advance musculoskeletal research.',
    'about.objectives.title': 'Research Objectives',
    'about.objectives.desc': 'We aim to conduct innovative research that improves understanding and treatment of musculoskeletal conditions.',
    'about.leadership.title': 'Governance Structure',
    'about.leadership.desc': 'Our governance includes an implementation council, research hub leaders, and community partners.',
    
    // Research Section
    'research.filter': 'Filter by',
    'research.all': 'All',
    'research.active': 'Active/Recruiting',
    'research.completed': 'Completed',
    'research.status': 'Status',
    'research.learn_more': 'Learn More',
    
    // Timeline & Events
    'timeline.partnership': 'Partnership Timeline',
    'timeline.upcoming': 'Upcoming Events',
    'timeline.past': 'Completed',
    'timeline.registration': 'Registration',
    'timeline.register': 'Register Now',
    'timeline.location': 'Location',
    'timeline.participants': 'Participants',
    
    // Common Terms
    'common.loading': 'Loading...',
    'common.read_more': 'Read More',
    'common.contact': 'Contact',
    'common.email': 'Email',
    'common.phone': 'Phone',
    'common.open': 'Open',
    'common.upcoming': 'Upcoming',
  },
  fr: {
    // Éléments du menu de navigation
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.partnership': 'Partenariat',
    'nav.hubs': 'Pôles de recherche et affiliations',
    'nav.members': 'Biographies des membres',
    'nav.research': 'Recherche',
    'nav.projects': 'Projets de recherche',
    'nav.knowledge': 'Diffusion des connaissances',
    'nav.community': 'Communauté',
    'nav.organizations': 'Organisations et partenariats',
    'nav.timeline': 'Chronologie et événements',
    'nav.media': 'Médias et documentation',
    
    // Contenu de la page d'accueil
    'home.title': 'Partenariat de recherche MSK',
    'home.subtitle': 'Faire progresser la recherche en santé communautaire et sociale par la collaboration',
    'home.welcome': 'Bienvenue dans notre partenariat de recherche dédié à l\'avancement des connaissances en santé communautaire, développement des jeunes et bien-être social. Explorez nos pôles de recherche, nos projets et nos partenariats communautaires.',
    'home.recent_events': 'Événements récents',
    'home.view_all': 'Voir tout',
    
    // Section À propos
    'about.partnership.title': 'Aperçu du partenariat',
    'about.partnership.desc': 'Notre partenariat réunit des chercheurs de premier plan, des universités et des organisations communautaires pour faire progresser la recherche musculosquelettique.',
    'about.objectives.title': 'Objectifs de recherche',
    'about.objectives.desc': 'Nous visons à mener des recherches innovantes qui améliorent la compréhension et le traitement des affections musculosquelettiques.',
    'about.leadership.title': 'Structure de gouvernance',
    'about.leadership.desc': 'Notre gouvernance comprend un conseil de mise en œuvre, des responsables de pôles de recherche et des partenaires communautaires.',
    
    // Section Recherche
    'research.filter': 'Filtrer par',
    'research.all': 'Tous',
    'research.active': 'Actif/Recrutement',
    'research.completed': 'Terminé',
    'research.status': 'Statut',
    'research.learn_more': 'En savoir plus',
    
    // Chronologie et événements
    'timeline.partnership': 'Chronologie du partenariat',
    'timeline.upcoming': 'Événements à venir',
    'timeline.past': 'Terminé',
    'timeline.registration': 'Inscription',
    'timeline.register': 'S\'inscrire maintenant',
    'timeline.location': 'Lieu',
    'timeline.participants': 'Participants',
    
    // Termes communs
    'common.loading': 'Chargement...',
    'common.read_more': 'Lire la suite',
    'common.contact': 'Contact',
    'common.email': 'Courriel',
    'common.phone': 'Téléphone',
    'common.open': 'Ouvert',
    'common.upcoming': 'À venir',
  },
};

/**
 * Language Provider Component
 * 
 * Wraps the entire application to provide language context.
 * Manages language state, localStorage persistence, and provides translation function.
 * 
 * @param children - React components that need access to language context
 */
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize language from localStorage or default to English
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = secureStorage.getItem('msk-language') as Language;
      return savedLanguage === 'fr' ? 'fr' : 'en';
    }
    return 'en';
  });
  
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Keep the document's lang attribute in sync — required for screen readers
  // to apply correct pronunciation rules (WCAG 3.1.1 Language of Page).
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  /**
   * Enhanced setLanguage with persistence and transition animation
   */
  const setLanguage = (lang: Language) => {
    setIsTransitioning(true);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      secureStorage.setItem('msk-language', lang);
    }
    
    // Small delay for smooth transition
    setTimeout(() => {
      setLanguageState(lang);
      setTimeout(() => setIsTransitioning(false), 150);
    }, 150);
  };

  /**
   * Translation Function
   * 
   * Retrieves the translated text for a given key in the current language.
   * Falls back to the key itself if translation is not found.
   * 
   * @param key - Translation key (e.g., 'nav.home')
   * @returns Translated string in current language
   */
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isTransitioning }}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Language Context Hook
 * 
 * Custom hook to access language context in any component.
 * Must be used within a LanguageProvider.
 * 
 * @throws Error if used outside of LanguageProvider
 * @returns Language context with current language, setter, and translation function
 * 
 * @example
 * const { language, setLanguage, t } = useLanguage();
 * const title = t('nav.home'); // Returns 'Home' or 'Accueil'
 */
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};