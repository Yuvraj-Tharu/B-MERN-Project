// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN_KEY,
  projectId: import.meta.env.VITE_PROJECT_ID_KEY,
  storageBucket: "b-mern-project.appspot.com",
  messagingSenderId: "695794166501",
  appId: import.meta.env.VITE_APP_ID_KEY,
  measurementId: "G-K6YH6PT1P6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
