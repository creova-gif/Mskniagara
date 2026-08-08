import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ExternalLink, Mail, MapPin, Heart, Users, Building2, Search, Filter, X, Tag } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useMemo, useState } from 'react';
import { RippleRings } from '../components/HeroAnimations';
import { sanitizeEmail, sanitizeSearchQuery, sanitizeUrl } from '../utils/security';
import { usePageMeta } from '../hooks/usePageMeta';
import { useSanityQuery } from '../../lib/sanity/useSanityQuery';
import { communityPartnersQuery, type CommunityPartner } from '../../lib/sanity/queries/communityPartner';
import { urlForImage } from '../../lib/sanity/image';

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

  const { data: rawOrganizations } = useSanityQuery<CommunityPartner[]>(communityPartnersQuery);
  const organizations = useMemo(
    () =>
      (rawOrganizations ?? []).map((org) => ({
        name: org.name.en,
        nameFr: org.name.fr,
        description: org.description?.en ?? '',
        descriptionFr: org.description?.fr ?? '',
        services: (org.services ?? []).map((s) => s.en),
        servicesFr: (org.services ?? []).map((s) => s.fr),
        website: org.website ?? '#',
        contact: org.contact ?? '',
        category: org.category ?? '',
        location: org.location ?? '',
        logo: urlForImage(org.logo)?.width(300).url(),
        color: org.color,
      })),
    [rawOrganizations]
  );


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
      <div className="relative overflow-hidden bg-[#CC0000]">
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
                {language === 'en'
                  ? `${organizations.length} Community Organizations`
                  : `${organizations.length} Organisations communautaires`}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl text-white font-extrabold mb-6 tracking-tight"
              style={{ fontFamily: 'var(--font-heading)', animation: 'fade-in-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}>
              {language === 'en' ? 'Community' : 'Communauté'}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4"
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
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#CC0000] to-[#A40000] flex items-center justify-center shadow-lg">
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
                  className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold bg-white border-2 border-[#CC0000]/20 text-[#CC0000] hover:border-[#CC0000] hover:bg-[#CC0000] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
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
                <label htmlFor="community-search" className="block text-xs font-bold text-[#0A0A0A]/50 uppercase tracking-wider mb-3">
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-[#CC0000]" />
                    {language === 'en' ? 'Search Organizations' : 'Rechercher des organisations'}
                  </span>
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    id="community-search"
                    type="text"
                    placeholder={language === 'en' ? 'Enter organization name...' : 'Entrez le nom de l\'organisation...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(sanitizeSearchQuery(e.target.value))}
                    className="w-full h-14 pl-12 pr-12 text-base font-semibold border-2 border-gray-200 hover:border-[#CC0000]/50 focus:border-[#CC0000] focus:outline-none focus:ring-4 focus:ring-[#CC0000]/10 bg-white rounded-xl shadow-sm transition-all duration-300"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-[#CC0000] text-gray-600 hover:text-white transition-all duration-300"
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
                    <Tag className="w-4 h-4 text-[#CC0000]" />
                    {language === 'en' ? 'Category' : 'Catégorie'}
                  </span>
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger
                    aria-label={language === 'en' ? 'Category' : 'Catégorie'}
                    className="w-full h-14 text-base font-semibold border-2 border-gray-200 hover:border-[#CC0000]/50 focus:border-[#CC0000] bg-white rounded-xl shadow-sm transition-all duration-300"
                  >
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
                            <div className="w-2 h-2 rounded-full bg-[#CC0000]"></div>
                            <Icon className="w-4 h-4 text-[#CC0000]" />
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#CC0000]/10 border-2 border-[#CC0000]/30 text-[#CC0000] font-semibold">
                      <Tag className="w-4 h-4" />
                      <span className="text-sm">
                        {categories.find(cat => cat.value === selectedCategory)?.label}
                      </span>
                      <button 
                        onClick={() => setSelectedCategory('all')} 
                        className="hover:bg-[#CC0000] hover:text-white rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                  {searchTerm !== '' && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#CC0000]/10 border-2 border-[#CC0000]/30 text-[#CC0000] font-semibold">
                      <Search className="w-4 h-4" />
                      <span className="text-sm">
                        "{searchTerm}"
                      </span>
                      <button 
                        onClick={() => setSearchTerm('')} 
                        className="hover:bg-[#CC0000] hover:text-white rounded-full p-0.5 transition-colors"
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
                  style={{ backgroundColor: org.color || '#CC0000' }}
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
                    <div className="flex items-center gap-1.5 mb-3 text-gray-500">
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
                            backgroundColor: (org.color || '#CC0000') + '15',
                            color: org.color || '#CC0000',
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
                      className="flex-1 gap-2 bg-[#CC0000] hover:bg-[#800000] text-white group/btn transition-all duration-300 text-sm md:text-base"
                      onClick={() => window.open(sanitizeUrl(org.website), '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 flex-shrink-0 transition-transform group-hover/btn:rotate-12" />
                      <span className="truncate">{language === 'en' ? 'Visit Website' : 'Site web'}</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1 gap-2 hover:bg-gray-50 text-sm md:text-base"
                      onClick={() => (window.location.href = `mailto:${sanitizeEmail(org.contact)}`)}
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
              <Search className="w-12 h-12 text-gray-500" />
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
              className="bg-[#CC0000] hover:bg-[#800000]"
            >
              {language === 'en' ? 'Clear Filters' : 'Effacer les filtres'}
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <section className="mt-16 relative overflow-hidden rounded-3xl bg-[#CC0000] p-12 md:p-16 text-center shadow-2xl">
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
              className="gap-3 bg-white text-[#CC0000] hover:bg-gray-50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg px-8 py-6"
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