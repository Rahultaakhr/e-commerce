import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey:(import.meta.env.VITE_FIREBASE_APIKEY),
    authDomain: String(import.meta.env.VITE_FIREBASE_AUTHDOMAIN),
    projectId: String(import.meta.env.VITE_FIREBASE_PROJECTID),
    storageBucket: String(import.meta.env.VITE_FIREBASE_STORAGEBUCKET),
    messagingSenderId:String(import.meta.env.VITE_FIREBASE_MESSAGINGSENDER),
    appId: String(import.meta.env.VITE_FIREBASE_APPID),
    measurementId:String(import.meta.env.VITE_FIREBASE_MEASUREMENTID),
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDb = getFirestore(app)
const auth = getAuth(app)
export {fireDb,auth}
