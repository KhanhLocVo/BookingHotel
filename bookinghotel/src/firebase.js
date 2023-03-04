// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoS9pNNFqm4QUdSpPF6Eq3feA6AaNihGw",
  authDomain: "bookinghotel-a93c6.firebaseapp.com",
  projectId: "bookinghotel-a93c6",
  storageBucket: "bookinghotel-a93c6.appspot.com",
  messagingSenderId: "929231863170",
  appId: "1:929231863170:web:0cd548281a9ca42fade39b",
  measurementId: "G-DKMZ9MQ64R"
};

// Initialize Firebase

initializeApp(firebaseConfig);
export const db = getFirestore()