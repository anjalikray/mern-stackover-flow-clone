// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHrETmVUbKIkWjuORg-iWBSV9ZPlsOnW4",
  authDomain: "stackoverflow-clone-ae908.firebaseapp.com",
  projectId: "stackoverflow-clone-ae908",
  storageBucket: "stackoverflow-clone-ae908.appspot.com",
  messagingSenderId: "761013008582",
  appId: "1:761013008582:web:7843586e897e78ff26bfc7",
  measurementId: "G-J0HG2QPZDE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();