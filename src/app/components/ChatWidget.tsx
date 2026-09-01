import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocalizedNavigate } from './LocalizedLink';
import { MessageCircle, X, Send, Minimize2, HelpCircle, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface QuickAction {
  text: string;
  action: string;
}

export function ChatWidget() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useLocalizedNavigate();

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Quick action buttons
  const quickActions: QuickAction[] = language === 'en' 
    ? [
        { text: 'Research Projects', action: 'projects' },
        { text: 'About Partnership', action: 'about' },
        { text: 'Contact Us', action: 'contact' },
        { text: 'View FAQ', action: 'faq' }
      ]
    : [
        { text: 'Projets de recherche', action: 'projects' },
        { text: 'À propos', action: 'about' },
        { text: 'Nous contacter', action: 'contact' },
        { text: 'Voir FAQ', action: 'faq' }
      ];

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  // Initial greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = language === 'en'
        ? "Hello! I'm here to help you learn about the MSK Research Partnership. How can I assist you today?"
        : "Bonjour! Je suis là pour vous aider à en savoir plus sur le partenariat de recherche MSK. Comment puis-je vous aider aujourd'hui?";
      
      setTimeout(() => {
        setMessages([{
          id: Date.now(),
          text: greeting,
          sender: 'bot',
          timestamp: new Date()
        }]);
      }, 500);
    }
  }, [isOpen, language]);

  // Bot response logic
  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (language === 'en') {
      if (lowerMessage.includes('research') || lowerMessage.includes('project')) {
        return "We have three main research hubs: Childhood and Growing Up, Health Literacy, and Identity/Connections/Belonging. Each hub focuses on advancing community health and social research. Would you like to learn more about a specific hub?";
      }
      if (lowerMessage.includes('contact') || lowerMessage.includes('email')) {
        return "You can reach us at contact@msk-niagara.ca or call us at +1 (905) 688-5550. We're located at Brock University, St. Catharines, Ontario.";
      }
      if (lowerMessage.includes('about') || lowerMessage.includes('partnership')) {
        return "The MSK Research Partnership is a transnational, university-community partnership committed to fostering social justice through collaborative research. We bring together researchers, universities, and community organizations.";
      }
      if (lowerMessage.includes('event') || lowerMessage.includes('timeline')) {
        return "You can view our upcoming events and partnership timeline on our Timeline & Events page. We regularly host community engagement sessions and research presentations.";
      }
      if (lowerMessage.includes('join') || lowerMessage.includes('participate')) {
        return "We welcome community participation! Please visit our Community page or contact us directly to learn about current opportunities to get involved in our research.";
      }
      if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return "Hello! How can I help you today? Feel free to ask about our research projects, partnership details, or upcoming events.";
      }
      return "Thank you for your question! For detailed information, please explore our website sections or contact us directly at contact@msk-niagara.ca. Is there anything specific I can help you find?";
    } else {
      if (lowerMessage.includes('recherche') || lowerMessage.includes('projet')) {
        return "Nous avons trois pôles de recherche principaux: Enfance et croissance, Littératie en santé, et Identité/Connexions/Appartenance. Chaque pôle se concentre sur la promotion de la recherche en santé communautaire et sociale. Souhaitez-vous en savoir plus sur un pôle spécifique?";
      }
      if (lowerMessage.includes('contact') || lowerMessage.includes('courriel')) {
        return "Vous pouvez nous joindre à contact@msk-niagara.ca ou nous appeler au +1 (905) 688-5550. Nous sommes situés à l'Université Brock, St. Catharines, Ontario.";
      }
      if (lowerMessage.includes('propos') || lowerMessage.includes('partenariat')) {
        return "Le partenariat de recherche MSK est un partenariat transnational université-communauté engagé à bâtir la justice sociale par la recherche collaborative. Nous réunissons chercheurs, universités et organisations communautaires.";
      }
      if (lowerMessage.includes('événement') || lowerMessage.includes('chronologie')) {
        return "Vous pouvez consulter nos événements à venir et la chronologie de notre partenariat sur notre page Chronologie et événements. Nous organisons régulièrement des séances d'engagement communautaire et des présentations de recherche.";
      }
      if (lowerMessage.includes('participer') || lowerMessage.includes('rejoindre')) {
        return "Nous accueillons la participation communautaire! Visitez notre page Communauté ou contactez-nous directement pour connaître les opportunités actuelles de vous impliquer dans notre recherche.";
      }
      if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut')) {
        return "Bonjour! Comment puis-je vous aider aujourd'hui? N'hésitez pas à me poser des questions sur nos projets de recherche, les détails du partenariat ou les événements à venir.";
      }
      return "Merci pour votre question! Pour des informations détaillées, veuillez explorer les sections de notre site Web ou nous contacter directement à contact@msk-niagara.ca. Y a-t-il quelque chose de précis que je peux vous aider à trouver?";
    }
  };

  // Handle send message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  // Handle quick action click
  const handleQuickAction = (action: string) => {
    if (action === 'faq') {
      // Navigate to FAQ page
      navigate('/help');
      setIsOpen(false);
      return;
    }
    
    let message = '';
    if (action === 'projects') {
      message = language === 'en' ? 'Tell me about research projects' : 'Parlez-moi des projets de recherche';
    } else if (action === 'about') {
      message = language === 'en' ? 'What is the MSK Partnership about?' : 'Qu\'est-ce que le partenariat MSK?';
    } else if (action === 'contact') {
      message = language === 'en' ? 'How can I contact you?' : 'Comment puis-je vous contacter?';
    }
    
    setInputValue(message);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className={`fixed ${isMobile ? 'bottom-4 right-4 w-14 h-14' : 'bottom-6 right-6 w-16 h-16'} z-50 bg-gradient-to-br from-[#CC0000] to-[#6B0000] rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-[0_0_30px_rgba(204,0,0,0.5)] transition-all duration-300 group`}
            aria-label={language === 'en' ? 'Open chat' : 'Ouvrir le chat'}
          >
            <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: isMinimized ? 0.95 : 1,
              height: isMinimized ? 'auto' : (isMobile ? '500px' : '600px')
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed ${isMobile ? 'bottom-4 right-4 left-4' : 'bottom-6 right-6 w-full max-w-md'} z-50 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border-2 border-[#CC0000]/20`}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-[#CC0000] via-[#A40000] to-[#6B0000] text-white px-6 py-5 flex items-center justify-between overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }}></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
              </div>
              
              {/* Decorative top border shimmer */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/0 via-white to-white/0 opacity-30 animate-pulse"></div>
              
              <div className="flex items-center gap-4 relative z-10">
                {/* Enhanced icon with animation */}
                <motion.div 
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="relative"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/20 group-hover:scale-110 transition-transform">
                    <HelpCircle className="w-7 h-7 text-white drop-shadow-lg" />
                  </div>
                  {/* Pulsing ring indicator */}
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white shadow-lg"></span>
                  </span>
                </motion.div>
                
                <div className="flex flex-col gap-0.5">
                  <h3 className="font-bold text-lg tracking-tight drop-shadow-sm flex items-center gap-2">
                    <span className="bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent">
                      {language === 'en' ? 'MSK Help Assistant' : 'Assistant MSK'}
                    </span>
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <motion.div
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-green-400 shadow-lg shadow-green-500/50"
                    ></motion.div>
                    <p className="text-xs font-medium text-white/90 tracking-wide">
                      {language === 'en' ? 'Online now' : 'En ligne maintenant'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1 relative z-10">
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.25)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMinimized(!isMinimized)}
                  style={{ borderColor: 'rgba(255, 255, 255, 0)' }}
                  className="p-2.5 rounded-xl backdrop-blur-sm border group"
                  aria-label={isMinimized ? 'Maximize' : 'Minimize'}
                >
                  <Minimize2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.25)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsOpen(false);
                    setTimeout(() => {
                      setMessages([]);
                      setIsMinimized(false);
                    }, 300);
                  }}
                  style={{ borderColor: 'rgba(255, 255, 255, 0)' }}
                  className="p-2.5 rounded-xl backdrop-blur-sm border group"
                  aria-label={language === 'en' ? 'Close chat' : 'Fermer le chat'}
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </motion.button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.sender === 'user'
                            ? 'bg-[#CC0000] text-white rounded-br-none'
                            : 'bg-white text-gray-800 shadow-md rounded-bl-none border border-gray-200'
                        }`}
                      >
                        <p className={`text-sm leading-relaxed ${message.sender === 'user' ? 'text-white !important' : 'text-gray-800'}`}>{message.text}</p>
                        <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white !important' : 'text-gray-500'}`}>
                          {message.timestamp.toLocaleTimeString(language === 'en' ? 'en-US' : 'fr-FR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-md border border-gray-200">
                        <div className="flex gap-2">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                {messages.length <= 1 && (
                  <div className="px-6 py-3 bg-white border-t border-gray-200">
                    <p className="text-xs text-gray-600 mb-2">
                      {language === 'en' ? 'Quick actions:' : 'Actions rapides:'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {quickActions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickAction(action.action)}
                          className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-[#CC0000]/10 hover:text-[#CC0000] rounded-full transition-colors border border-gray-300 hover:border-[#CC0000]/30"
                        >
                          {action.text}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="bg-white px-6 py-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder={language === 'en' ? 'Type your message...' : 'Tapez votre message...'}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#CC0000] focus:ring-2 focus:ring-[#CC0000]/20 transition-all"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className="px-6 py-3 bg-gradient-to-r from-[#CC0000] to-[#6B0000] text-white rounded-xl hover:from-[#A40000] hover:to-[#CC0000] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl"
                      aria-label={language === 'en' ? 'Send message' : 'Envoyer le message'}
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}