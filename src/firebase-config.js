import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAW1QeSbF0Y0_ryBOIm9sZVH-aTNl47Fgs",
    authDomain: "firefly-49286.firebaseapp.com",
    projectId: "firefly-49286",
    storageBucket: "firefly-49286.appspot.com",
    messagingSenderId: "537208436176",
    appId: "1:537208436176:web:afc9faa18b2c6dd1adb5d5",
    measurementId: "G-JKQFZDWW4P"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
