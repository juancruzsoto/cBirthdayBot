import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLPic1kXD-AxUXDQZHqLADMtPWwxNFEp0",
  authDomain: "calendar-bd-71d86.firebaseapp.com",
  projectId: "calendar-bd-71d86",
  storageBucket: "calendar-bd-71d86.appspot.com",
  messagingSenderId: "702803305481",
  appId: "1:702803305481:web:330ded7e57bc7e4358c4d8",
  measurementId: "G-583X0XPZ3R",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth;

export { firebase, db,auth };