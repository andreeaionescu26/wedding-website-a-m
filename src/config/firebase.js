// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBl5sWc_QP5lsmLkYBmxeFyyY1NtExgw14",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "wedding-website-2026-a9de1.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "wedding-website-2026-a9de1",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "wedding-website-2026-a9de1.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "615864428692",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:615864428692:web:25f7cdd70581a84851ec81",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);