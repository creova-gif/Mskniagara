import { Link } from '../components/LocalizedLink';
import { useLanguage } from '../contexts/LanguageContext';
import { Compass, ArrowRight } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';

export function NotFound() {
  const { language } = useLanguage();
  const en = language === 'en';

  usePageMeta(
    en ? 'Page Not Found | MSK Niagara' : 'Page introuvable | MSK Niagara',
    en
      ? 'The page you were looking for could not be found.'
      : 'La page que vous recherchiez est introuvable.'
  );

  const links = [
    { to: '/', label: en ? 'Home' : 'Accueil' },
    { to: '/about/hubs', label: en ? 'Research Hubs' : 'Pôles de recherche' },
    { to: '/about/members', label: en ? 'Team Members' : 'Membres de l’équipe' },
    { to: '/community', label: en ? 'Community' : 'Communauté' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-[#CC0000] text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white"
          style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 mb-8">
            <Compass className="w-3.5 h-3.5 text-white/90" />
            <span className="text-xs text-white/90 font-semibold tracking-[0.12em] uppercase">
              {en ? '404' : '404'}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl text-white mb-5 font-extrabold tracking-tight leading-none"
            style={{ fontFamily: 'var(--font-heading)' }}>
            {en ? 'Page Not Found' : 'Page introuvable'}
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-xl mx-auto leading-relaxed">
            {en
              ? 'The page you were looking for doesn’t exist, or may have moved.'
              : 'La page que vous recherchiez n’existe pas, ou a peut-être été déplacée.'}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-sm font-semibold tracking-[0.12em] uppercase text-[#6B6B73] mb-6">
          {en ? 'Try one of these instead' : 'Essayez plutôt l’une de ces pages'}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-[#0A0A0A] font-semibold text-sm hover:border-[#CC0000] hover:text-[#CC0000] transition-colors"
            >
              {link.label}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
