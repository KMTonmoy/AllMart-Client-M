import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCqb_CUp9LD-kmg8maG6nLeQ79oGTpC8_g",
    authDomain: "allmartauth.firebaseapp.com",
    projectId: "allmartauth",
    storageBucket: "allmartauth.firebasestorage.app",
    messagingSenderId: "154977947716",
    appId: "1:154977947716:web:5b0fb711e0daa5ace2ac11",
    measurementId: "G-89NTP1W840"
};

export const app = initializeApp(firebaseConfig);
