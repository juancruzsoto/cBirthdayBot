const { firebase,initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

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
initializeApp(firebaseConfig);

const db = getFirestore()

console.log(db)