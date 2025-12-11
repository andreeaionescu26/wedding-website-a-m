import { collection, addDoc, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export const submitRSVP = async (rsvpData) => {
  try {
    const docRef = await addDoc(collection(db, 'rsvps'), {
      ...rsvpData,
      timestamp: serverTimestamp(),
      declineMessage: null
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    return { success: false, error };
  }
};

export const updateRSVPMessage = async (rsvpId, message) => {
  try {
    const rsvpRef = doc(db, 'rsvps', rsvpId);
    await updateDoc(rsvpRef, {
      declineMessage: message,
      messageTimestamp: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating RSVP message:', error);
    return { success: false, error };
  }
};

export const getRSVPs = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'rsvps'));
    const rsvps = [];
    
    querySnapshot.forEach((doc) => {
      rsvps.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return { success: true, data: rsvps };
  } catch (error) {
    console.error('Error getting RSVPs:', error);
    return { success: false, error };
  }
};