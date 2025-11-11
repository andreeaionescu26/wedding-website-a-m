import React, { useState } from 'react';
import { Send, Home, Lock, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Navigation = ({ currentView, setView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const handleNavClick = (view) => {
    setView(view);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Minimalistic Floating Burger Button */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="fixed top-6 left-6 w-14 h-14 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white/80 flex items-center justify-center transition-all shadow-sm hover:shadow-md z-40 group"
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
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Menu Header */}
        <div className="p-6 border-b border-sage-200 flex justify-between items-center">
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

        {/* Menu Items */}
        <nav className="p-6">
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

        {/* Menu Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-sage-200">
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