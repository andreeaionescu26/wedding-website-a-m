import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = { 
  apiKey: "AIzaSyDb1fHu746wlMyoqIgec_S0xC1RSYJPDKY",
  authDomain: "wedding-website-52be3.firebaseapp.com",
  projectId: "wedding-website-52be3",
  storageBucket: "wedding-website-52be3.firebasestorage.app",
  messagingSenderId: "206846172947",
  appId: "1:206846172947:web:8331b5d96b18a3eb0a04e6",
  measurementId: "G-37Y3RDD291"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);