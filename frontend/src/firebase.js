// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "boardme-js.firebaseapp.com",
  projectId: "boardme-js",
  storageBucket: "boardme-js.appspot.com",
  messagingSenderId: "328141306759",
  appId: "1:328141306759:web:fe0d4dd055fe560de0f122"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);