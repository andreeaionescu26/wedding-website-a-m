import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const LanguageModal = () => {
  const { showLanguageModal, dismissLanguageModal, t } = useLanguage();

  if (!showLanguageModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center px-4 animate-fadeIn">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>

      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 animate-slideUp">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-serif text-sage-700 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            {t.password.languageModal.title}
          </h2>
          <p className="text-gray-600">
            {t.password.languageModal.subtitle}
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => dismissLanguageModal('en')}
            className="w-full bg-sage-600 text-white py-3 rounded-lg hover:bg-sage-700 transition-colors font-medium shadow-md flex items-center justify-center gap-2"
          >
            <span className="text-xl">🇬🇧</span>
            {t.password.languageModal.english}
          </button>

          <button
            onClick={() => dismissLanguageModal('ro')}
            className="w-full bg-white text-sage-700 py-3 rounded-lg hover:bg-sage-50 transition-colors font-medium border-2 border-sage-600 flex items-center justify-center gap-2"
          >
            <span className="text-xl">🇷🇴</span>
            {t.password.languageModal.romanian}
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          You can change the language anytime using the toggle button
        </p>
      </div>
    </div>
  );
};

export default LanguageModal;