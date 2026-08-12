import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Heart, ShieldCheck, ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardDescription } from '../components/ui/card';
import { TimelineBeam } from '../components/HeroAnimations';
import { usePageMeta } from '../hooks/usePageMeta';

export function Donate() {
  const { language, t } = useLanguage();
  usePageMeta(
    language === 'en' ? 'Donate | MSK Niagara' : 'Faire un don | MSK Niagara',
    language === 'en'
      ? 'Support community-based participatory research for a just and inclusive Niagara region.'
      : 'Soutenez la recherche participative communautaire pour une région de Niagara juste et inclusive.'
  );
  const [amount, setAmount] = useState<number | 'custom'>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [fund, setFund] = useState('general');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const firstName = (form.elements.namedItem('firstName') as HTMLInputElement)?.value || '';
    const lastName = (form.elements.namedItem('lastName') as HTMLInputElement)?.value || '';
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value || '';
    const amt = amount === 'custom' ? customAmount : String(amount);
    const subject = encodeURIComponent(`Donation Inquiry — $${amt} to MSK Niagara`);
    const body = encodeURIComponent(
      `Hello MSK Partnership Office,\n\nI would like to make a donation of $${amt} CAD to the ${
        fund === 'general' ? 'General Research Fund' :
        fund === 'childhood' ? 'Childhood & Growing Up Hub' :
        fund === 'health' ? 'Health Literacy Hub' : 'Identity, Connections & Belonging Hub'
      }.\n\nName: ${firstName} ${lastName}\nEmail: ${email}\n\nPlease let me know the next steps.\n\nThank you,\n${firstName}`
    );
    window.location.href = `mailto:contact@msk-niagara.ca?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const finalAmount = amount === 'custom' ? customAmount : amount;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
          <div className="w-24 h-24 bg-[#CC0000]/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Heart className="w-12 h-12 text-[#CC0000]" fill="#CC0000" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            {language === 'en' ? 'Thank You for Your Interest' : 'Merci de votre intérêt'}
          </h1>
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {language === 'en'
              ? 'Your email client has been opened with a pre-filled donation inquiry. Please send the email to connect with our partnership office — they will confirm next steps and payment options.'
              : 'Votre client de messagerie a été ouvert avec une demande de don pré-remplie. Veuillez envoyer le courriel pour contacter notre bureau de partenariat.'}
          </p>
          <p className="text-sm text-gray-400 mb-8">
            {language === 'en' ? 'If your email client did not open, please contact us directly at ' : 'Si votre client de messagerie ne s\'est pas ouvert, contactez-nous directement à '}
            <a href="mailto:contact@msk-niagara.ca" className="text-[#CC0000] hover:underline font-semibold">contact@msk-niagara.ca</a>
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-8 py-4 bg-[#0A0A0A] text-white rounded-xl font-semibold hover:bg-[#1A1A1A] transition-colors"
          >
            {language === 'en' ? 'Start a new inquiry' : 'Nouvelle demande de don'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Premium Hero Section */}
      <div className="relative bg-[#0A0A0A] text-white overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#CC0000] via-transparent to-transparent" />
        <TimelineBeam />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-md">
            <Heart className="w-4 h-4 text-[#CC0000] fill-[#CC0000]" />
            <span className="text-xs font-bold tracking-widest uppercase text-white">
              {language === 'en' ? 'Support Our Work' : 'Soutenez notre travail'}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {language === 'en' ? 'Invest in a Just Niagara' : 'Investissez dans un Niagara juste'}
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            {language === 'en'
              ? 'Your contribution empowers marginalized voices, funds essential research, and drives systemic change across our community.'
              : 'Votre contribution donne du pouvoir aux voix marginalisées, finance la recherche essentielle et stimule le changement systémique dans notre communauté.'}
          </p>
        </div>
      </div>

      {/* Main Donation Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          
          {/* Donation Form */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="h-2 bg-[#CC0000]" />
            <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-10">
              
              {/* Step 1: Fund Designation */}
              <section>
                <h2 className="text-xl font-semibold text-[#0A0A0A] mb-4 flex items-center gap-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  <span className="w-8 h-8 rounded-full bg-[#CC0000]/10 text-[#CC0000] flex items-center justify-center text-sm font-bold">1</span>
                  {language === 'en' ? 'Select a Fund' : 'Sélectionnez un fonds'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'general', label: language === 'en' ? 'General Research Fund (Area of greatest need)' : 'Fonds de recherche général' },
                    { id: 'childhood', label: language === 'en' ? 'Childhood & Growing Up Hub' : 'Pôle Enfance et croissance' },
                    { id: 'health', label: language === 'en' ? 'Health Literacy Hub' : 'Pôle Littératie en santé' },
                    { id: 'identity', label: language === 'en' ? 'Identity & Belonging Hub' : 'Pôle Identité et appartenance' },
                  ].map(f => (
                    <label key={f.id} className={`
                      relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                      ${fund === f.id ? 'border-[#CC0000] bg-[#CC0000]/5' : 'border-gray-100 hover:border-gray-200'}
                    `}>
                      <input 
                        type="radio" 
                        name="fund" 
                        value={f.id} 
                        checked={fund === f.id} 
                        onChange={() => setFund(f.id)}
                        className="sr-only" 
                      />
                      <span className={`block font-medium ${fund === f.id ? 'text-[#CC0000]' : 'text-gray-700'}`}>
                        {f.label}
                      </span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Step 2: Amount */}
              <section>
                <h2 className="text-xl font-semibold text-[#0A0A0A] mb-4 flex items-center gap-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  <span className="w-8 h-8 rounded-full bg-[#CC0000]/10 text-[#CC0000] flex items-center justify-center text-sm font-bold">2</span>
                  {language === 'en' ? 'Choose Amount' : 'Choisissez le montant'}
                </h2>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
                  {[25, 50, 100, 250].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAmount(val)}
                      className={`py-4 rounded-xl border-2 font-bold text-lg transition-all ${
                        amount === val 
                          ? 'border-[#CC0000] bg-[#CC0000] text-white shadow-md transform scale-[1.02]' 
                          : 'border-gray-200 text-gray-700 hover:border-gray-300 bg-white'
                      }`}
                    >
                      ${val}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setAmount('custom')}
                    className={`py-4 rounded-xl border-2 font-semibold text-sm transition-all ${
                      amount === 'custom'
                        ? 'border-[#CC0000] bg-[#CC0000]/10 text-[#CC0000]'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
                    }`}
                  >
                    {language === 'en' ? 'Custom' : 'Autre'}
                  </button>
                </div>

                {amount === 'custom' && (
                  <div className="relative max-w-xs animate-fade-in-up">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                    <input
                      type="number"
                      min="5"
                      placeholder="0.00"
                      required
                      aria-label={language === 'en' ? 'Custom donation amount' : 'Montant de don personnalisé'}
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-[#CC0000] focus:ring-4 focus:ring-[#CC0000]/20 focus:outline-none text-lg font-bold"
                    />
                  </div>
                )}
              </section>

              {/* Step 3: Contact Details */}
              <section>
                <h2 className="text-xl font-semibold text-[#0A0A0A] mb-4 flex items-center gap-3" style={{ fontFamily: 'var(--font-heading)' }}>
                  <span className="w-8 h-8 rounded-full bg-[#CC0000]/10 text-[#CC0000] flex items-center justify-center text-sm font-bold">3</span>
                  {language === 'en' ? 'Your Details' : 'Vos coordonnées'}
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input name="firstName" type="text" aria-label={language === 'en' ? 'First Name' : 'Prénom'} placeholder={language === 'en' ? 'First Name' : 'Prénom'} required className="w-full p-4 rounded-xl border border-gray-200 focus:border-[#CC0000] focus:ring-1 focus:ring-[#CC0000] outline-none transition-all" />
                    <input name="lastName" type="text" aria-label={language === 'en' ? 'Last Name' : 'Nom de famille'} placeholder={language === 'en' ? 'Last Name' : 'Nom de famille'} required className="w-full p-4 rounded-xl border border-gray-200 focus:border-[#CC0000] focus:ring-1 focus:ring-[#CC0000] outline-none transition-all" />
                  </div>
                  <input name="email" type="email" aria-label={language === 'en' ? 'Email Address' : 'Adresse courriel'} placeholder={language === 'en' ? 'Email Address' : 'Adresse courriel'} required className="w-full p-4 rounded-xl border border-gray-200 focus:border-[#CC0000] focus:ring-1 focus:ring-[#CC0000] outline-none transition-all" />

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 mt-2">
                    <span className="text-amber-600 text-lg">&#9432;</span>
                    <p className="text-sm text-amber-800 leading-relaxed">
                      {language === 'en'
                        ? 'Online payment is being set up. Clicking the button below will open your email client with a pre-filled donation inquiry to our team, who will confirm payment options.'
                        : 'Le paiement en ligne est en cours de configuration. En cliquant ci-dessous, votre client de messagerie s\'ouvrira avec une demande pré-remplie.'}
                    </p>
                  </div>
                </div>
              </section>

              <button
                type="submit"
                className="w-full py-5 bg-[#CC0000] text-white rounded-xl font-bold text-lg hover:bg-[#DA0C0C] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                {language === 'en'
                  ? `Send Donation Inquiry — $${finalAmount || '0'} CAD`
                  : `Envoyer ma demande de don — ${finalAmount || '0'}$ CAD`}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-center text-xs text-gray-500 mt-4">
                {language === 'en'
                  ? 'MSK Niagara is supported by Brock University. Our team will contact you to confirm your donation and provide tax receipt information.'
                  : 'MSK Niagara est soutenu par l\'Université Brock. Notre équipe vous contactera pour confirmer votre don et fournir des renseignements sur les reçus fiscaux.'}
              </p>
            </form>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-[#0A0A0A] text-white overflow-hidden">
              <div className="h-40 w-full overflow-hidden relative">
                <img 
                  src="/media/donate-community-support.jpg"
                  alt={language === 'en' ? 'Community connection and support' : 'Connexion communautaire et soutien'}
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent"></div>
              </div>
              <CardHeader className="pt-4">
                <ShieldCheck className="w-8 h-8 text-[#CC0000] mb-2" />
                <h3 className="text-xl leading-none" data-slot="card-title" style={{ fontFamily: 'var(--font-heading)' }}>
                  {language === 'en' ? 'Why Support Us?' : 'Pourquoi nous soutenir ?'}
                </h3>
              </CardHeader>
              <CardContent className="space-y-4 text-white/70 text-sm leading-relaxed">
                <p>
                  {language === 'en'
                    ? 'Your donations directly fund community-based participatory research. Unlike traditional academic studies, our funds flow directly into the community to empower marginalized voices.'
                    : 'Vos dons financent directement la recherche participative communautaire. Contrairement aux études universitaires traditionnelles, nos fonds sont versés directement à la communauté.'}
                </p>
                <ul className="space-y-2 mt-4 border-t border-white/10 pt-4">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#CC0000] shrink-0" />
                    <span>{language === 'en' ? '100% transparent funding' : 'Financement 100% transparent'}</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#CC0000] shrink-0" />
                    <span>{language === 'en' ? 'Direct support to community partners' : 'Soutien direct aux partenaires communautaires'}</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#CC0000] shrink-0" />
                    <span>{language === 'en' ? 'SSHRC matched initiatives' : 'Initiatives jumelées au CRSH'}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2 text-base">
                {language === 'en' ? 'Other ways to give' : 'Autres façons de donner'}
              </h3>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                {language === 'en' 
                  ? 'Interested in corporate matching, endowments, or volunteering your time instead?'
                  : 'Vous êtes intéressé par les dons d\'entreprise, les fondations ou le bénévolat ?'}
              </p>
              <a href="mailto:contact@msk-niagara.ca" className="text-[#CC0000] text-sm font-semibold hover:underline flex items-center gap-1">
                Contact our partnership office <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
