import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import LeafAnimation from './LeafAnimation';

const LandingPage = ({ setView, setShowBurgerMenu }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    // Trigger initial fade-in
    setTimeout(() => setIsVisible(true), 100);

    // Scroll event listener for scroll-reveal animations AND burger menu visibility
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);
      
      // Show burger menu after scrolling past hero image (MOBILE ONLY)
      const isMobile = window.innerWidth < 1024;
      
      if (isMobile) {
        // On mobile: hide initially, show after scrolling past hero
        const threshold = 200;
        setShowBurgerMenu(scrollPosition > threshold);
      } else {
        // On desktop: always show
        setShowBurgerMenu(true);
      }
    };

    // Initial check on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // Handle window resize
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [setShowBurgerMenu]);

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
      /* All your existing styles stay the same */
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

      /* Text shimmer effect for names */
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
        color: #f8f5ee;
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

      /* Refined Minimal Timeline Styles */
      .timeline-container {
        position: relative;
      }

      /* Simple vertical line */
      .timeline-line {
        position: absolute;
        left: 20px;
        top: 0;
        bottom: 0;
        width: 1px;
        background: #c4d4b8;
      }

      @media (min-width: 768px) {
        .timeline-line {
          left: 32px;
        }
      }

      /* Timeline items */
      .timeline-item {
        position: relative;
        padding-left: 60px;
        margin-bottom: 2rem;
      }

      @media (min-width: 768px) {
        .timeline-item {
          padding-left: 90px;
          margin-bottom: 2.5rem;
        }
      }

      /* Simple dots */
      .timeline-dot {
        position: absolute;
        left: 15px;
        top: 8px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: white;
        border: 2px solid #67844c;
        z-index: 2;
        transition: transform 0.2s ease;
      }

      @media (min-width: 768px) {
        .timeline-dot {
          left: 27px;
          width: 12px;
          height: 12px;
        }
      }

      /* Wedding day dot - slightly larger with star */
      .timeline-dot-wedding {
        width: 18px;
        height: 18px;
        left: 12px;
        background: #67844c;
        border: 2px solid white;
        box-shadow: 0 0 0 2px #67844c;
      }

      @media (min-width: 768px) {
        .timeline-dot-wedding {
          left: 24px;
          width: 18px;
          height: 18px;
        }
      }

      /* Star icon */
      .wedding-star {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        width: 8px;
        height: 8px;
      }

      @media (min-width: 768px) {
        .wedding-star {
          width: 9px;
          height: 9px;
        }
      }

      /* Clean content cards */
      .timeline-content {
        background: white;
        border-radius: 8px;
        padding: 1.25rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        border: 1px solid rgba(103, 132, 103, 0.15);
        transition: all 0.3s ease;
      }

      @media (min-width: 768px) {
        .timeline-content {
          padding: 1.5rem;
        }
      }

      .timeline-content:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        transform: translateY(-2px);
      }

      .timeline-item:hover .timeline-dot {
        transform: scale(1.2);
      }

      /* Wedding day card - subtle distinction */
      .timeline-content-wedding {
        background: #fafaf8;
        border: 1px solid rgba(103, 132, 103, 0.2);
      }

      .timeline-content-wedding:hover {
        box-shadow: 0 3px 10px rgba(103, 132, 103, 0.12);
      }

      /* Floating animation for mail icon */
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
    `}</style>

    {/* Mobile: Single Column, Desktop: Two Column Layout */}
    <div className="lg:flex lg:h-screen">
      {/* Left Side - Hero Image (Mobile: normal flow, Desktop: sticky) */}
      <div className="lg:w-1/2 lg:sticky lg:top-0 lg:h-screen relative">
        <img
          src="wedding_landing_image.jpg"
          alt="Andreea and Marcus"
          className="w-full h-64 lg:h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-center text-cream-200 px-8 mb-14">
            <h1 className={`text-2xl md:text-5xl font-serif mb-4 md:mb-8 text-cream-200 font-heading fade-names ${isVisible ? 'visible' : ''} names-text`}>
              {t.landing.names}
            </h1>
           <p className={`text-md md:text-2xl font-light fade-subtitle ${isVisible ? 'visible' : ''}`}>
              {t.landing.tagline}
            </p> 
          </div>
        </div>
      </div>

      {/* Right Side - Scrollable Content */}
      <div className="lg:w-1/2 bg-cream-200 lg:overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 md:px-12 py-4 md:py-8">
          
          {/* Header Section */}
          <div className="text-center mt-1 mb-12">
            {/* Animated Leaf */}
            <div className={`mb-6 flex justify-center scale-75 md:scale-90 fade-header ${isVisible ? 'visible' : ''}`}>
              <LeafAnimation size="large" variant="horizontal"/>
            </div>
            
            <p className={`text-sage-700 font-normal text-3xl md:text-4xl mb-4 fade-content ${isVisible ? 'visible' : ''}`}>
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
            <h3 className="text-2xl font-serif text-sage-700 mb-4 flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
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

          {/* Accommodation Info */}
          <div className="mb-16 bg-white rounded-lg p-6 md:p-8 shadow-sm scroll-reveal">
            <h3 className="text-2xl font-serif text-sage-700 mb-4 flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {t.landing.accommodation.title}
            </h3>
            <p className="text-gray-700 text-lg">
              {t.landing.accommodation.text}
            </p>
          </div>

          {/* Refined Minimal Timeline */}
          <div className="mb-16 scroll-reveal">
            <h2 className="text-3xl font-normal text-sage-700 text-center mb-12">
              {t.landing.timeline.title}
            </h2>

            <div className="timeline-container relative">
              {/* Simple vertical line */}
              <div className="timeline-line"></div>

              {/* Friday */}
              <div className="timeline-item scroll-reveal">
                <div className="timeline-dot"></div>
                
                <div className="timeline-content">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                    <h3 className="text-2xl font-serif text-sage-700" style={{ fontFamily: 'Georgia, serif' }}>
                      {t.landing.timeline.friday.day}
                    </h3>
                    <span className="hidden md:block text-sm bg-sage-100 text-sage-700 px-3 py-1.5 rounded-full uppercase tracking-wide font-medium w-fit">
                      {t.landing.timeline.friday.dresscode}
                    </span>
                  </div>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-start gap-3">
                      <span className="text-sage-600 font-medium min-w-[100px]">{t.landing.timeline.friday.arrival}</span>
                      <span className="text-lg">{t.landing.timeline.friday.arrivalEvent}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-sage-600 font-medium min-w-[100px]">{t.landing.timeline.friday.evening}</span>
                      <span className="text-lg">{t.landing.timeline.friday.eveningEvent}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Saturday - Wedding Day */}
              <div className="timeline-item scroll-reveal">
                <div className="timeline-dot timeline-dot-wedding">
                  <svg className="wedding-star" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                
                <div className="timeline-content timeline-content-wedding">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                    <h3 className="text-2xl font-serif text-sage-700" style={{ fontFamily: 'Georgia, serif' }}>
                      {t.landing.timeline.saturday.day}
                    </h3>
                    <span className="text-sm bg-sage-600 text-white px-3 py-1.5 rounded-full uppercase tracking-wide font-semibold w-fit">
                      {t.landing.timeline.saturday.dresscode}
                    </span>
                  </div>
                  <div className="space-y-3 text-gray-700 mb-4">
                    <div className="flex items-start gap-3">
                      <span className="text-sage-600 font-medium min-w-[100px]">{t.landing.timeline.saturday.morning}</span>
                      <span className="text-lg">{t.landing.timeline.saturday.morningEvent}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-sage-600 font-medium min-w-[100px]">{t.landing.timeline.saturday.afternoon}</span>
                      <span className="text-lg">{t.landing.timeline.saturday.afternoonEvent}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-sage-600 font-medium min-w-[100px]">{t.landing.timeline.saturday.evening}</span>
                      <span className="text-lg">{t.landing.timeline.saturday.eveningEvent}</span>
                    </div>
                  </div>
                  <div className="pt-4 mt-4 border-t border-sage-200">
                    <div className="bg-white px-4 py-3 rounded border border-sage-200">
                      <strong className="text-sage-700">{t.landing.timeline.saturday.dresscodeLabel}</strong> <span className="text-base">{t.landing.timeline.saturday.dresscodeText}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sunday */}
              <div className="timeline-item scroll-reveal">
                <div className="timeline-dot"></div>
                
                <div className="timeline-content">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                    <h3 className="text-2xl font-serif text-sage-700" style={{ fontFamily: 'Georgia, serif' }}>
                      {t.landing.timeline.sunday.day}
                    </h3>
                    <span className="hidden md:block text-sm bg-sage-100 text-sage-700 px-3 py-1.5 rounded-full uppercase tracking-wide font-medium w-fit">
                      {t.landing.timeline.sunday.dresscode}
                    </span>
                  </div>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-start gap-3">
                      <span className="text-sage-600 font-medium min-w-[100px]">{t.landing.timeline.sunday.morning}</span>
                      <span className="text-lg">{t.landing.timeline.sunday.morningEvent}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dress Code */}
          <div className="mb-8 scroll-reveal">
            <h2 className="text-3xl font-normal text-sage-700 text-center mb-8">
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
                <p className="text-gray-600 italic text-base">
                  {t.landing.dresscode.formal.note}
                </p>
              </div>
            </div>
          </div>

          {/* Final RSVP Button */}
          <div className="text-center py-4 scroll-reveal">
            <div className="mb-2">
              <svg className="w-12 h-12 mx-auto text-sage-500 float-animation" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-3xl font-normal text-sage-700 mb-4">
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