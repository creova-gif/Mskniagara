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

// Page Components
import { Home } from './pages/Home';
import { Partnership } from './pages/Partnership';
import { ResearchHubs } from './pages/ResearchHubs';
import { HubDetail } from './pages/HubDetail';
import { MemberBios } from './pages/MemberBios';
import { ResearchProjects } from './pages/ResearchProjects';
import { KnowledgeDissemination } from './pages/KnowledgeDissemination';
import { Community } from './pages/Community';
import { Timeline } from './pages/Timeline';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { HelpCenter } from './components/HelpCenter';
import { Media } from './pages/Media';
import { Partners } from './pages/Partners';
import { Donate } from './pages/Donate';

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
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#8B0000] focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-lg"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <Header />
      <Breadcrumbs />
      
      <PageTransition>
        <main id="main-content" className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about/partnership" element={<Partnership />} />
            <Route path="/about/hubs" element={<ResearchHubs />} />
            <Route path="/about/hubs/:hubId" element={<HubDetail />} />
            <Route path="/about/members" element={<MemberBios />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/research/projects" element={<ResearchProjects />} />
            <Route path="/research/knowledge" element={<KnowledgeDissemination />} />
            <Route path="/community" element={<Community />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/media" element={<Media />} />
            <Route path="/donate" element={<Donate />} />
          </Routes>
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