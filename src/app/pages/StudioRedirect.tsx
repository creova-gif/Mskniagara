import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * The Sanity Studio is a separate, self-contained app (see /studio in the
 * repo) deployed to Sanity's own hosting. This route just gives editors one
 * memorable URL on the main site to reach it, rather than needing to
 * remember a separate *.sanity.studio address.
 */
export function StudioRedirect() {
  const { language } = useLanguage();
  const studioUrl = import.meta.env.VITE_SANITY_STUDIO_URL as string | undefined;

  useEffect(() => {
    if (studioUrl) {
      window.location.href = studioUrl;
    }
  }, [studioUrl]);

  if (studioUrl) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
        <p className="text-gray-500">
          {language === 'en' ? 'Redirecting to the content editor…' : 'Redirection vers l\'éditeur de contenu…'}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
      <div className="max-w-md">
        <h1 className="text-2xl font-bold text-[#0A0A0A] mb-3">
          {language === 'en' ? 'Content editor not yet configured' : "Éditeur de contenu pas encore configuré"}
        </h1>
        <p className="text-gray-500">
          {language === 'en'
            ? 'Set VITE_SANITY_STUDIO_URL once the Sanity Studio has been deployed.'
            : "Configurez VITE_SANITY_STUDIO_URL une fois le Studio Sanity déployé."}
        </p>
      </div>
    </div>
  );
}
