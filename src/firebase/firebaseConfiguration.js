import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: (import.meta.env.VITE_FIREBASE_APIKEY),
    authDomain: String(import.meta.env.VITE_FIREBASE_AUTHDOMAIN),
    projectId: String(import.meta.env.VITE_FIREBASE_PROJECTID),
    storageBucket: String(import.meta.env.VITE_FIREBASE_STORAGEBUCKET),
    messagingSenderId: String(import.meta.env.VITE_FIREBASE_MESSAGINGSENDER),
    appId: String(import.meta.env.VITE_FIREBASE_APPID),
    measurementId: String(import.meta.env.VITE_FIREBASE_MEASUREMENTID),
    // apiKey: "AIzaSyA7uSSuZguG-z_K6CYx6voKHku_MJImetw",
    // authDomain: "ecommerce-6dfad.firebaseapp.com",
    // projectId: "ecommerce-6dfad",
    // storageBucket: "ecommerce-6dfad.appspot.com",
    // messagingSenderId: "767839234541",
    // appId: "1:767839234541:web:fe42f5fda0eadff4199fe4",
    // measurementId: "G-MKE2VEGZ8P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDb = getFirestore(app)
const auth = getAuth(app)
export { fireDb, auth, firebaseConfig }
