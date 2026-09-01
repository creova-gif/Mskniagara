import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { ChatWidget } from './components/ChatWidget';
import { Breadcrumbs } from './components/Breadcrumbs';
import { PageTransition } from './components/PageTransition';
import { ScrollToTop } from './components/ScrollToTop';

import { Suspense, lazy, type ReactElement } from 'react';
import { PageLoader } from './components/PageLoader';

// Page Components (Lazy Loaded)
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Partnership = lazy(() => import('./pages/Partnership').then(m => ({ default: m.Partnership })));
const ResearchHubs = lazy(() => import('./pages/ResearchHubs').then(m => ({ default: m.ResearchHubs })));
const HubDetail = lazy(() => import('./pages/HubDetail').then(m => ({ default: m.HubDetail })));
const MemberBios = lazy(() => import('./pages/MemberBios').then(m => ({ default: m.MemberBios })));
const ResearchProjects = lazy(() => import('./pages/ResearchProjects').then(m => ({ default: m.ResearchProjects })));
const KnowledgeDissemination = lazy(() => import('./pages/KnowledgeDissemination').then(m => ({ default: m.KnowledgeDissemination })));
const Community = lazy(() => import('./pages/Community').then(m => ({ default: m.Community })));
const Timeline = lazy(() => import('./pages/Timeline').then(m => ({ default: m.Timeline })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const HelpCenter = lazy(() => import('./components/HelpCenter').then(m => ({ default: m.HelpCenter })));
const Media = lazy(() => import('./pages/Media').then(m => ({ default: m.Media })));
const Partners = lazy(() => import('./pages/Partners').then(m => ({ default: m.Partners })));
const Donate = lazy(() => import('./pages/Donate').then(m => ({ default: m.Donate })));
const StudioRedirect = lazy(() => import('./pages/StudioRedirect').then(m => ({ default: m.StudioRedirect })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

// Every content route exists at a bare English path AND, mirrored, under a
// `/fr` prefix — both are real, independently indexable, crawlable URLs (see
// usePageMeta's hreflang tags and sitemap.xml). This is the single list of
// routes both namespaces are generated from; /studio and the 404 catch-all
// are deliberately outside it (see below).
const CONTENT_ROUTES: { path: string; element: ReactElement }[] = [
  { path: '/', element: <Home /> },
  { path: '/about/partnership', element: <Partnership /> },
  { path: '/about/hubs', element: <ResearchHubs /> },
  { path: '/about/hubs/:hubId', element: <HubDetail /> },
  { path: '/about/members', element: <MemberBios /> },
  { path: '/partners', element: <Partners /> },
  { path: '/research/projects', element: <ResearchProjects /> },
  { path: '/research/knowledge', element: <KnowledgeDissemination /> },
  { path: '/community', element: <Community /> },
  { path: '/timeline', element: <Timeline /> },
  { path: '/privacy-policy', element: <PrivacyPolicy /> },
  { path: '/help', element: <HelpCenter /> },
  { path: '/media', element: <Media /> },
  { path: '/donate', element: <Donate /> },
];

/**
 * App Content Component
 * Wraps app content with language transition effect
 */
function AppContent() {
  const { isTransitioning } = useLanguage();
  
  return (
    <div className={`min-h-screen flex flex-col bg-white transition-opacity duration-150 ${isTransitioning ? 'opacity-70' : 'opacity-100'}`}>
      {/* Skip to main content — WCAG 2.1 AA accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#CC0000] focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-lg"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <Header />
      <Breadcrumbs />
      
      <PageTransition>
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {CONTENT_ROUTES.map(({ path, element }) => (
                <Route key={`en:${path}`} path={path} element={element} />
              ))}
              {CONTENT_ROUTES.map(({ path, element }) => (
                <Route key={`fr:${path}`} path={path === '/' ? '/fr' : `/fr${path}`} element={element} />
              ))}
              <Route path="/studio" element={<StudioRedirect />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </PageTransition>
      
      <Footer />
      <Chatbot />
      <ChatWidget />
    </div>
  );
}

/**
 * App Component
 * Main application entry point for MSK Partnership website
 * Enhanced with seamless page transitions and smooth animations
 * Protected by Error Boundary for resilience
 */
export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </Router>
    </ErrorBoundary>
  );
}