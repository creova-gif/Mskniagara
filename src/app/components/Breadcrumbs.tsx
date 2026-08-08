import { Link, useLocation } from 'react-router';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Breadcrumbs() {
  const location = useLocation();
  const { t, language } = useLanguage();
  
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) {
    return null;
  }

  const getBreadcrumbName = (path: string) => {
    const breadcrumbMap: Record<string, { en: string; fr: string }> = {
      'about': { en: 'About', fr: 'À propos' },
      'partnership': { en: 'Partnership', fr: 'Partenariat' },
      'hubs': { en: 'Research Hubs', fr: 'Pôles de recherche' },
      'members': { en: 'Team Members', fr: 'Membres de l\'équipe' },
      'research': { en: 'Research', fr: 'Recherche' },
      'projects': { en: 'Projects', fr: 'Projets' },
      'knowledge': { en: 'Knowledge Dissemination', fr: 'Diffusion des connaissances' },
      'community': { en: 'Community', fr: 'Communauté' },
      'timeline': { en: 'Timeline', fr: 'Chronologie' },
      'media': { en: 'Media', fr: 'Médias' },
      'childhood': { en: 'Childhood and Growing Up', fr: 'Enfance et développement' },
      'health': { en: 'Health Literacy', fr: 'Littératie en santé' },
      'identity': { en: 'Identity & Belonging', fr: 'Identité et appartenance' },
      'privacy-policy': { en: 'Privacy Policy', fr: 'Politique de confidentialité' },
      'help': { en: 'Help', fr: 'Aide' },
    };
    
    return breadcrumbMap[path]?.[language] || path;
  };

  // Category labels that don't have their own pages
  const categoryLabels = ['about', 'research'];

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link 
              to="/" 
              className="flex items-center gap-1.5 text-[#0A0A0A]/70 hover:text-[#CC0000] transition-colors group"
            >
              <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">{language === 'en' ? 'Home' : 'Accueil'}</span>
            </Link>
          </li>
          
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const isCategory = categoryLabels.includes(value);
            
            return (
              <li key={to} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-gray-500" />
                {isLast ? (
                  <span className="font-medium text-[#CC0000]">
                    {getBreadcrumbName(value)}
                  </span>
                ) : isCategory ? (
                  <span className="text-[#0A0A0A]/70">
                    {getBreadcrumbName(value)}
                  </span>
                ) : (
                  <Link 
                    to={to} 
                    className="text-[#0A0A0A]/70 hover:text-[#CC0000] transition-colors hover:underline"
                  >
                    {getBreadcrumbName(value)}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}