import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const LanguageToggle = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <button
      onClick={() => changeLanguage(language === 'en' ? 'ro' : 'en')}
      className="fixed top-6 right-6 w-14 h-14 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white/80 flex items-center justify-center transition-all shadow-sm hover:shadow-md z-40 group"
      aria-label="Toggle language"
      title={language === 'en' ? 'Switch to Romanian' : 'Comută la Engleză'}
    >
      <div className="flex flex-col items-center justify-center">
        <span className="text-xs font-medium text-sage-700 group-hover:text-sage-800 transition-colors">
          {language === 'en' ? 'RO' : 'EN'}
        </span>
      </div>
    </button>
  );
};

export default LanguageToggle;