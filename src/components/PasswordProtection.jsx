import React, { useState, useEffect } from 'react';
import { sha256 } from 'js-sha256';
import LeafAnimation from './LeafAnimation';

const PasswordProtection = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unlocked = sessionStorage.getItem('wedding_auth');
    if (unlocked === 'true') {
      setIsUnlocked(true);
    }
    // Trigger fade-in animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const hashedInput = sha256(password.toUpperCase().trim());

    if (hashedInput === sha256('MR&MRSBRYDON')) {
      setIsUnlocked(true);
      sessionStorage.setItem('wedding_auth', 'true');
    } else {
      setError('Incorrect password. Please check your invitation.');
      setPassword('');
    }
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-cream-200 flex items-center justify-center px-4">
        <style>{`
          @keyframes fadeInElement {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .fade-element {
            opacity: 0;
          }

          .fade-element.visible {
            animation: fadeInElement 1.5s ease-out forwards;
          }

          .fade-leaf {
            opacity: 0;
            animation-delay: 0s;
          }

          .fade-names {
            opacity: 0;
            animation-delay: 0.3s;
          }

          .fade-subtitle {
            opacity: 0;
            animation-delay: 0.6s;
          }

          .fade-label {
            opacity: 0;
            animation-delay: 0.9s;
          }

          .fade-input {
            opacity: 0;
            animation-delay: 1.2s;
          }

          .fade-button {
            opacity: 0;
            animation-delay: 1.5s;
          }

          .fade-footer {
            opacity: 0;
            animation-delay: 1.8s;
          }
        `}</style>

        <div className="max-w-md w-full text-center">
          {/* Animated Leaf Icon */}
          <div className={`mb-8 flex justify-center fade-element fade-leaf ${isVisible ? 'visible' : ''}`}>
            <LeafAnimation size="large" variant="default" />
          </div>
          
          {/* Names */}
          <h2 
            className={`text-4xl font-serif text-sage-700 mb-3 fade-element fade-names ${isVisible ? 'visible' : ''}`}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Andreea & Marcus
          </h2>
          
          {/* Subtitle */}
         {/* <p className={`text-gray-600 text-lg mb-12 fade-element fade-subtitle ${isVisible ? 'visible' : ''}`}>
            This is a private wedding website
          </p> */}

          {/* Label */}
          <label className={`block text-sm font-medium text-gray-700 mb-3 fade-element fade-label ${isVisible ? 'visible' : ''}`}>
            Enter Password from Your Invitation
          </label>
          
          {/* Input */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
            placeholder="Password"
            className={`w-full px-4 py-3 border-2 border-sage-300 bg-white rounded-md mb-2 focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-all text-center fade-element fade-input ${isVisible ? 'visible' : ''}`}
            required
          />
          
          {/* Error Message */}
          {error && (
            <p className="text-red-600 text-sm mb-4">{error}</p>
          )}

          {/* Button */}
          <button
            onClick={handleSubmit}
            className={`w-full bg-sage-600 text-white py-3 rounded-md hover:bg-sage-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] font-medium shadow-md mb-8 fade-element fade-button ${isVisible ? 'visible' : ''}`}
          >
            Enter
          </button>

          {/* Footer */}
          <p className={`text-xs text-gray-500 fade-element fade-footer ${isVisible ? 'visible' : ''}`}>
            Password is case-insensitive and can be found on your invitation
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default PasswordProtection;