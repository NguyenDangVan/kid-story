// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "kid-story-4db8f.firebaseapp.com",
  projectId: "kid-story-4db8f",
  storageBucket: "kid-story-4db8f.firebasestorage.app",
  messagingSenderId: "606952997963",
  appId: "1:606952997963:web:72a529384a2eed1f85f9ce",
  measurementId: "G-4YLLYPV6ZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);
