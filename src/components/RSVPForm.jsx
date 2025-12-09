import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { submitRSVP } from '../utils/rsvpService';
import { useLanguage } from '../i18n/LanguageContext';
import LeafAnimation from './LeafAnimation';

const RSVPForm = ({ setView }) => {
  const [guests, setGuests] = useState([{ name: '', menu: 'normal', attending: 'yes' }]);
  const [submitting, setSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Trigger fade-in animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const addGuest = () => {
    setGuests([...guests, { name: '', menu: 'normal', attending: 'yes' }]);
  };

  const removeGuest = (index) => {
    if (guests.length > 1) {
      setGuests(guests.filter((_, i) => i !== index));
    }
  };

  const updateGuest = (index, field, value) => {
    const updated = [...guests];
    updated[index][field] = value;
    setGuests(updated);
  };

  const handleSubmit = async () => {
    const emptyNames = guests.filter(g => !g.name.trim());
    if (emptyNames.length > 0) {
      alert(t.rsvp.nameError);
      return;
    }

    setSubmitting(true);

    const rsvpData = {
      guests: guests,
      totalGuests: guests.length,
      attendingCount: guests.filter(g => g.attending === 'yes').length
    };

    const result = await submitRSVP(rsvpData);

    if (result.success) {
      alert(t.rsvp.success);
      setGuests([{ name: '', menu: 'normal', attending: 'yes' }]);
      setView('landing');
    } else {
      alert(t.rsvp.error);
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 md:py-8">
      <div className="w-full max-w-6xl mx-auto">
        <style>{`
          /* Leaf - Simple fade */
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          /* Title - Dramatic slide from top with bounce */
          @keyframes slideInFromTopBounce {
            0% {
              opacity: 0;
              transform: translateY(-50px) scale(0.9);
            }
            60% {
              opacity: 1;
              transform: translateY(8px) scale(1.05);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          /* Subtitle - Elegant fade and scale */
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          /* Date divider - Expand from center with glow */
          @keyframes expandFromCenter {
            0% {
              opacity: 0;
              transform: scaleX(0);
            }
            50% {
              opacity: 1;
              transform: scaleX(1.1);
            }
            100% {
              opacity: 1;
              transform: scaleX(1);
            }
          }

          /* Guest cards - Slide up with bounce and fade */
          @keyframes slideUpBounce {
            0% {
              opacity: 0;
              transform: translateY(40px) scale(0.95);
            }
            60% {
              opacity: 1;
              transform: translateY(-5px) scale(1.02);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          /*Radio Input Colors*/
          input[type="radio"]:checked {
            background-color: #67844c;
            border-color: #67844c;
            accent-color: #67844c; /* This is the key property for radio buttons! */
          }

          input[type="radio"]:focus {
            outline-color: #67844c;
            border-color: #67844c;
            --tw-ring-color: #67844c;
          }

          input[type="radio"] {
            accent-color: #67844c; /* Apply to all radio buttons */
          }
          /* Buttons - Scale and glow */
          @keyframes scaleInGlow {
            0% {
              opacity: 0;
              transform: scale(0.9);
              box-shadow: 0 0 0 0 rgba(103, 132, 103, 0);
            }
            50% {
              opacity: 1;
              transform: scale(1.05);
              box-shadow: 0 0 20px 5px rgba(103, 132, 103, 0.3);
            }
            100% {
              opacity: 1;
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(103, 132, 103, 0);
            }
          }

          /* Footer - Gentle fade from bottom */
          @keyframes fadeInFromBottom {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Floating particles */
          @keyframes float {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
              opacity: 0.1;
            }
            50% {
              transform: translateY(-20px) rotate(180deg);
              opacity: 0.25;
            }
          }

          /* Apply animations */
          .fade-leaf {
            opacity: 0;
          }

          .fade-leaf.visible {
            animation: fadeIn 1s ease-out 0s forwards;
          }

          .fade-title {
            opacity: 0;
          }

          .fade-title.visible {
            animation: slideInFromTopBounce 1s ease-out 0.3s forwards;
          }

          .fade-subtitle {
            opacity: 0;
          }

          .fade-subtitle.visible {
            animation: fadeInScale 0.8s ease-out 0.7s forwards;
          }

          .fade-date {
            opacity: 0;
          }

          .fade-date.visible {
            animation: expandFromCenter 1s ease-out 1s forwards;
          }

          .fade-form {
            opacity: 0;
          }

          .fade-form.visible {
            animation: fadeInScale 0.8s ease-out 1.3s forwards;
          }

          .fade-footer {
            opacity: 0;
          }

          .fade-footer.visible {
            animation: fadeInFromBottom 0.8s ease-out 1.8s forwards;
          }

          /* Guest card entrance - staggered */
          .guest-card {
            animation: slideUpBounce 0.6s ease-out forwards;
          }

          .guest-card:nth-child(1) {
            animation-delay: 0.1s;
          }

          .guest-card:nth-child(2) {
            animation-delay: 0.3s;
          }

          .guest-card:nth-child(3) {
            animation-delay: 0.5s;
          }

          .guest-card:nth-child(4) {
            animation-delay: 0.7s;
          }

          /* Floating particles */
          .particle {
            position: absolute;
            width: 6px;
            height: 6px;
            background: rgba(103, 132, 103, 0.12);
            border-radius: 50%;
            animation: float 7s ease-in-out infinite;
            pointer-events: none;
          }

          .particle:nth-child(1) {
            top: 15%;
            left: 10%;
            animation-delay: 0s;
            animation-duration: 8s;
          }

          .particle:nth-child(2) {
            top: 50%;
            left: 85%;
            animation-delay: 1.5s;
            animation-duration: 9s;
          }

          .particle:nth-child(3) {
            top: 75%;
            left: 15%;
            animation-delay: 3s;
            animation-duration: 7s;
          }

          .particle:nth-child(4) {
            top: 30%;
            left: 70%;
            animation-delay: 2s;
            animation-duration: 8.5s;
          }

          .particle:nth-child(5) {
            top: 60%;
            left: 50%;
            animation-delay: 1s;
            animation-duration: 7.5s;
          }

          /* Smooth interactions */
          input:focus {
            transform: scale(1.01);
            box-shadow: 0 0 15px rgba(103, 132, 103, 0.2);
            transition: all 0.3s ease;
          }

          button:hover:not(:disabled) {
            transform: scale(1.02);
            transition: all 0.3s ease;
          }

          button:active:not(:disabled) {
            transform: scale(0.98);
          }

          .radio-option:hover {
            background-color: rgba(103, 132, 103, 0.05);
            transition: all 0.2s ease;
          }

          /* Form elements entrance */
          .form-element {
            opacity: 0;
            animation: fadeInScale 0.5s ease-out forwards;
          }

          .form-element:nth-child(1) {
            animation-delay: 0.2s;
          }

          .form-element:nth-child(2) {
            animation-delay: 0.4s;
          }

          .form-element:nth-child(3) {
            animation-delay: 0.6s;
          }
        `}</style>

        {/* Floating particles background */}
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>

        <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 relative">
          {/* Mobile: Centered Header (< 768px) */}
          <div className="md:hidden text-center mb-6">
            <div className={`flex justify-center fade-leaf ${isVisible ? 'visible' : ''}`}>
              <div className="scale-75">
                <LeafAnimation size="xlarge" variant="horizontal" />
              </div>
            </div>
            
            <h1 className={`text-5xl font-normal text-sage-700 mb-3 fade-title ${isVisible ? 'visible' : ''}`}>
              {t.rsvp.title}
            </h1>
            
            <p className={`text-gray-600 text-base mb-2 fade-subtitle ${isVisible ? 'visible' : ''}`}>
              {t.rsvp.subtitle}
            </p>
            
            <div className={`flex items-center justify-center gap-2 fade-date ${isVisible ? 'visible' : ''}`}>
              <div className="h-px w-6 bg-sage-300"></div>
              <p className="text-sm text-sage-600">{t.rsvp.dates}</p>
              <div className="h-px w-6 bg-sage-300"></div>
            </div>
          </div>

          {/* Desktop: Two Column Layout (≥ 768px) */}
          <div className="md:grid md:grid-cols-2 md:gap-16 md:items-center">
            
            {/* Left Column - Header (Desktop Only) - UNCHANGED */}
            <div className="hidden md:flex md:flex-col md:items-center md:justify-center text-center">
              <div className="w-full max-w-md pb-12">
                <div className={`flex justify-center mb-2 fade-leaf ${isVisible ? 'visible' : ''}`}>
                  <LeafAnimation size="large" variant="horizontal" />
                </div>
                
                <h1 className={`text-7xl font-normal text-sage-700 mb-4 fade-title ${isVisible ? 'visible' : ''}`}>
                  {t.rsvp.title}
                </h1>
                
                <p className={`text-gray-600 text-lg mb-4 fade-subtitle ${isVisible ? 'visible' : ''}`}>
                  {t.rsvp.subtitle}
                </p>
                
                <div className={`flex items-center justify-center gap-3 fade-date ${isVisible ? 'visible' : ''}`}>
                  <div className="h-px w-16 bg-sage-300"></div>
                  <p className="text-sage-600 whitespace-nowrap">{t.rsvp.dates}</p>
                  <div className="h-px w-16 bg-sage-300"></div>
                </div>
              </div>
            </div>

            {/* Right Column - Form (BIGGER FONTS) */}
            <div className="w-full mx-auto max-w-lg md:max-w-none">
              <div className={`fade-form ${isVisible ? 'visible' : ''}`}>
                {guests.map((guest, index) => (
                  <div key={index} className="guest-card mb-4 p-4 md:p-5 bg-cream-100 rounded-lg relative border border-sage-200 opacity-0">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg md:text-xl font-medium text-sage-700">
                        {t.rsvp.guest} {index + 1}
                      </h3>
                      {guests.length > 1 && (
                        <button
                          onClick={() => removeGuest(index)}
                          className="text-red-500 hover:text-red-700 transition-colors p-1 hover:bg-red-50 rounded"
                          aria-label="Remove guest"
                        >
                          <Trash2 size={18} className="md:w-5 md:h-5" />
                        </button>
                      )}
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      {/* Name Input */}
                      <div className="form-element">
                        <label className="block text-base md:text-lg font-medium text-gray-700 mb-1 md:mb-1.5">
                          {t.rsvp.fullName} {t.rsvp.required}
                        </label>
                        <input
                          type="text"
                          value={guest.name}
                          onChange={(e) => updateGuest(index, 'name', e.target.value)}
                          className="w-full px-3 md:px-4 py-2 md:py-3 text-base md:text-lg border border-sage-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-transparent bg-white transition-all"
                          placeholder={t.rsvp.placeholder}
                          style={{ fontSize: '16px' }}
                        />
                      </div>

                      {/* Attending Radio */}
                      <div className="form-element">
                        <label className="block text-base md:text-lg font-medium text-gray-700 mb-1.5">
                          {t.rsvp.attending} {t.rsvp.required}
                        </label>
                        <div>
                          <label className="flex items-center cursor-pointer group radio-option p-2 md:p-3 rounded-lg">
                            <input
                              type="radio"
                              value="yes"
                              checked={guest.attending === 'yes'}
                              onChange={(e) => updateGuest(index, 'attending', e.target.value)}
                              className="mr-2 md:mr-3 text-sage-600 focus:ring-sage-500 w-4 h-4 md:w-5 md:h-5"
                            />
                            <span className="text-base md:text-lg text-gray-700 group-hover:text-sage-700 transition-colors">
                              {t.rsvp.attendingYes}
                            </span>
                          </label>
                          <label className="flex items-center cursor-pointer group radio-option p-2 md:p-3 rounded-lg">
                            <input
                              type="radio"
                              value="no"
                              checked={guest.attending === 'no'}
                              onChange={(e) => updateGuest(index, 'attending', e.target.value)}
                              className="mr-2 md:mr-3 text-sage-600 focus:ring-sage-500 w-4 h-4 md:w-5 md:h-5"
                            />
                            <span className="text-base md:text-lg text-gray-700 group-hover:text-sage-700 transition-colors">
                              {t.rsvp.attendingNo}
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* Menu Choice */}
                      {guest.attending === 'yes' && (
                        <div className="form-element">
                          <label className="block text-base md:text-lg font-medium text-gray-700 mb-1.5">
                            {t.rsvp.menuChoice} {t.rsvp.required}
                          </label>
                          <div>
                            <label className="flex items-center cursor-pointer group radio-option p-2 md:p-3 rounded-lg">
                              <input
                                type="radio"
                                value="normal"
                                checked={guest.menu === 'normal'}
                                onChange={(e) => updateGuest(index, 'menu', e.target.value)}
                                className="mr-2 md:mr-3 text-sage-600 focus:ring-sage-500 w-4 h-4 md:w-5 md:h-5"
                              />
                              <span className="text-base md:text-lg text-gray-700 group-hover:text-sage-700 transition-colors">
                                {t.rsvp.menuRegular}
                              </span>
                            </label>
                            <label className="flex items-center cursor-pointer group radio-option p-2 md:p-3 rounded-lg">
                              <input
                                type="radio"
                                value="vegetarian"
                                checked={guest.menu === 'vegetarian'}
                                onChange={(e) => updateGuest(index, 'menu', e.target.value)}
                                className="mr-2 md:mr-3 text-sage-600 focus:ring-sage-500 w-4 h-4 md:w-5 md:h-5"
                              />
                              <span className="text-base md:text-lg text-gray-700 group-hover:text-sage-700 transition-colors">
                                {t.rsvp.menuVegetarian}
                              </span>
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Add Guest Button */}
                <button
                  onClick={addGuest}
                  className="w-full mb-4 py-2.5 md:py-3 border-2 border-dashed border-sage-300 text-sage-700 rounded-lg hover:border-sage-500 hover:bg-sage-50 flex items-center justify-center gap-2 transition-all text-base md:text-lg font-medium shadow-sm hover:shadow-md"
                >
                  <Plus size={20} className="md:w-6 md:h-6" />
                  {t.rsvp.addGuest}
                </button>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full bg-sage-600 text-white py-3 md:py-4 rounded-lg hover:bg-sage-700 transition-all disabled:bg-gray-400 font-medium shadow-md text-base md:text-lg hover:shadow-lg"
                >
                  {submitting ? t.rsvp.submitting : t.rsvp.submit}
                </button>

                {/* Footer */}
                <div className={`mt-4 pt-4 border-t border-sage-200 text-center fade-footer ${isVisible ? 'visible' : ''}`}>
                  <button
                    onClick={() => setView('landing')}
                    className="text-sage-600 hover:text-sage-800 text-base md:text-lg transition-colors"
                  >
                    {t.rsvp.skipLink}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSVPForm;