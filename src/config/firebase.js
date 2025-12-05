// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBl5sWc_QP5lsmLkYBmxeFyyY1NtExgw14",
  authDomain: "wedding-website-2026-a9de1.firebaseapp.com",
  projectId: "wedding-website-2026-a9de1",
  storageBucket: "wedding-website-2026-a9de1.firebasestorage.app",
  messagingSenderId: "615864428692",
  appId: "1:615864428692:web:25f7cdd70581a84851ec81",
  measurementId: "G-269M8EM4JY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);