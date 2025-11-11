import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import LeafAnimation from './LeafAnimation';

const LandingPage = ({ setView }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    // Trigger initial fade-in
    setTimeout(() => setIsVisible(true), 100);

    // Scroll event listener for scroll-reveal animations
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll-reveal
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <style>{`
        /* Initial Load Fade-in Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Text shimmer effect for names - Fixed to not cut text */
        @keyframes shimmer {
          0% {
            text-shadow: 0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3);
          }
          50% {
            text-shadow: 0 0 20px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3);
          }
          100% {
            text-shadow: 0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3);
          }
        }

        .names-text {
          color: white;
          animation: shimmer 3s ease-in-out infinite;
        }

        /* Initial load animations */
        .fade-names {
          opacity: 0;
          animation: slideInFromTop 1.2s ease-out 0.2s forwards;
        }

        .fade-names.visible {
          animation: slideInFromTop 1.2s ease-out 0.2s forwards;
        }

        .fade-subtitle {
          opacity: 0;
        }

        .fade-subtitle.visible {
          animation: fadeInUp 1s ease-out 0.6s forwards;
        }

        .fade-header {
          opacity: 0;
        }

        .fade-header.visible {
          animation: fadeInScale 1s ease-out 0.3s forwards;
        }

        .fade-content {
          opacity: 0;
        }

        .fade-content.visible {
          animation: fadeInUp 1s ease-out 0.5s forwards;
        }

        .fade-button {
          opacity: 0;
        }

        .fade-button.visible {
          animation: fadeInScale 1s ease-out 0.8s forwards;
        }

        /* Scroll Reveal Animations */
        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .scroll-reveal.reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .scroll-reveal-left {
          opacity: 0;
          transform: translateX(-30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .scroll-reveal-left.reveal-visible {
          opacity: 1;
          transform: translateX(0);
        }

        /* Timeline Styles */
        .timeline-item {
          position: relative;
          padding-left: 0;
          transition: all 0.3s ease;
        }

        @media (min-width: 768px) {
          .timeline-item {
            padding-left: 4rem;
          }
        }

        .timeline-item:hover .timeline-content {
          transform: translateX(5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .timeline-dot {
          transition: all 0.3s ease;
        }

        .timeline-item:hover .timeline-dot {
          transform: scale(1.2);
          box-shadow: 0 0 0 8px rgba(103, 132, 103, 0.1);
        }

        .timeline-content {
          transition: all 0.3s ease;
        }

        /* Floating animation for heart icon */
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .float-animation {
          animation: float 3s ease-in-out infinite;
        }

        /* Staggered fade for timeline items */
        .timeline-item:nth-child(1) {
          transition-delay: 0.1s;
        }

        .timeline-item:nth-child(2) {
          transition-delay: 0.2s;
        }

        .timeline-item:nth-child(3) {
          transition-delay: 0.3s;
        }
      `}</style>

      {/* Desktop: Two Column Layout */}
      <div className="lg:flex lg:h-screen">
        {/* Left Side - Sticky Image */}
        <div className="lg:w-1/2 lg:sticky lg:top-0 lg:h-screen relative">
          <img
            src="wedding_landing_image.jpg"
            alt="Andreea and Marcus"
            className="w-full h-64 lg:h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="text-center text-white px-8">
              <h1 className={`text-3xl md:text-4xl lg:text-6xl font-serif mb-8 font-heading fade-names ${isVisible ? 'visible' : ''} names-text`}>
                {t.landing.names}
              </h1>
              <p className={`text-xl md:text-2xl font-light fade-subtitle ${isVisible ? 'visible' : ''}`}>
                {t.landing.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Scrollable Content */}
        <div className="lg:w-1/2 bg-cream-200 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-6 md:px-12 py-4 md:py-8">
            
            {/* Header Section */}
            <div className="text-center mt-1 mb-12">
              {/* Animated Leaf - Horizontal variant */}
              <div className={`mb-8 flex justify-center scale-75 md:scale-90 fade-header ${isVisible ? 'visible' : ''}`}>
                  <LeafAnimation size="large" variant="inverted"/>
              </div>
                          
              
              <p className={`text-sage-700 font-heading text-2xl md:text-3xl mb-8 fade-content ${isVisible ? 'visible' : ''}`}>
                {t.landing.saveDate}
              </p>
              
              <div className={`space-y-2 text-gray-700 mb-6 fade-content ${isVisible ? 'visible' : ''}`}>
                <p className="text-2xl font-light">{t.landing.dates}</p>
                <p className="text-xl">{t.landing.venue}</p>
                <p className="text-lg text-gray-600">{t.landing.location}</p>
              </div>

              <button
                onClick={() => setView('rsvp')}
                className={`bg-sage-600 text-white px-8 py-3 rounded-md hover:bg-sage-700 transition-colors shadow-md font-medium text-lg fade-button ${isVisible ? 'visible' : ''}`}
              >
                {t.landing.rsvpButton}
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center my-12 scroll-reveal">
              <div className="h-px w-12 bg-sage-300"></div>
              <svg className="w-6 h-6 mx-4 text-sage-400" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <div className="h-px w-12 bg-sage-300"></div>
            </div>

            {/* Welcome Paragraph */}
            <div className="mb-16 scroll-reveal">
              <p className="text-gray-700 text-xl leading-relaxed text-center md:text-left">
                {t.landing.welcome.text}
              </p>
            </div>

            {/* Transportation Info */}
            <div className="mb-16 bg-white rounded-lg p-6 md:p-8 shadow-sm scroll-reveal">
              <h3 className="text-3xl font-serif text-sage-700 mb-4 flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {t.landing.transportation.title}
              </h3>
              <div className="space-y-3 text-gray-700 text-lg">
                <p>
                  {t.landing.transportation.paragraph1} <strong>{t.landing.transportation.airport}</strong> {t.landing.transportation.paragraph2} <strong>{t.landing.transportation.date}</strong>.
                </p>
                <p className="bg-sage-50 p-4 rounded-md border border-sage-200">
                  <strong>{t.landing.transportation.groupTitle}</strong> {t.landing.transportation.groupText} <strong>{t.landing.transportation.time}</strong>. {t.landing.transportation.details}
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="mb-16 scroll-reveal">
              <h2 className="text-3xl font-heading text-sage-700 text-center mb-12">
                {t.landing.timeline.title}
              </h2>

              <div className="relative">
                {/* Timeline vertical line - minimal design */}
                <div className="absolute left-4 md:left-8 top-4 bottom-4 w-px bg-gradient-to-b from-sage-300 via-sage-400 to-sage-300 hidden md:block"></div>

                {/* Friday */}
                <div className="timeline-item relative mb-8 scroll-reveal">
                  {/* Minimal dot */}
                  <div className="timeline-dot absolute left-2.5 md:left-6.5 top-6 w-3 h-3 rounded-full bg-sage-500 border-2 border-white shadow-md"></div>
                  
                  <div className="timeline-content bg-white rounded-lg p-6 shadow-sm hover:shadow-md ml-8 md:ml-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                      <h3 className="text-2xl font-serif text-sage-700" style={{ fontFamily: 'Georgia, serif' }}>
                        {t.landing.timeline.friday.day}
                      </h3>
                      <span className="text-sm bg-sage-100 text-sage-700 px-3 py-1 rounded-full uppercase tracking-wide w-fit">
                        {t.landing.timeline.friday.dresscode}
                      </span>
                    </div>
                    <div className="space-y-2 text-gray-700 text-lg">
                      <div className="flex items-start gap-3">
                        <span className="text-sage-600 font-medium min-w-[80px]">{t.landing.timeline.friday.afternoon}</span>
                        <span>{t.landing.timeline.friday.afternoonEvent}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-sage-600 font-medium min-w-[80px]">{t.landing.timeline.friday.evening}</span>
                        <span>{t.landing.timeline.friday.eveningEvent}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Saturday - Wedding Day */}
                <div className="timeline-item relative mb-8 scroll-reveal">
                  {/* Special dot with star for wedding day */}
                  <div className="timeline-dot absolute left-1.5 md:left-5.5 top-6 w-5 h-5 rounded-full bg-sage-600 border-2 border-white shadow-lg flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  
                  <div className="timeline-content bg-gradient-to-br from-sage-50 to-white rounded-lg p-6 shadow-md hover:shadow-lg border border-sage-200 ml-8 md:ml-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                      <h3 className="text-2xl font-serif text-sage-700" style={{ fontFamily: 'Georgia, serif' }}>
                        {t.landing.timeline.saturday.day}
                      </h3>
                      <span className="text-sm bg-sage-600 text-white px-3 py-1 rounded-full uppercase tracking-wide font-medium w-fit">
                        {t.landing.timeline.saturday.dresscode}
                      </span>
                    </div>
                    <div className="space-y-2 text-gray-700 mb-4 text-lg">
                      <div className="flex items-start gap-3">
                        <span className="text-sage-600 font-medium min-w-[80px]">{t.landing.timeline.saturday.morning}</span>
                        <span>{t.landing.timeline.saturday.morningEvent}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-sage-600 font-medium min-w-[80px]">{t.landing.timeline.saturday.afternoon}</span>
                        <span>{t.landing.timeline.saturday.afternoonEvent}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-sage-600 font-medium min-w-[80px]">{t.landing.timeline.saturday.evening}</span>
                        <span>{t.landing.timeline.saturday.eveningEvent}</span>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-sage-200">
                      <p className="text-base text-gray-600 italic mb-3">
                        <strong>{t.landing.timeline.saturday.godparents}</strong> {t.landing.timeline.saturday.godparentsNames}
                      </p>
                      <div className="text-base bg-white px-3 py-2 rounded border border-sage-300">
                        <strong>{t.landing.timeline.saturday.dresscodeLabel}</strong> {t.landing.timeline.saturday.dresscodeText}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sunday */}
                <div className="timeline-item relative scroll-reveal">
                  {/* Minimal dot */}
                  <div className="timeline-dot absolute left-2.5 md:left-6.5 top-6 w-3 h-3 rounded-full bg-sage-500 border-2 border-white shadow-md"></div>
                  
                  <div className="timeline-content bg-white rounded-lg p-6 shadow-sm hover:shadow-md ml-8 md:ml-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                      <h3 className="text-2xl font-serif text-sage-700" style={{ fontFamily: 'Georgia, serif' }}>
                        {t.landing.timeline.sunday.day}
                      </h3>
                      <span className="text-sm bg-sage-100 text-sage-700 px-3 py-1 rounded-full uppercase tracking-wide w-fit">
                        {t.landing.timeline.sunday.dresscode}
                      </span>
                    </div>
                    <div className="space-y-2 text-gray-700 text-lg">
                      <div className="flex items-start gap-3">
                        <span className="text-sage-600 font-medium min-w-[80px]">{t.landing.timeline.sunday.morning}</span>
                        <span>{t.landing.timeline.sunday.morningEvent}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dress Code */}
            <div className="mb-4 scroll-reveal">
              <h2 className="text-3xl font-heading text-sage-700 text-center mb-8">
                {t.landing.dresscode.title}
              </h2>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm scroll-reveal">
                  <h3 className="text-xl font-serif text-sage-700 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                    {t.landing.dresscode.casual.title}
                  </h3>
                  <p className="text-gray-700 text-lg">
                    {t.landing.dresscode.casual.text}
                  </p>
                </div>

                <div className="bg-sage-50 rounded-lg p-6 shadow-sm border border-sage-300 scroll-reveal">
                  <h3 className="text-xl font-serif text-sage-700 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                    {t.landing.dresscode.formal.title}
                  </h3>
                  <p className="text-gray-700 mb-3 text-lg">
                    {t.landing.dresscode.formal.text}
                  </p>
                  <p className="text-base text-gray-600 italic">
                    {t.landing.dresscode.formal.note}
                  </p>
                </div>
              </div>
            </div>

            {/* Final RSVP Button */}
            <div className="text-center py-4 scroll-reveal">
              <div className="mb-6">
                <svg className="w-12 h-12 mx-auto text-sage-500 float-animation" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-serif text-sage-700 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                {t.landing.finalCta.title}
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                {t.landing.finalCta.subtitle}
              </p>
              <button
                onClick={() => setView('rsvp')}
                className="bg-sage-600 text-white px-10 py-4 rounded-md hover:bg-sage-700 transition-colors shadow-md text-lg font-medium"
              >
                {t.landing.finalCta.button}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;