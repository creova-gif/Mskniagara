import { Link } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

const sshrcLogo = '/c9c77bb67634af21353fb8f536aed3347c90330c.png';
const brockLogo = '/6a2d35fb10f25faa07b97ffff38a76f184734ae4.png';

export function Footer() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0A] text-white">
      {/* Top crimson rule */}
      <div className="h-px bg-[#CC0000]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Main grid */}
        <div className="grid grid-cols-12 gap-x-8 gap-y-12 py-16 border-b border-white/8">

          {/* Brand column */}
          <div className="col-span-12 md:col-span-5">
            {/* Logo mark */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-[#CC0000] rounded flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <rect x="4" y="16" width="4" height="4" fill="white" />
                  <rect x="10" y="10" width="4" height="10" fill="white" />
                  <rect x="16" y="4" width="4" height="16" fill="white" />
                </svg>
              </div>
              <div>
                <div className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/60 leading-none mb-0.5">
                  MSK · Niagara
                </div>
                <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/50 leading-none">
                  Research Partnership
                </div>
              </div>
            </div>

            <p className="text-sm text-white/60 leading-relaxed max-w-xs mb-8">
              {language === 'en'
                ? 'A transnational, university-community partnership committed to fostering social justice through collaborative research.'
                : 'Un partenariat transnational université-communauté engagé à bâtir la justice sociale par la recherche collaborative.'}
            </p>

            {/* Contact block */}
            <div className="space-y-2 text-xs text-white/50">
              <div>Brock University — 1812 Sir Isaac Brock Way, St. Catharines ON L2S 3A1</div>
              <div className="flex items-center gap-4">
                <a href="mailto:contact@msk-niagara.ca"
                  className="hover:text-white transition-colors">
                  contact@msk-niagara.ca
                </a>
                <span className="text-white/20">·</span>
                <a href="tel:+19056885550"
                  className="hover:text-white transition-colors">
                  +1 (905) 688-5550
                </a>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* About links */}
          <div className="col-span-6 md:col-span-3">
            <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/60 mb-5">
              {t('nav.about')}
            </div>
            <ul className="space-y-3">
              {[
                { to: '/donate', label: language === 'en' ? 'Support Us' : 'Nous Soutenir' },
                { to: '/about/partnership', label: t('nav.partnership') },
                { to: '/about/hubs', label: t('nav.hubs') },
                { to: '/about/members', label: t('nav.members') },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to}
                    className="text-sm text-white/55 hover:text-white transition-colors duration-150">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Research links */}
          <div className="col-span-6 md:col-span-3">
            <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/60 mb-5">
              {t('nav.research')}
            </div>
            <ul className="space-y-3">
              {[
                { to: '/research/projects', label: t('nav.projects') },
                { to: '/research/knowledge', label: t('nav.knowledge') },
                { to: '/community', label: t('nav.community') },
                { to: '/timeline', label: t('nav.timeline') },
                { to: '/media', label: t('nav.media') },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to}
                    className="text-sm text-white/55 hover:text-white transition-colors duration-150">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Acknowledgments — two-column horizontal layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 py-10 border-b border-white/8">
          {/* Land Acknowledgment */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-px bg-[#CC0000]" />
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/60">
                {language === 'en' ? 'Land Acknowledgment' : 'Reconnaissance territoriale'}
              </span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              {language === 'en'
                ? 'Brock University is situated on the traditional territory of the Haudenosaunee and Anishinaabe peoples, many of whom continue to live and work here today. This territory is covered by the Upper Canada Treaties and is within the land protected by the Dish with One Spoon Wampum Agreement. We acknowledge the enduring presence and deep traditional knowledge, laws, and resources of Indigenous peoples, and are grateful to have the opportunity to work in this territory.'
                : "L'Université Brock est située sur le territoire traditionnel des peuples Haudenosaunee et Anishinaabe, dont beaucoup continuent de vivre et de travailler ici aujourd'hui. Ce territoire est couvert par les traités du Haut-Canada et se trouve sur le territoire protégé par l'accord de wampum du plat à une cuillère. Nous reconnaissons la présence durable et les connaissances traditionnelles profondes, les lois et les ressources des peuples autochtones, et nous sommes reconnaissants d'avoir l'occasion de travailler sur ce territoire."}
            </p>
          </div>

          {/* Funding Acknowledgment */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-px bg-[#CC0000]" />
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/60">
                {language === 'en' ? 'Funding Acknowledgment' : 'Reconnaissance du financement'}
              </span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed mb-5">
              {language === 'en'
                ? 'Funded by the SSHRC Partnership Grant, the John R. Evans Leaders Fund of the Canada Foundation for Innovation (CFI), the Social Justice Research Institute (SJRI), and supported by Brock University.'
                : 'Financé par la subvention de partenariat du CRSH, le Fonds des leaders John-R.-Evans de la FCI, l\'IRJS, et soutenu par l\'Université Brock.'}
            </p>
            <div className="flex items-center gap-5">
              <img src={sshrcLogo} alt="SSHRC"
                className="h-8 w-auto object-contain opacity-50 hover:opacity-80 transition-opacity" />
              <img src={brockLogo} alt="Brock SJRI"
                className="h-8 w-auto object-contain opacity-50 hover:opacity-80 transition-opacity" />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6">
          <div className="flex items-center gap-6 text-xs text-white/50">
            <span>&copy; {currentYear} MSK Research Partnership</span>
            <span className="hidden sm:inline text-white/15">·</span>
            <Link to="/privacy-policy"
              className="hover:text-white/60 transition-colors">
              {language === 'en' ? 'Privacy Policy' : 'Politique de confidentialité'}
            </Link>
            <span className="hidden sm:inline text-white/15">·</span>
            <Link to="/help"
              className="hover:text-white/60 transition-colors">
              {language === 'en' ? 'Help & FAQ' : "Aide et FAQ"}
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/70 transition-colors group"
            aria-label="Back to top"
          >
            <span>{language === 'en' ? 'Back to top' : 'Retour en haut'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
