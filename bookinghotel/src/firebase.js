// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEd95TeqAOXyWQBpp7YsRbu-ZNe5XOuao",
  authDomain: "booking-40e0a.firebaseapp.com",
  projectId: "booking-40e0a",
  storageBucket: "booking-40e0a.appspot.com",
  messagingSenderId: "759566154085",
  appId: "1:759566154085:web:6e804ffac5b2eae37cc98c",
  measurementId: "G-1YX1D6EJFZ"
};

// Initialize Firebase

initializeApp(firebaseConfig);
export const db = getFirestore()