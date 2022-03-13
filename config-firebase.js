const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyDIs4OeScVwrZvrwFlueKMX3YD-U5XvJ-k",
    authDomain: "observatoriobovino-bbcb9.firebaseapp.com",
    projectId: "observatoriobovino-bbcb9",
    storageBucket: "observatoriobovino-bbcb9.appspot.com",
    messagingSenderId: "44128638428",
    appId: "1:44128638428:web:4446f49b72de1068ccab19",
    measurementId: "G-7J3XN29J8T"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


module.exports = firebase;