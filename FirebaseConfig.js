// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIjtMWz8Cf1RcmJgY2gNqTh5z0s9UJ6SY",
  authDomain: "caminaseguroapp-01.firebaseapp.com",
  projectId: "caminaseguroapp-01",
  storageBucket: "caminaseguroapp-01.appspot.com",
  messagingSenderId: "611775996756",
  appId: "1:611775996756:web:55b8cd637a6cdd6f471ec1"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);


