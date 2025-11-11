import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  useEffect(() => {
    // Check if user has already selected a language
    const savedLanguage = localStorage.getItem('wedding_language');
    const hasSeenModal = sessionStorage.getItem('wedding_language_modal_seen');
    
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else if (!hasSeenModal) {
      // Show language selection modal on first visit
      setShowLanguageModal(true);
    }
  }, []);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('wedding_language', newLanguage);
  };

  const dismissLanguageModal = (selectedLanguage) => {
    if (selectedLanguage) {
      changeLanguage(selectedLanguage);
    }
    setShowLanguageModal(false);
    sessionStorage.setItem('wedding_language_modal_seen', 'true');
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        t,
        showLanguageModal,
        dismissLanguageModal
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};