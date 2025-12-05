import React, { useState, useEffect } from 'react';
import { sha256 } from 'js-sha256';
import { useLanguage } from '../i18n/LanguageContext';
import LeafAnimation from './LeafAnimation';

const PasswordProtection = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const { t, language, changeLanguage } = useLanguage();
  

  useEffect(() => {
    const unlocked = sessionStorage.getItem('wedding_auth');
    if (unlocked === 'true') {
      setIsUnlocked(true);
    }
    // Trigger fade-in animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

    // Scroll to top when authentication state changes
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [isUnlocked]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const hashedInput = sha256(password.toUpperCase().trim());

    if (hashedInput === sha256('MR&MRSBRYDON')) {
      setIsUnlocked(true);
      sessionStorage.setItem('wedding_auth', 'true');
    } else {
      setError(t.password.error);
      setPassword('');
    }
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-cream-200 flex items-center justify-center px-4 py-8 overflow-hidden">
        <style>{`
          /* Leaf simple fade-in (keep it simple) */
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          /* Names - Elegant slide + fade from top with subtle bounce */
          @keyframes slideInFromTopBounce {
            0% {
              opacity: 0;
              transform: translateY(-40px) scale(0.95);
            }
            60% {
              opacity: 1;
              transform: translateY(3px) scale(1.01);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          /* Label - Slide from left with fade */
          @keyframes slideInFromLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          /* Input - Scale up with subtle glow effect */
          @keyframes scaleInGlow {
            0% {
              opacity: 0;
              transform: scale(0.95);
              box-shadow: 0 0 0 0 rgba(103, 132, 103, 0);
            }
            50% {
              opacity: 1;
              transform: scale(1.01);
              box-shadow: 0 0 15px 5px rgba(103, 132, 103, 0.2);
            }
            100% {
              opacity: 1;
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(103, 132, 103, 0);
            }
          }

          /* Button - Slide up with subtle bounce and glow */
          @keyframes slideUpBounceGlow {
            0% {
              opacity: 0;
              transform: translateY(40px) scale(0.95);
            }
            50% {
              opacity: 1;
              transform: translateY(-3px) scale(1.01);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          /* Footer - Gentle fade from bottom */
          @keyframes fadeInFromBottom {
            from {
              opacity: 0;
              transform: translateY(15px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Language selector - Scale in subtly */
          @keyframes scaleInLanguage {
            0% {
              opacity: 0;
              transform: scale(0.92);
            }
            60% {
              opacity: 1;
              transform: scale(1.01);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          /* Particle background animation */
          @keyframes float {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
              opacity: 0.1;
            }
            50% {
              transform: translateY(-20px) rotate(180deg);
              opacity: 0.3;
            }
          }

          /* Apply animations */
          .fade-leaf {
            opacity: 0;
            animation: fadeIn 1s ease-out 0s forwards;
          }

          .fade-leaf.visible {
            animation: fadeIn 1s ease-out 0s forwards;
          }

          .fade-names {
            opacity: 0;
          }

          .fade-names.visible {
            animation: slideInFromTopBounce 1s ease-out 0.3s forwards;
          }

          .fade-label {
            opacity: 0;
          }

          .fade-label.visible {
            animation: slideInFromLeft 0.8s ease-out 0.8s forwards;
          }

          .fade-input {
            opacity: 0;
          }

          .fade-input.visible {
            animation: scaleInGlow 1s ease-out 1.2s forwards;
          }

          .fade-button {
            opacity: 0;
          }

          .fade-button.visible {
            animation: slideUpBounceGlow 1s ease-out 1.6s forwards;
          }

          .fade-footer {
            opacity: 0;
          }

          .fade-footer.visible {
            animation: fadeInFromBottom 0.8s ease-out 2s forwards;
          }

          .fade-language {
            opacity: 0;
          }

          .fade-language.visible {
            animation: scaleInLanguage 0.8s ease-out 2.4s forwards;
          }

          /* Floating particles */
          .particle {
            position: absolute;
            width: 8px;
            height: 8px;
            background: rgba(103, 132, 103, 0.15);
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
            pointer-events: none;
          }

          .particle:nth-child(1) {
            top: 20%;
            left: 10%;
            animation-delay: 0s;
            animation-duration: 7s;
          }

          .particle:nth-child(2) {
            top: 60%;
            left: 85%;
            animation-delay: 1s;
            animation-duration: 8s;
          }

          .particle:nth-child(3) {
            top: 80%;
            left: 20%;
            animation-delay: 2s;
            animation-duration: 6s;
          }

          .particle:nth-child(4) {
            top: 30%;
            left: 75%;
            animation-delay: 1.5s;
            animation-duration: 7.5s;
          }

          .particle:nth-child(5) {
            top: 70%;
            left: 60%;
            animation-delay: 0.5s;
            animation-duration: 6.5s;
          }

          /* Smooth focus animations - more subtle */
          input:focus {
            transform: scale(1.01);
            box-shadow: 0 0 15px rgba(103, 132, 103, 0.25);
            transition: all 0.3s ease;
          }

          button:hover {
            transform: scale(1.02);
            transition: all 0.3s ease;
          }

          button:active {
            transform: scale(0.98);
          }

          /* Language button hover effects - more subtle */
          .language-button {
            transition: all 0.3s ease;
          }

          .language-button:hover {
            transform: scale(1.05);
          }

          .language-button:active {
            transform: scale(0.95);
          }

          /* Error shake animation */
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }

          .error-shake {
            animation: shake 0.5s ease-in-out;
          }
        `}</style>

        {/* Floating particles background */}
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>

        <div className="max-w-md w-full text-center relative z-10">
          {/* Animated Leaf Icon - Simple fade */}
          <div className={`mb-6 flex justify-center fade-leaf ${isVisible ? 'visible' : ''}`}>
            <LeafAnimation size="large" variant="default" />
          </div>
          
          {/* Names - Dramatic entrance from top with bounce */}
          <h1 
            className={`text-2xl md:text-3xl font-heading text-sage-700 mb-8 fade-names ${isVisible ? 'visible' : ''}`}
            
          >
            {t.password.names}
          </h1>

          {/* Label - Slide from left */}
          <label className={`block text-base font-medium text-gray-700 mb-3 fade-label ${isVisible ? 'visible' : ''}`}>
            {t.password.label}
          </label>
          
          {/* Input - Scale in with glow */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
            placeholder={t.password.placeholder}
            className={`w-full px-4 py-3 text-base border-2 border-sage-300 bg-white rounded-lg mb-2 focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-all text-center fade-input ${isVisible ? 'visible' : ''}`}
            style={{ fontSize: '16px' }}
            required
          />
          
          {/* Error Message with shake */}
          {error && (
            <p className="text-red-600 text-sm mb-4 error-shake">{error}</p>
          )}

          {/* Button - Slide up with bounce and glow */}
          <button
            onClick={handleSubmit}
            className={`w-full bg-sage-600 text-white py-3 rounded-lg transition-all font-medium shadow-md text-base mb-6 fade-button ${isVisible ? 'visible' : ''}`}
          >
            {t.password.button}
          </button>

          {/* Footer - Gentle fade from bottom */}
          <p className={`text-md text-gray-500 mb-8 fade-footer ${isVisible ? 'visible' : ''}`}>
            {t.password.footer}
          </p>

          {/* Language Selection */}
          <div className={`fade-language ${isVisible ? 'visible' : ''}`}>
            <p className="text-sm text-gray-500 mb-4 uppercase tracking-wide">
              Choose Language / Alege Limba
            </p>
            <div className="flex justify-center gap-6">
              {/* English Button */}
              <button
                onClick={() => changeLanguage('en')}
                className={`language-button flex flex-col items-center gap-2 ${
                  language === 'en' 
                    ? 'opacity-100' 
                    : 'opacity-50 hover:opacity-75'
                }`}
                aria-label="Switch to English"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl  transition-all ${
                  language === 'en'
                    ? 'bg-sage-100 ring-3 ring-sage-600 shadow-lg text-sage-700'
                    : 'bg-white shadow-md text-gray-600'
                }`}>
                  EN
                </div>
                <span className={`text-md font-medium transition-colors ${
                  language === 'en' 
                    ? 'text-sage-700' 
                    : 'text-gray-600'
                }`}>
                  English
                </span>
              </button>

              {/* Romanian Button */}
              <button
                onClick={() => changeLanguage('ro')}
                className={`language-button flex flex-col items-center gap-2 ${
                  language === 'ro' 
                    ? 'opacity-100' 
                    : 'opacity-50 hover:opacity-75'
                }`}
                aria-label="Comută la Română"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all ${
                  language === 'ro'
                    ? 'bg-sage-100 ring-3 ring-sage-600 shadow-lg text-sage-700'
                    : 'bg-white shadow-md text-gray-600'
                }`}>
                  RO
                </div>
                <span className={`text-md font-medium transition-colors ${
                  language === 'ro' 
                    ? 'text-sage-700' 
                    : 'text-gray-600'
                }`}>
                  Română
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default PasswordProtection;