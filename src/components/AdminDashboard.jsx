import React, { useState, useEffect } from 'react';
import { RefreshCw, Download } from 'lucide-react';
import { getRSVPs } from '../utils/rsvpService';
import { useLanguage } from '../i18n/LanguageContext';

const ADMIN_PASSWORD = 'BebeBride2026!';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (isAuthenticated) {
      loadRSVPs();
    }
  }, [isAuthenticated]);

  const loadRSVPs = async () => {
    setLoading(true);
    const result = await getRSVPs();
    if (result.success) {
      // Sort by timestamp, most recent first
      const sortedRsvps = result.data.sort((a, b) => {
        const timeA = a.timestamp?.toDate ? a.timestamp.toDate() : new Date(0);
        const timeB = b.timestamp?.toDate ? b.timestamp.toDate() : new Date(0);
        return timeB - timeA;
      });
      setRsvps(sortedRsvps);
    }
    setLoading(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError(t.admin.loginError);
    }
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Guest Name', 'Attending', 'Menu', 'Decline Reason'];
    const rows = rsvps.flatMap(rsvp => {
      const dateStr = rsvp.timestamp?.toDate ? 
        rsvp.timestamp.toDate().toLocaleDateString() : 'N/A';
      
      return rsvp.guests.map(guest => [
        dateStr,
        guest.name,
        guest.attending === 'yes' ? t.admin.table.yes : t.admin.table.no,
        guest.attending === 'yes' ? 
          (guest.menu === 'vegetarian' ? t.admin.meals.vegetarian.replace(':', '') : t.admin.meals.regular.replace(':', '')) : 
          t.admin.table.na,
        guest.attending === 'no' && rsvp.declineMessage ? rsvp.declineMessage : ''
      ]);
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rsvps_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Calculate statistics
  const totalSubmissions = rsvps.length;
  const totalGuests = rsvps.reduce((sum, rsvp) => sum + (rsvp.totalGuests || 0), 0);
  const attendingGuests = rsvps.reduce((sum, rsvp) => sum + (rsvp.attendingCount || 0), 0);
  const notAttendingGuests = totalGuests - attendingGuests;

  // Calculate meal preferences
  const allGuests = rsvps.flatMap(rsvp => rsvp.guests || []);
  const attendingGuestsOnly = allGuests.filter(g => g.attending === 'yes');
  const regularMeals = attendingGuestsOnly.filter(g => g.menu === 'normal').length;
  const vegetarianMeals = attendingGuestsOnly.filter(g => g.menu === 'vegetarian').length;

  // Flatten all guests with their submission info
  const allGuestsWithInfo = rsvps.flatMap(rsvp => 
    (rsvp.guests || []).map(guest => ({
      ...guest,
      submittedAt: rsvp.timestamp,
      declineMessage: rsvp.declineMessage
    }))
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50 to-cream-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <h1 className="text-3xl text-sage-700 mb-6 text-center">
            {t.admin.loginTitle}
          </h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.admin.loginPlaceholder}
                className="w-full px-4 py-3 border border-sage-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                style={{ fontSize: '16px' }}
              />
            </div>
            
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            
            <button
              type="submit"
              className="w-full bg-sage-600 text-white py-3 rounded-md hover:bg-sage-700 transition-colors font-medium"
            >
              {t.admin.loginButton}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-cream-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl text-sage-700">
              {t.admin.dashboardTitle}
            </h1>
            <div className="flex gap-3">
              <button
                onClick={loadRSVPs}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-sage-600 text-white rounded-md hover:bg-sage-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                {loading ? t.admin.buttons.refreshing : t.admin.buttons.refresh}
              </button>
              <button
                onClick={exportToCSV}
                disabled={rsvps.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-sage-600 text-white rounded-md hover:bg-sage-700 transition-colors disabled:opacity-50"
              >
                <Download size={18} />
                {t.admin.buttons.export}
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              {t.admin.stats.submissions}
            </h3>
            <p className="text-4xl font-bold text-sage-700">{totalSubmissions}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              {t.admin.stats.totalGuests}
            </h3>
            <p className="text-4xl font-bold text-sage-700">{totalGuests}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              {t.admin.stats.attending}
            </h3>
            <p className="text-4xl font-bold text-green-600">{attendingGuests}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              {t.admin.stats.notAttending}
            </h3>
            <p className="text-4xl font-bold text-red-600">{notAttendingGuests}</p>
          </div>
        </div>

        {/* Meal Preferences */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-sage-700 mb-4">
            {t.admin.meals.title}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">{t.admin.meals.regular} <span className="font-bold text-2xl text-sage-700">{regularMeals}</span></p>
            </div>
            <div>
              <p className="text-gray-600">{t.admin.meals.vegetarian} <span className="font-bold text-2xl text-sage-700">{vegetarianMeals}</span></p>
            </div>
          </div>
        </div>

        {/* Main Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">{t.admin.buttons.refreshing}</p>
            </div>
          ) : allGuestsWithInfo.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">{t.admin.table.noData}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-sage-100 border-b-2 border-sage-300">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-sage-700 uppercase tracking-wider">
                      {t.admin.table.date}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-sage-700 uppercase tracking-wider">
                      {t.admin.table.guestName}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-sage-700 uppercase tracking-wider">
                      {t.admin.table.attending}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-sage-700 uppercase tracking-wider">
                      {t.admin.table.menu}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-sage-700 uppercase tracking-wider">
                      {t.admin.declineReason}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allGuestsWithInfo.map((guest, idx) => {
                    const dateStr = guest.submittedAt?.toDate ? 
                      guest.submittedAt.toDate().toLocaleDateString() + ' ' + 
                      guest.submittedAt.toDate().toLocaleTimeString() 
                      : 'N/A';
                    
                    const hasDeclineMessage = guest.attending === 'no' && guest.declineMessage;
                    
                    return (
                      <tr key={idx} className={`hover:bg-gray-50 ${hasDeclineMessage ? 'bg-red-50' : ''}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {dateStr}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {guest.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            guest.attending === 'yes' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {guest.attending === 'yes' ? t.admin.table.yes : t.admin.table.no}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {guest.attending === 'yes' 
                            ? (guest.menu === 'vegetarian' ? t.admin.meals.vegetarian.replace(':', '') : t.admin.meals.regular.replace(':', ''))
                            : t.admin.table.na
                          }
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {hasDeclineMessage ? (
                            <span className="italic text-red-700">"{guest.declineMessage}"</span>
                          ) : (
                            <span className="text-gray-400">{guest.attending === 'no' ? t.admin.noReason : '-'}</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;