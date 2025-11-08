import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { submitRSVP } from '../utils/rsvpService';
import LeafAnimation from './LeafAnimation';

const RSVPForm = ({ setView }) => {
  const [guests, setGuests] = useState([{ name: '', menu: 'normal', attending: 'yes' }]);
  const [submitting, setSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
      alert('Please fill in all guest names');
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
      alert('Thank you! Your RSVP has been submitted successfully. 🎉');
      setGuests([{ name: '', menu: 'normal', attending: 'yes' }]);
      setView('landing');
    } else {
      alert('Failed to submit RSVP. Please try again or contact us directly.');
    }

    setSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-8">
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

        .fade-title {
          opacity: 0;
          animation-delay: 0.3s;
        }

        .fade-subtitle {
          opacity: 0;
          animation-delay: 0.6s;
        }

        .fade-date {
          opacity: 0;
          animation-delay: 0.9s;
        }

        .fade-form {
          opacity: 0;
          animation-delay: 1.2s;
        }

        .fade-footer {
          opacity: 0;
          animation-delay: 1.5s;
        }
      `}</style>

      <div className="bg-white rounded-lg shadow-lg p-4">
        {/* Compact Header */}
        <div className="text-center mb-6">
          {/* Animated Leaf */}
          <div className={`flex justify-center fade-element fade-leaf ${isVisible ? 'visible' : ''}`}>
            <div className="scale-75 md:scale-90">
              <LeafAnimation size="large" variant="horizontal" />
            </div>
          </div>
          
          {/* Animated Title */}
          <h2 className={`text-2xl md:text-3xl font-heading text-sage-700 mb-4 fade-element fade-title ${isVisible ? 'visible' : ''}`}>
            RSVP
          </h2>
          
          {/* Animated Subtitle - Updated to text-lg (18px) */}
          <p className={`text-gray-600 text-lg mb-2 fade-element fade-subtitle ${isVisible ? 'visible' : ''}`}>
            We can't wait to celebrate with you
          </p>
          
          {/* Animated Date Divider */}
          <div className={`flex items-center justify-center gap-2 fade-element fade-date ${isVisible ? 'visible' : ''}`}>
            <div className="h-px w-6 bg-sage-300"></div>
            <p className="text-sm text-sage-600">26-28 June 2026</p>
            <div className="h-px w-6 bg-sage-300"></div>
          </div>
        </div>

        {/* Animated Form */}
        <div className={`fade-element fade-form ${isVisible ? 'visible' : ''}`}>
          {guests.map((guest, index) => (
            <div key={index} className="mb-4 p-4 bg-cream-100 rounded-lg relative border border-sage-200">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-medium text-sage-700">
                  Guest {index + 1}
                </h3>
                {guests.length > 1 && (
                  <button
                    onClick={() => removeGuest(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  {/* Updated label to text-base (16px) for better accessibility */}
                  <label className="block text-base font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  {/* Updated input to text-lg (18px) - prevents iOS zoom and improves readability */}
                  <input
                    type="text"
                    value={guest.name}
                    onChange={(e) => updateGuest(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 text-lg border border-sage-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-transparent bg-white"
                    placeholder="Enter guest name"
                  />
                </div>

                <div>
                  {/* Updated label to text-base (16px) */}
                  <label className="block text-base font-medium text-gray-700 mb-1.5">
                    Will you be attending? *
                  </label>
                  <div className="flex gap-3">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        value="yes"
                        checked={guest.attending === 'yes'}
                        onChange={(e) => updateGuest(index, 'attending', e.target.value)}
                        className="mr-1.5 text-sage-600 focus:ring-sage-500"
                      />
                      {/* Updated radio label to text-lg (18px) */}
                      <span className="text-lg text-gray-700 group-hover:text-sage-700 transition-colors">
                        Yes, I'll be there
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        value="no"
                        checked={guest.attending === 'no'}
                        onChange={(e) => updateGuest(index, 'attending', e.target.value)}
                        className="mr-1.5 text-sage-600 focus:ring-sage-500"
                      />
                      {/* Updated radio label to text-lg (18px) */}
                      <span className="text-lg text-gray-700 group-hover:text-sage-700 transition-colors">
                        Unable to attend
                      </span>
                    </label>
                  </div>
                </div>

                {guest.attending === 'yes' && (
                  <div>
                    {/* Updated label to text-base (16px) */}
                    <label className="block text-base font-medium text-gray-700 mb-1.5">
                      Menu Choice *
                    </label>
                    <div className="flex gap-3">
                      <label className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          value="normal"
                          checked={guest.menu === 'normal'}
                          onChange={(e) => updateGuest(index, 'menu', e.target.value)}
                          className="mr-1.5 text-sage-600 focus:ring-sage-500"
                        />
                        {/* Updated radio label to text-lg (18px) */}
                        <span className="text-lg text-gray-700 group-hover:text-sage-700 transition-colors">
                          Regular
                        </span>
                      </label>
                      <label className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          value="vegetarian"
                          checked={guest.menu === 'vegetarian'}
                          onChange={(e) => updateGuest(index, 'menu', e.target.value)}
                          className="mr-1.5 text-sage-600 focus:ring-sage-500"
                        />
                        {/* Updated radio label to text-lg (18px) */}
                        <span className="text-lg text-gray-700 group-hover:text-sage-700 transition-colors">
                          Vegetarian
                        </span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Updated button text to text-lg (18px) */}
          <button
            onClick={addGuest}
            className="w-full mb-4 py-2.5 border-2 border-dashed border-sage-300 text-sage-700 rounded-lg hover:border-sage-500 hover:bg-sage-50 flex items-center justify-center gap-2 transition-colors text-lg"
          >
            <Plus size={20} />
            Add Another Guest
          </button>

          {/* Submit button text-lg (18px) */}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full bg-sage-600 text-white py-3 rounded-lg hover:bg-sage-700 transition-colors disabled:bg-gray-400 font-medium shadow-md text-lg"
          >
            {submitting ? 'Submitting...' : 'Submit RSVP'}
          </button>
        </div>

        {/* Animated Footer - Updated to text-base (16px) for better readability */}
        <div className={`mt-4 pt-4 border-t border-sage-200 text-center fade-element fade-footer ${isVisible ? 'visible' : ''}`}>
          <button
            onClick={() => setView('landing')}
            className="text-sage-600 hover:text-sage-800 text-base transition-colors"
          >
            Skip for now and view wedding details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default RSVPForm;