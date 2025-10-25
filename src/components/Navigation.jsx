import React from 'react';
import { Send, Home, Lock } from 'lucide-react';

const Navigation = ({ currentView, setView }) => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-sage-200">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-serif text-sage-700" style={{ fontFamily: 'Georgia, serif' }}>
          Andreea & Marcus
        </h1>
        <div className="flex gap-6">
          <button
            onClick={() => setView('rsvp')}
            className={`text-sm flex items-center gap-1 transition-colors ${
              currentView === 'rsvp'
                ? 'text-sage-700 font-medium'
                : 'text-gray-600 hover:text-sage-700'
            }`}
          >
            <Send size={16} /> RSVP
          </button>
          <button
            onClick={() => setView('landing')}
            className={`text-sm flex items-center gap-1 transition-colors ${
              currentView === 'landing'
                ? 'text-sage-700 font-medium'
                : 'text-gray-600 hover:text-sage-700'
            }`}
          >
            <Home size={16} /> Details
          </button>
          <button
            onClick={() => setView('admin')}
            className={`text-sm flex items-center gap-1 transition-colors ${
              currentView === 'admin'
                ? 'text-sage-700 font-medium'
                : 'text-gray-600 hover:text-sage-700'
            }`}
          >
            <Lock size={16} /> Admin
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;