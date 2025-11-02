import React from 'react';
import LeafAnimation from './LeafAnimation';

const LandingPage = ({ setView }) => {
  return (
    <div className="min-h-screen">
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
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                Andreea & Marcus
              </h1>
              <p className="text-lg md:text-xl font-light italic">We're getting married!</p>
            </div>
          </div>
        </div>

        {/* Right Side - Scrollable Content */}
        <div className="lg:w-1/2 bg-cream-200 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-6 md:px-12 py-12 md:py-16">
            
            {/* Header Section */}
            <div className="text-center mt-6 mb-12">
              {/* Animated Leaf - Horizontal variant */}
              <div className="mb-4 flex justify-center">
                  <LeafAnimation size="large" variant="inverted"/>
              </div>
                          
              
              <p className="text-sage-700 font-serif text-3xl md:text-4xl mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                Save the Date
              </p>
              
              <div className="space-y-2 text-gray-700 mb-6">
                <p className="text-xl font-light">26-28 June 2026</p>
                <p className="text-lg">Zabola Estate</p>
                <p className="text-md text-gray-600">Transylvania, Romania</p>
              </div>

              <button
                onClick={() => setView('rsvp')}
                className="bg-sage-600 text-white px-8 py-3 rounded-md hover:bg-sage-700 transition-colors shadow-md font-medium"
              >
                RSVP Now
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center my-12">
              <div className="h-px w-12 bg-sage-300"></div>
              <svg className="w-6 h-6 mx-4 text-sage-400" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <div className="h-px w-12 bg-sage-300"></div>
            </div>

            {/* Welcome Paragraph */}
            <div className="mb-16">
              <p className="text-gray-700 text-lg leading-relaxed text-center md:text-left">
                Andreea and Marcus are getting married on Saturday, 27th of June 2026 at Zabola Estate. 
                Join us for a weekend celebration from Friday to Sunday as we tie the knot, surrounded by 
                the people we love the most. We can't wait to share this with you.
              </p>
            </div>

            {/* Transportation Info */}
            <div className="mb-16 bg-white rounded-lg p-6 md:p-8 shadow-sm ">
              <h3 className="text-2xl font-serif text-sage-700 mb-4 flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Transportation for UK Guests
              </h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  We advise all UK guests to land at <strong>Henri Coandă International Airport (Otopeni)</strong> in Bucharest on <strong>Thursday, 25th June 2026</strong>.
                </p>
                <p className="bg-sage-50 p-4 rounded-md border border-sage-200">
                  <strong>Group Transportation:</strong> We will provide a bus from Bucharest to Zabola Estate departing at <strong>11:00 AM on Friday, 26th June</strong>. Pick-up location details will be shared closer to the date.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="mb-16">
              <h2 className="text-3xl font-serif text-sage-700 text-center mb-12" style={{ fontFamily: 'Georgia, serif' }}>
                Weekend Timeline
              </h2>

              <div className="relative">
                {/* Timeline vertical line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-sage-300 hidden md:block"></div>

                {/* Friday */}
                <div className="relative mb-12 md:ml-16">
                  <div className="absolute -left-16 top-1 w-8 h-8 rounded-full bg-sage-500 border-4 border-cream-200 hidden md:block"></div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex flex-wrap items-baseline gap-3 mb-3">
                      <h3 className="text-xl font-serif text-sage-700" style={{ fontFamily: 'Georgia, serif' }}>
                        Friday, 26th June
                      </h3>
                      <span className="text-xs bg-sage-100 text-sage-700 px-3 py-1 rounded-full uppercase tracking-wide">
                        Casual
                      </span>
                    </div>
                    <div className="space-y-2 text-gray-700">
                      <p><span className="font-medium">Afternoon</span> — Arrival & Check-in</p>
                      <p><span className="font-medium">Evening</span> — Welcome Evening & Garden Barbecue</p>
                    </div>
                  </div>
                </div>

                {/* Saturday - Wedding Day */}
                <div className="relative mb-12 md:ml-16">
                  <div className="absolute -left-16 top-1 w-8 h-8 rounded-full bg-sage-600 border-4 border-cream-200 hidden md:block">
                    <svg className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div className="bg-sage-50 rounded-lg p-6 shadow-sm border-2 border-sage-400">
                    <div className="flex flex-wrap items-baseline gap-3 mb-3">
                      <h3 className="text-xl font-serif text-sage-700" style={{ fontFamily: 'Georgia, serif' }}>
                        Saturday, 27th June
                      </h3>
                      <span className="text-xs bg-sage-600 text-white px-3 py-1 rounded-full uppercase tracking-wide font-medium">
                        Wedding Day
                      </span>
                    </div>
                    <div className="space-y-2 text-gray-700 mb-4">
                      <p><span className="font-medium">Morning</span> — Brunch</p>
                      <p><span className="font-medium">Afternoon</span> — Ceremony in the Garden</p>
                      <p><span className="font-medium">Evening</span> — Reception & Party</p>
                    </div>
                    <div className="pt-3 border-t border-sage-300">
                      <p className="text-sm text-gray-600 italic">
                        <strong>Godparents:</strong> Ioana and Cristi Roman
                      </p>
                    </div>
                    <div className="mt-3 text-xs bg-white px-3 py-2 rounded border border-sage-300">
                      <strong>Dress Code:</strong> Black Tie Optional / Formal Attire
                    </div>
                  </div>
                </div>

                {/* Sunday */}
                <div className="relative md:ml-16">
                  <div className="absolute -left-16 top-1 w-8 h-8 rounded-full bg-sage-500 border-4 border-cream-200 hidden md:block"></div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex flex-wrap items-baseline gap-3 mb-3">
                      <h3 className="text-xl font-serif text-sage-700" style={{ fontFamily: 'Georgia, serif' }}>
                        Sunday, 28th June
                      </h3>
                      <span className="text-xs bg-sage-100 text-sage-700 px-3 py-1 rounded-full uppercase tracking-wide">
                        Casual
                      </span>
                    </div>
                    <div className="space-y-2 text-gray-700">
                      <p><span className="font-medium">Morning</span> — Farewell Brunch</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dress Code */}
            <div className="mb-16">
              <h2 className="text-3xl font-serif text-sage-700 text-center mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                Dress Code
              </h2>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-serif text-sage-700 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                    Friday & Sunday — Casual
                  </h3>
                  <p className="text-gray-700">
                    Comfortable attire for garden activities and relaxed meals. Think smart casual with a touch of elegance—perfect for enjoying the estate's natural beauty.
                  </p>
                </div>

                <div className="bg-sage-50 rounded-lg p-6 shadow-sm border border-sage-300">
                  <h3 className="text-lg font-serif text-sage-700 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                    Saturday (Wedding Day) — Black Tie Optional / Formal Attire
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Floor-length gowns or elegant cocktail dresses. Tuxedos or dark suits. Think sophisticated garden celebration in a historic Transylvanian estate.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    The ceremony and reception will be held outdoors in the gardens—please consider footwear accordingly.
                  </p>
                </div>
              </div>
            </div>

            {/* Final RSVP Button */}
            <div className="text-center py-8">
              <div className="mb-6">
                <svg className="w-12 h-12 mx-auto text-sage-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-sage-700 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                Will You Join Us?
              </h3>
              <p className="text-gray-600 mb-6">
                Please let us know if you'll be able to celebrate with us
              </p>
              <button
                onClick={() => setView('rsvp')}
                className="bg-sage-600 text-white px-10 py-4 rounded-md hover:bg-sage-700 transition-colors shadow-md text-lg font-medium"
              >
                RSVP Now
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;