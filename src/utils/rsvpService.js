import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

const RSVP_COLLECTION = 'rsvps';

// Submit a new RSVP
export const submitRSVP = async (rsvpData) => {
  try {
    const docRef = await addDoc(collection(db, RSVP_COLLECTION), {
      ...rsvpData,
      timestamp: new Date().toISOString(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    return { success: false, error: error.message };
  }
};

// Get all RSVPs
export const getAllRSVPs = async () => {
  try {
    const q = query(collection(db, RSVP_COLLECTION), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const rsvps = [];
    
    querySnapshot.forEach((doc) => {
      rsvps.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return { success: true, data: rsvps };
  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    return { success: false, error: error.message };
  }
};

// Export RSVPs to CSV format
export const exportToCSV = (rsvps) => {
  const headers = ['Submission Date', 'Guest Name', 'Attending', 'Menu Choice'];
  const rows = [];

  rsvps.forEach(rsvp => {
    const date = new Date(rsvp.timestamp).toLocaleDateString();
    rsvp.guests.forEach(guest => {
      rows.push([
        date,
        guest.name,
        guest.attending === 'yes' ? 'Yes' : 'No',
        guest.attending === 'yes' ? guest.menu : 'N/A'
      ]);
    });
  });

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `wedding-rsvps-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};