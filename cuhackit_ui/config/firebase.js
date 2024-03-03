// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAzUCOUaU8lv1PnULSH667uDvGqNKfqow",
  authDomain: "evkesla.firebaseapp.com",
  projectId: "evkesla",
  storageBucket: "evkesla.appspot.com",
  messagingSenderId: "41460140693",
  appId: "1:41460140693:web:5309c8f67aa85bb172299c",
  measurementId: "G-CV2J7TT1CG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export const db = getFirestore(app);
