import React, { useState, useEffect } from 'react';
import { Users, Download } from 'lucide-react';
import { getAllRSVPs, exportToCSV } from '../utils/rsvpService';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(false);

  // Change this to your desired admin password
  const ADMIN_PASSWORD = 'BebeBride2026';

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      loadRSVPs();
    } else {
      alert('Incorrect password');
    }
  };

  const loadRSVPs = async () => {
    setLoading(true);
    const result = await getAllRSVPs();
    if (result.success) {
      setRsvps(result.data);
    } else {
      alert('Failed to load RSVPs');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadRSVPs();
    }
  }, [isAuthenticated]);

  // Calculate statistics
  const totalSubmissions = rsvps.length;
  const totalGuests = rsvps.reduce((sum, rsvp) => sum + rsvp.totalGuests, 0);
  const totalAttending = rsvps.reduce((sum, rsvp) => sum + rsvp.attendingCount, 0);
  const vegetarianCount = rsvps.reduce((sum, rsvp) => {
    return sum + rsvp.guests.filter(g => g.menu === 'vegetarian' && g.attending === 'yes').length;
  }, 0);
  const normalCount = rsvps.reduce((sum, rsvp) => {
    return sum + rsvp.guests.filter(g => g.menu === 'normal' && g.attending === 'yes').length;
  }, 0);

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-light text-center text-teal-800 mb-6">
            Admin Login
          </h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Enter password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Login
          </button>
         
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-light text-teal-800 mb-8">
        Admin Dashboard
      </h2>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-gray-600 text-sm mb-1">Total Submissions</div>
          <div className="text-3xl font-light text-teal-800">{totalSubmissions}</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-gray-600 text-sm mb-1">Total Guests</div>
          <div className="text-3xl font-light text-teal-800">{totalGuests}</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-gray-600 text-sm mb-1">Attending</div>
          <div className="text-3xl font-light text-green-600">{totalAttending}</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-gray-600 text-sm mb-1">Not Attending</div>
          <div className="text-3xl font-light text-red-600">{totalGuests - totalAttending}</div>
        </div>
      </div>

      {/* Meal Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-light text-teal-800 mb-4">Meal Preferences</h3>
        <div className="flex gap-8">
          <div>
            <span className="text-gray-600">Regular:</span>
            <span className="ml-2 font-medium text-lg">{normalCount}</span>
          </div>
          <div>
            <span className="text-gray-600">Vegetarian:</span>
            <span className="ml-2 font-medium text-lg">{vegetarianCount}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={loadRSVPs}
          disabled={loading}
          className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-400 flex items-center gap-2"
        >
          <Users size={18} />
          {loading ? 'Loading...' : 'Refresh Data'}
        </button>
        <button
          onClick={() => exportToCSV(rsvps)}
          className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
        >
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {/* RSVP List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-teal-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-teal-800">Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-teal-800">Guest Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-teal-800">Attending</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-teal-800">Menu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rsvps.map((rsvp) => (
                rsvp.guests.map((guest, gIndex) => (
                  <tr key={`${rsvp.id}-${gIndex}`} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {gIndex === 0 ? new Date(rsvp.timestamp).toLocaleDateString() : ''}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{guest.name}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        guest.attending === 'yes' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {guest.attending === 'yes' ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {guest.attending === 'yes' ? guest.menu : 'N/A'}
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
          {rsvps.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No RSVPs yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;