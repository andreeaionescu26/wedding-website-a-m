import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import LeafAnimation from './LeafAnimation';

const RSVPSuccessModal = ({ isOpen, onClose, hasAttendingGuests, onMessageSubmit }) => {
  const { t } = useLanguage();
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!hasAttendingGuests && message.trim()) {
      setIsSubmitting(true);
      await onMessageSubmit(message.trim());
      setIsSubmitting(false);
    }
    setMessage('');
    onClose();
  };

  const handleSkip = () => {
    setMessage('');
    onClose();
  };

  return (
    <>
      <style>{`
  @keyframes modalFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes modalSlideUp {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* Sparkle entrance animations - slower and smoother */
  @keyframes sparkleEntrance {
    0% {
      opacity: 0;
      transform: scale(0) rotate(-180deg);
    }
    60% {
      transform: scale(1.08) rotate(8deg);
    }
    100% {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes sparkleEntranceSmall {
    0% {
      opacity: 0;
      transform: scale(0) rotate(180deg);
    }
    60% {
      transform: scale(1.1) rotate(-8deg);
    }
    100% {
      opacity: 0.7;
      transform: scale(1) rotate(0deg);
    }
  }

  .sparkle-main {
    animation: sparkleEntrance 1s ease-out forwards;
    animation-delay: 0.3s;
    opacity: 0;
  }

  .sparkle-small-1 {
    animation: sparkleEntranceSmall 0.9s ease-out forwards;
    animation-delay: 0.5s;
    opacity: 0;
  }

  .sparkle-small-2 {
    animation: sparkleEntranceSmall 0.9s ease-out forwards;
    animation-delay: 0.65s;
    opacity: 0;
  }

  .modal-overlay {
    animation: modalFadeIn 0.5s ease-out;
  }

  .modal-content {
    animation: modalSlideUp 0.6s ease-out;
  }
`}</style>

      {/* Backdrop */}
      <div 
        className="modal-overlay fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleSkip}
      >
        {/* Modal */}
        <div 
          className="modal-content bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {/* Content */}
          <div className="text-center">
            {/* Sparkles Animation */}
            <div className="flex justify-center mb-6">
              <svg className="w-24 h-20 text-sage-600" viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                {/* Main center sparkle */}
                <path className="sparkle-main" style={{ transformOrigin: 'center' }} d="M16 2L18.5 9.5L26 12L18.5 14.5L16 22L13.5 14.5L6 12L13.5 9.5L16 2Z"/>
                {/* Top right small sparkle */}
                <path className="sparkle-small-1" style={{ transformOrigin: 'center' }} d="M26 3L26.8 5.2L29 6L26.8 6.8L26 9L25.2 6.8L23 6L25.2 5.2L26 3Z"/>
                {/* Bottom left small sparkle */}
                <path className="sparkle-small-2" style={{ transformOrigin: 'center' }} d="M6 15L6.8 17.2L9 18L6.8 18.8L6 21L5.2 18.8L3 18L5.2 17.2L6 15Z"/>
              </svg>
            </div>

            {/* Thank You Title */}
            <h2 className="text-3xl font-serif text-sage-700 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              {t.rsvpModal.thankYou}
            </h2>

            {/* Message based on attendance */}
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              {hasAttendingGuests ? t.rsvpModal.attending : t.rsvpModal.notAttending}
            </p>

            {/* Optional Message Input for declined guests */}
            {!hasAttendingGuests && (
              <div className="mb-6 text-left">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  {t.rsvpModal.messageLabel}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.rsvpModal.messagePlaceholder}
                  className="w-full px-4 py-3 text-base border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent bg-white transition-all resize-none"
                  rows={4}
                  style={{ fontSize: '16px' }}
                />
                <p className="text-md text-gray-500 mt-2 italic">
                  {t.rsvpModal.messageNote}
                </p>
              </div>
            )}

            {/* Button(s) */}
            {!hasAttendingGuests ? (
              <div className="space-y-3">
                {/* Submit with message button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-sage-600 text-white py-3.5 px-6 rounded-lg hover:bg-sage-700 transition-all shadow-md hover:shadow-lg font-medium text-base flex items-center justify-center gap-2 group disabled:bg-gray-400"
                >
                  <span>{isSubmitting ? t.rsvpModal.submitting : (message.trim() ? t.rsvpModal.submitMessage : t.rsvpModal.button)}</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Skip button (if they added a message) */}
                {message.trim() && (
                  <button
                    onClick={handleSkip}
                    className="w-full text-gray-600 hover:text-gray-800 py-2 text-sm transition-colors"
                  >
                    {t.rsvpModal.skipMessage}
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={handleSubmit}
                className="w-full bg-sage-600 text-white py-3.5 px-6 rounded-lg hover:bg-sage-700 transition-all shadow-md hover:shadow-lg font-medium text-base flex items-center justify-center gap-2 group"
              >
                <span>{t.rsvpModal.button}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RSVPSuccessModal;