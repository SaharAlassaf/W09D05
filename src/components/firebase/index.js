// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeI6YK_RGclaBm7gNlus02bgEoQzEaL_s",
  authDomain: "social-media-e6d65.firebaseapp.com",
  projectId: "social-media-e6d65",
  storageBucket: "social-media-e6d65.appspot.com",
  messagingSenderId: "828926448763",
  appId: "1:828926448763:web:9beaf9924d5bb47358fede",
  measurementId: "G-NMY9XER66L"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };