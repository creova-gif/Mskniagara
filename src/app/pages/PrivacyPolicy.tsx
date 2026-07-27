import { useLanguage } from '../contexts/LanguageContext';
import { Shield, Lock, Eye, FileText, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';

/**
 * Privacy Policy Page
 * Comprehensive privacy policy for MSK Niagara Research Partnership website
 * WCAG 2.1 AA compliant with bilingual support
 */
export function PrivacyPolicy() {
  const { language } = useLanguage();
  usePageMeta(
    language === 'en' ? 'Privacy Policy | MSK Niagara' : 'Politique de confidentialité | MSK Niagara',
    language === 'en'
      ? 'How MSK Niagara collects, uses, and protects information on this website.'
      : 'Comment MSK Niagara recueille, utilise et protège les renseignements sur ce site web.'
  );

  const lastUpdated = language === 'en' ? 'January 3, 2026' : '3 janvier 2026';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#8B0000] text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjOEIwMDAwIiBzdHJva2Utb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-8">
            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-[#8B0000] flex items-center justify-center shadow-xl flex-shrink-0">
              <Shield className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
                {language === 'en' ? 'Privacy Policy' : 'Politique de confidentialité'}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-4">
                {language === 'en' 
                  ? 'Your privacy and data protection matter to us' 
                  : 'Votre vie privée et protection des données nous importent'}
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'PIPEDA Compliant' : 'Conforme LPRPDE'}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'TCPS 2 Ethics' : 'Éthique EPTC 2'}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'No Data Selling' : 'Aucune vente de données'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Key Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-white" />
                <h2 className="font-bold text-white text-base">
                  {language === 'en' ? 'Last Updated' : 'Dernière mise à jour'}
                </h2>
              </div>
              <p className="text-white/80 text-sm">{lastUpdated}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-white" />
                <h2 className="font-bold text-white text-base">
                  {language === 'en' ? 'Applies To' : 'S\'applique à'}
                </h2>
              </div>
              <p className="text-white/80 text-sm">
                {language === 'en' ? 'Website visitors & contacts' : 'Visiteurs du site & contacts'}
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-5 h-5 text-white" />
                <h2 className="font-bold text-white text-base">
                  {language === 'en' ? 'Privacy Contact' : 'Contact confidentialité'}
                </h2>
              </div>
              <p className="text-white/80 text-sm">contact@msk-niagara.ca</p>
            </div>
          </div>

          {/* Quick Summary */}
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="font-bold text-white mb-3 flex items-center gap-2 text-base">
              <Eye className="w-5 h-5" />
              {language === 'en' ? 'What This Policy Covers' : 'Ce que couvre cette politique'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-white/90">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{language === 'en' ? 'Information collection & use' : 'Collecte et utilisation d\'informations'}</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{language === 'en' ? 'Your privacy rights' : 'Vos droits à la vie privée'}</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{language === 'en' ? 'Data security measures' : 'Mesures de sécurité des données'}</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{language === 'en' ? 'Cookie & tracking policies' : 'Politiques de cookies et suivi'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        {language === 'en' ? (
          // English Content
          <>
            {/* Introduction */}
            <section className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#8B0000]/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-[#8B0000]" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Introduction</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Mobilizing Subjugated Knowledges for a Just and Inclusive Niagara ("MSK Niagara," "we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    As an academic research partnership funded by the Social Sciences and Humanities Research Council (SSHRC) and hosted by Brock University, we adhere to Canadian privacy legislation, including the Personal Information Protection and Electronic Documents Act (PIPEDA), and follow research ethics standards established by the Tri-Council Policy Statement: Ethical Conduct for Research Involving Humans (TCPS 2).
                  </p>
                </div>
              </div>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#8B0000]/10 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-[#8B0000]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Information We Collect</h2>
                  
                  <h3 className="text-xl font-bold text-[#0A0A0A] mb-3">1. Information You Provide</h3>
                  <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                        <span><strong>Contact Information:</strong> When you reach out via email or contact forms (name, email address, phone number, institutional affiliation)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                        <span><strong>Partnership Inquiries:</strong> Information about your organization and areas of interest</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                        <span><strong>Research Participation:</strong> Any information you voluntarily provide when expressing interest in research participation (collected under separate research ethics protocols)</span>
                      </li>
                    </ul>
                  </div>

                  <h3 className="text-xl font-bold text-[#0A0A0A] mb-3">2. Information Automatically Collected</h3>
                  <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                        <span><strong>Usage Data:</strong> Browser type, device information, IP address, pages visited, time spent on pages</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                        <span><strong>Cookies:</strong> We use essential cookies for language preferences and website functionality</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                        <span><strong>Chatbot Interactions:</strong> Conversations with our MSK Chat assistant (anonymized, used only for improving service)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#8B0000]/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-[#8B0000]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">How We Use Your Information</h2>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <p className="text-gray-700 mb-4">We use the information we collect to:</p>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                        <span>Respond to your inquiries and provide information about our research partnership</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                        <span>Process partnership applications and collaboration requests</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                        <span>Improve our website functionality and user experience</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                        <span>Send updates about partnership activities, events, and research findings (with your consent)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                        <span>Analyze website usage to improve content and accessibility</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                        <span>Comply with legal obligations and protect rights</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Information Sharing */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Information Sharing and Disclosure</h2>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-4">
                <p className="text-gray-700 mb-4">
                  <strong>We do not sell, rent, or trade your personal information.</strong> We may share your information only in the following circumstances:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                    <span><strong>With Partnership Members:</strong> Information may be shared with our research hub leaders and team members to respond to partnership inquiries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                    <span><strong>With Brock University:</strong> As our host institution, certain administrative information may be shared</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                    <span><strong>Service Providers:</strong> With third-party service providers who assist with website hosting and maintenance (under strict confidentiality agreements)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                    <span><strong>Legal Requirements:</strong> When required by law or to protect rights and safety</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Data Security</h2>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <p className="text-gray-700 leading-relaxed mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                    <span>Secure server infrastructure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                    <span>Encrypted data transmission (HTTPS)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                    <span>Regular security assessments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                    <span>Limited access to personal information by authorized personnel only</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Your Privacy Rights</h2>
              <div className="bg-gradient-to-br from-[#8B0000]/5 to-[#8B0000]/10 rounded-xl p-6 border-2 border-[#8B0000]/20">
                <p className="text-gray-700 mb-4">Under Canadian privacy legislation, you have the right to:</p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                    <span><strong>Access:</strong> Request access to your personal information we hold</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                    <span><strong>Correction:</strong> Request correction of inaccurate or incomplete information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                    <span><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                    <span><strong>Withdraw Consent:</strong> Withdraw consent for communications at any time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                    <span><strong>Object:</strong> Object to certain processing of your information</span>
                  </li>
                </ul>
                <p className="text-gray-700 mt-4">
                  To exercise these rights, please contact us at: <a href="mailto:contact@msk-niagara.ca" className="text-[#8B0000] hover:underline font-medium">contact@msk-niagara.ca</a>
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Cookies and Tracking Technologies</h2>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use cookies and similar technologies to enhance your experience on our website. Cookies are small text files stored on your device.
                </p>
                <h3 className="font-bold text-[#0A0A0A] mb-2">Types of Cookies We Use:</h3>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                    <span><strong>Essential Cookies:</strong> Required for website functionality (language preferences, session management)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                    <span><strong>Analytics Cookies:</strong> Help us understand how visitors use our website (anonymized data)</span>
                  </li>
                </ul>
                <p className="text-gray-700">
                  You can control cookies through your browser settings. However, disabling cookies may affect website functionality.
                </p>
              </div>
            </section>

            {/* Research Participation */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Research Participation Privacy</h2>
              <div className="bg-gradient-to-br from-[#8B0000]/5 to-[#8B0000]/10 rounded-xl p-6 border-2 border-[#8B0000]/20">
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Important:</strong> If you are interested in participating in our research studies, separate informed consent processes apply. Research participation is governed by:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                    <span>Brock University Research Ethics Board approval</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                    <span>Tri-Council Policy Statement (TCPS 2) ethical guidelines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                    <span>Separate informed consent procedures for each research project</span>
                  </li>
                </ul>
                <p className="text-gray-700 mt-4">
                  This website Privacy Policy does <strong>not</strong> cover research data collection, which is subject to specific research ethics protocols.
                </p>
              </div>
            </section>

            {/* Third-Party Links */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Third-Party Links</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website may contain links to third-party websites (e.g., partner organizations, funding agencies). We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately.
              </p>
            </section>

            {/* Data Retention */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your personal information only as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce agreements. Website usage data is typically retained for 2 years; contact information is retained as long as there is an active partnership relationship or ongoing communication.
              </p>
            </section>

            {/* International Users */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">International Users</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website is hosted in Canada and governed by Canadian privacy laws. If you access our website from outside Canada, please be aware that your information may be transferred to, stored, and processed in Canada where our servers are located and our central database is operated.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            {/* Contact Section */}
            <section className="mb-12">
              <div className="bg-gradient-to-br from-[#8B0000] to-[#6B0000] text-white rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <Mail className="w-8 h-8 flex-shrink-0" />
                  <div>
                    <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
                    <p className="text-white/90 leading-relaxed mb-6">
                      If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:
                    </p>
                    
                    <div className="space-y-3 text-white/90">
                      <p>
                        <strong className="text-white">Email:</strong> contact@msk-niagara.ca
                      </p>
                      <p>
                        <strong className="text-white">Phone:</strong> +1 (905) 688-5550
                      </p>
                      <p>
                        <strong className="text-white">Mail:</strong><br />
                        MSK Niagara Research Partnership<br />
                        Brock University<br />
                        1812 Sir Isaac Brock Way<br />
                        St. Catharines, ON L2S 3A1<br />
                        Canada
                      </p>
                    </div>

                    <p className="text-white/90 mt-6 text-sm">
                      <strong className="text-white">Privacy Officer:</strong> Dr. Livianna Tossutti & Dr. Jean Ntakirutimana (MSK Co-Directors)
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Acknowledgment */}
            <section>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">Acknowledgment</h2>
                <p className="text-gray-700 leading-relaxed">
                  By using our website, you acknowledge that you have read and understood this Privacy Policy and agree to its terms. If you do not agree with this Privacy Policy, please do not use our website.
                </p>
              </div>
            </section>
          </>
        ) : (
          // French Content
          <>
            {/* Introduction */}
            <section className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#8B0000]/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-[#8B0000]" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Introduction</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Mobiliser les savoirs marginalisés pour un Niagara juste et inclusif (« MSK Niagara », « nous », « notre » ou « nos ») s'engage à protéger votre vie privée et à assurer la sécurité de vos informations personnelles. Cette politique de confidentialité explique comment nous recueillons, utilisons, divulguons et protégeons vos informations lorsque vous visitez notre site Web.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    En tant que partenariat de recherche universitaire financé par le Conseil de recherches en sciences humaines (CRSH) et hébergé par l'Université Brock, nous adhérons à la législation canadienne sur la protection de la vie privée, y compris la Loi sur la protection des renseignements personnels et les documents électroniques (LPRPDE), et suivons les normes d'éthique de la recherche établies par l'Énoncé de politique des trois Conseils : Éthique de la recherche avec des êtres humains (EPTC 2).
                  </p>
                </div>
              </div>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#8B0000]/10 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-[#8B0000]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Informations que nous recueillons</h2>
                  
                  <h3 className="text-xl font-bold text-[#0A0A0A] mb-3">1. Informations que vous fournissez</h3>
                  <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                        <span><strong>Informations de contact :</strong> Lorsque vous nous contactez par courriel ou formulaire (nom, adresse courriel, numéro de téléphone, affiliation institutionnelle)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                        <span><strong>Demandes de partenariat :</strong> Informations sur votre organisation et domaines d'intérêt</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                        <span><strong>Participation à la recherche :</strong> Toute information fournie volontairement lors d'expression d'intérêt (collectée selon des protocoles d'éthique de recherche séparés)</span>
                      </li>
                    </ul>
                  </div>

                  <h3 className="text-xl font-bold text-[#0A0A0A] mb-3">2. Informations collectées automatiquement</h3>
                  <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                        <span><strong>Données d'utilisation :</strong> Type de navigateur, informations sur l'appareil, adresse IP, pages visitées, temps passé</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                        <span><strong>Cookies :</strong> Nous utilisons des cookies essentiels pour les préférences linguistiques et la fonctionnalité</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                        <span><strong>Interactions chatbot :</strong> Conversations avec notre assistant MSK Chat (anonymisées, utilisées uniquement pour améliorer le service)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#8B0000]/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-[#8B0000]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Comment nous utilisons vos informations</h2>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <p className="text-gray-700 mb-4">Nous utilisons les informations collectées pour :</p>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                        <span>Répondre à vos demandes et fournir des informations sur notre partenariat</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                        <span>Traiter les demandes de partenariat et de collaboration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                        <span>Améliorer la fonctionnalité du site Web et l'expérience utilisateur</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                        <span>Envoyer des mises à jour sur les activités, événements et résultats (avec votre consentement)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                        <span>Analyser l'utilisation du site pour améliorer le contenu et l'accessibilité</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                        <span>Se conformer aux obligations légales et protéger les droits</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Information Sharing */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Partage et divulgation d'informations</h2>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-4">
                <p className="text-gray-700 mb-4">
                  <strong>Nous ne vendons, ne louons ni n'échangeons vos informations personnelles.</strong> Nous pouvons partager vos informations uniquement dans les circonstances suivantes :
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                    <span><strong>Avec les membres du partenariat :</strong> Pour répondre aux demandes de partenariat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                    <span><strong>Avec l'Université Brock :</strong> En tant qu'institution hôte</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                    <span><strong>Fournisseurs de services :</strong> Pour l'hébergement et la maintenance du site (accords de confidentialité stricts)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                    <span><strong>Exigences légales :</strong> Lorsque requis par la loi</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Sécurité des données</h2>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos informations personnelles. Ces mesures comprennent :
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                    <span>Infrastructure de serveur sécurisée</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                    <span>Transmission de données cryptée (HTTPS)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                    <span>Évaluations de sécurité régulières</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                    <span>Accès limité aux informations personnelles</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Vos droits à la vie privée</h2>
              <div className="bg-gradient-to-br from-[#8B0000]/5 to-[#8B0000]/10 rounded-xl p-6 border-2 border-[#8B0000]/20">
                <p className="text-gray-700 mb-4">Selon la législation canadienne sur la protection de la vie privée, vous avez le droit de :</p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                    <span><strong>Accès :</strong> Demander l'accès à vos informations personnelles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                    <span><strong>Correction :</strong> Demander la correction d'informations inexactes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                    <span><strong>Suppression :</strong> Demander la suppression de vos informations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                    <span><strong>Retrait du consentement :</strong> Retirer le consentement aux communications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                    <span><strong>Opposition :</strong> S'opposer à certains traitements</span>
                  </li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@msk-niagara.ca" className="text-[#8B0000] hover:underline font-medium">contact@msk-niagara.ca</a>
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Cookies et technologies de suivi</h2>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience sur notre site Web.
                </p>
                <h3 className="font-bold text-[#0A0A0A] mb-2">Types de cookies que nous utilisons :</h3>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                    <span><strong>Cookies essentiels :</strong> Requis pour la fonctionnalité (préférences linguistiques)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-[#8B0000] rounded-full flex-shrink-0 mt-2"></span>
                    <span><strong>Cookies analytiques :</strong> Nous aident à comprendre l'utilisation du site (données anonymisées)</span>
                  </li>
                </ul>
                <p className="text-gray-700">
                  Vous pouvez contrôler les cookies via les paramètres de votre navigateur.
                </p>
              </div>
            </section>

            {/* Research Participation */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Confidentialité de la participation à la recherche</h2>
              <div className="bg-gradient-to-br from-[#8B0000]/5 to-[#8B0000]/10 rounded-xl p-6 border-2 border-[#8B0000]/20">
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Important :</strong> Si vous êtes intéressé à participer à nos études de recherche, des processus de consentement éclairé séparés s'appliquent. La participation à la recherche est régie par :
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                    <span>Approbation du Comité d'éthique de la recherche de l'Université Brock</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                    <span>Directives éthiques de l'EPTC 2</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#8B0000] flex-shrink-0 mt-0.5" />
                    <span>Procédures de consentement éclairé séparées pour chaque projet</span>
                  </li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Cette politique de confidentialité du site Web ne couvre <strong>pas</strong> la collecte de données de recherche.
                </p>
              </div>
            </section>

            {/* Third-Party Links */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Liens tiers</h2>
              <p className="text-gray-700 leading-relaxed">
                Notre site Web peut contenir des liens vers des sites Web tiers. Nous ne sommes pas responsables des pratiques de confidentialité de ces sites externes. Nous vous encourageons à consulter leurs politiques de confidentialité.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Confidentialité des enfants</h2>
              <p className="text-gray-700 leading-relaxed">
                Notre site Web n'est pas destiné aux enfants de moins de 13 ans. Nous ne collectons pas sciemment d'informations personnelles auprès d'enfants. Si vous pensez que nous avons par inadvertance collecté des informations d'un enfant, veuillez nous contacter immédiatement.
              </p>
            </section>

            {/* Data Retention */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Conservation des données</h2>
              <p className="text-gray-700 leading-relaxed">
                Nous conservons vos informations personnelles uniquement aussi longtemps que nécessaire pour remplir les objectifs décrits dans cette politique. Les données d'utilisation du site Web sont généralement conservées pendant 2 ans ; les informations de contact sont conservées tant qu'il existe une relation de partenariat active.
              </p>
            </section>

            {/* International Users */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Utilisateurs internationaux</h2>
              <p className="text-gray-700 leading-relaxed">
                Notre site Web est hébergé au Canada et régi par les lois canadiennes sur la protection de la vie privée. Si vous accédez à notre site Web de l'extérieur du Canada, veuillez noter que vos informations peuvent être transférées, stockées et traitées au Canada.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Modifications de cette politique</h2>
              <p className="text-gray-700 leading-relaxed">
                Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous informerons de tout changement important en publiant la nouvelle politique sur cette page et en mettant à jour la date de « Dernière mise à jour ». Nous vous encourageons à consulter cette politique périodiquement.
              </p>
            </section>

            {/* Contact Section */}
            <section className="mb-12">
              <div className="bg-gradient-to-br from-[#8B0000] to-[#6B0000] text-white rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <Mail className="w-8 h-8 flex-shrink-0" />
                  <div>
                    <h2 className="text-3xl font-bold mb-4">Contactez-nous</h2>
                    <p className="text-white/90 leading-relaxed mb-6">
                      Si vous avez des questions, des préoccupations ou des demandes concernant cette politique de confidentialité, veuillez nous contacter :
                    </p>
                    
                    <div className="space-y-3 text-white/90">
                      <p>
                        <strong className="text-white">Courriel :</strong> contact@msk-niagara.ca
                      </p>
                      <p>
                        <strong className="text-white">Téléphone :</strong> +1 (905) 688-5550
                      </p>
                      <p>
                        <strong className="text-white">Adresse postale :</strong><br />
                        Partenariat de recherche MSK Niagara<br />
                        Université Brock<br />
                        1812 Sir Isaac Brock Way<br />
                        St. Catharines, ON L2S 3A1<br />
                        Canada
                      </p>
                    </div>

                    <p className="text-white/90 mt-6 text-sm">
                      <strong className="text-white">Responsable de la protection de la vie privée :</strong> Dr. Livianna Tossutti & Dr. Jean Ntakirutimana (Codirecteurs MSK)
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Acknowledgment */}
            <section>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-[#0A0A0A] mb-3">Reconnaissance</h2>
                <p className="text-gray-700 leading-relaxed">
                  En utilisant notre site Web, vous reconnaissez avoir lu et compris cette politique de confidentialité et acceptez ses conditions. Si vous n'êtes pas d'accord avec cette politique, veuillez ne pas utiliser notre site Web.
                </p>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}