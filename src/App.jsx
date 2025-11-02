import React, { useState } from 'react';
import Navigation from './components/Navigation';
import RSVPForm from './components/RSVPForm';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard';
import PasswordProtection from './components/PasswordProtection';

function App() {
  const [view, setView] = useState('rsvp');

  return (
    <PasswordProtection>
      <div className="min-h-screen bg-cream-200">
        <Navigation currentView={view} setView={setView} />
        
        {view === 'rsvp' && <RSVPForm setView={setView} />}
        {view === 'landing' && <LandingPage setView={setView} />}
        {view === 'admin' && <AdminDashboard />}
      </div>
    </PasswordProtection>
  );
}

export default App;