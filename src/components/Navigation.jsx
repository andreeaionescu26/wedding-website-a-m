import React, { useState } from 'react';
import { Send, Home, Lock, X, Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Navigation = ({ currentView, setView, showBurgerMenu }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, changeLanguage } = useLanguage();

  const handleNavClick = (view) => {
    setView(view);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Minimalistic Floating Burger Button - with fade in/out animation */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className={`fixed top-6 left-6 w-14 h-14 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white/80 flex items-center justify-center shadow-sm hover:shadow-md z-40 group transition-all duration-500 ${
          showBurgerMenu ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        aria-label="Open menu"
      >
        <div className="flex flex-col gap-1.5">
          <span className="w-6 h-1 bg-sage-600 group-hover:bg-sage-700 transition-colors rounded-full"></span>
          <span className="w-6 h-1 bg-sage-600 group-hover:bg-sage-700 transition-colors rounded-full"></span>
          <span className="w-6 h-1 bg-sage-600 group-hover:bg-sage-700 transition-colors rounded-full"></span>
        </div>
      </button>

      {/* Backdrop Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Side Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Menu Header */}
        <div className="p-6 border-b border-sage-200 flex justify-between items-center flex-shrink-0">
          <h2 className="text-2xl font-serif text-sage-700" style={{ fontFamily: 'Georgia, serif' }}>
            {t.nav.menu}
          </h2>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-10 h-10 rounded-full hover:bg-sage-50 flex items-center justify-center transition-colors"
            aria-label="Close menu"
          >
            <X size={24} className="text-sage-700" />
          </button>
        </div>

        {/* Menu Items - Scrollable middle section */}
        <nav className="flex-1 overflow-y-auto p-6">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleNavClick('rsvp')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                  currentView === 'rsvp'
                    ? 'bg-sage-100 text-sage-700 font-medium'
                    : 'text-gray-700 hover:bg-sage-50'
                }`}
              >
                <Send size={20} />
                <span>{t.nav.rsvp}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('landing')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                  currentView === 'landing'
                    ? 'bg-sage-100 text-sage-700 font-medium'
                    : 'text-gray-700 hover:bg-sage-50'
                }`}
              >
                <Home size={20} />
                <span>{t.nav.wedding}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('admin')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                  currentView === 'admin'
                    ? 'bg-sage-100 text-sage-700 font-medium'
                    : 'text-gray-700 hover:bg-sage-50'
                }`}
              >
                <Lock size={20} />
                <span>{t.nav.admin}</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Language Selector - Fixed above footer */}
        <div className="flex-shrink-0 px-6 py-4 border-t border-sage-200 bg-sage-50/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Globe size={18} />
              <span className="text-sm font-medium">{language === 'en' ? 'Language' : 'Limba'}</span>
            </div>
            <div className="flex gap-2">
              {/* English Button */}
              <button
                onClick={() => changeLanguage('en')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  language === 'en'
                    ? 'bg-sage-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-sage-50 border border-sage-200'
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>

              {/* Romanian Button */}
              <button
                onClick={() => changeLanguage('ro')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  language === 'ro'
                    ? 'bg-sage-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-sage-50 border border-sage-200'
                }`}
                aria-label="Comută la Română"
              >
                RO
              </button>
            </div>
          </div>
        </div>

        {/* Menu Footer - Fixed at bottom */}
        <div className="flex-shrink-0 p-6 border-t border-sage-200">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">{t.nav.footer.text}</p>
            <p className="text-sage-700 font-serif text-lg" style={{ fontFamily: 'Georgia, serif' }}>
              {t.nav.footer.celebration}
            </p>
            <p className="text-sm text-gray-600 mt-1">{t.nav.footer.dates}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;