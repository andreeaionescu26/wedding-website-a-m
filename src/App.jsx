import React, { useState } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import Navigation from './components/Navigation';
import RSVPForm from './components/RSVPForm';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard';
import PasswordProtection from './components/PasswordProtection';

function App() {
  const [view, setView] = useState('rsvp');
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

  return (
    <LanguageProvider>
      <PasswordProtection>
        <div className="min-h-screen bg-cream-200">
          <Navigation currentView={view} setView={setView} showBurgerMenu={showBurgerMenu} />
          
          {view === 'rsvp' && <RSVPForm setView={setView} />}
          {view === 'landing' && <LandingPage setView={setView} setShowBurgerMenu={setShowBurgerMenu} />}
          {view === 'admin' && <AdminDashboard />}
        </div>
      </PasswordProtection>
    </LanguageProvider>
  );
}

export default App;