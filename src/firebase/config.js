// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5WYooA2s74oTsVTW0mEB7qwsUHByxTC8",
  authDomain: "react-app-curso-3e6db.firebaseapp.com",
  projectId: "react-app-curso-3e6db",
  storageBucket: "react-app-curso-3e6db.appspot.com",
  messagingSenderId: "1068768083555",
  appId: "1:1068768083555:web:9c93d7ddfec9f5f78c0256"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );