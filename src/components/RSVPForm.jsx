import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { submitRSVP } from '../utils/rsvpService';
import LeafAnimation from './LeafAnimation';

const RSVPForm = ({ setView }) => {
  const [guests, setGuests] = useState([{ name: '', menu: 'normal', attending: 'yes' }]);
  const [submitting, setSubmitting] = useState(false);

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
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          {/* Animated Leaf - Horizontal variant */}
          <div className="mb-4 flex justify-center">
            <LeafAnimation size="large" variant="horizontal" />
          </div>
          
          <h2 className="text-4xl font-serif text-sage-700 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            RSVP
          </h2>
          <p className="text-gray-600 text-lg">
            We can't wait to celebrate with you
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-sage-300"></div>
            <p className="text-sm text-sage-600 tracking-wide">26-28 June 2026</p>
            <div className="h-px w-8 bg-sage-300"></div>
          </div>
        </div>

        <div>
          {guests.map((guest, index) => (
            <div key={index} className="mb-6 p-6 bg-cream-100 rounded-lg relative border border-sage-200">
              <div className="flex justify-between items-start mb-4">
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

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={guest.name}
                    onChange={(e) => updateGuest(index, 'name', e.target.value)}
                    className="w-full px-4 py-2 border border-sage-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-transparent bg-white"
                    placeholder="Enter guest name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Will you be attending? *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        value="yes"
                        checked={guest.attending === 'yes'}
                        onChange={(e) => updateGuest(index, 'attending', e.target.value)}
                        className="mr-2 text-sage-600 focus:ring-sage-500"
                      />
                      <span className="text-gray-700 group-hover:text-sage-700 transition-colors">
                        Yes, I'll be there
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        value="no"
                        checked={guest.attending === 'no'}
                        onChange={(e) => updateGuest(index, 'attending', e.target.value)}
                        className="mr-2 text-sage-600 focus:ring-sage-500"
                      />
                      <span className="text-gray-700 group-hover:text-sage-700 transition-colors">
                        Unable to attend
                      </span>
                    </label>
                  </div>
                </div>

                {guest.attending === 'yes' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Menu Choice *
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          value="normal"
                          checked={guest.menu === 'normal'}
                          onChange={(e) => updateGuest(index, 'menu', e.target.value)}
                          className="mr-2 text-sage-600 focus:ring-sage-500"
                        />
                        <span className="text-gray-700 group-hover:text-sage-700 transition-colors">
                          Regular
                        </span>
                      </label>
                      <label className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          value="vegetarian"
                          checked={guest.menu === 'vegetarian'}
                          onChange={(e) => updateGuest(index, 'menu', e.target.value)}
                          className="mr-2 text-sage-600 focus:ring-sage-500"
                        />
                        <span className="text-gray-700 group-hover:text-sage-700 transition-colors">
                          Vegetarian
                        </span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          <button
            onClick={addGuest}
            className="w-full mb-6 py-3 border-2 border-dashed border-sage-300 text-sage-700 rounded-lg hover:border-sage-500 hover:bg-sage-50 flex items-center justify-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Add Another Guest
          </button>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full bg-sage-600 text-white py-3 rounded-lg hover:bg-sage-700 transition-colors disabled:bg-gray-400 font-medium shadow-md"
          >
            {submitting ? 'Submitting...' : 'Submit RSVP'}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-sage-200 text-center">
          <button
            onClick={() => setView('landing')}
            className="text-sage-600 hover:text-sage-800 text-sm transition-colors"
          >
            Skip for now and view wedding details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default RSVPForm;