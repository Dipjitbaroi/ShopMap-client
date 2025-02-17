// firebase.ts
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAmJMk9ERugEAOgrOqJDhXlHRxWobhlMhQ",
    authDomain: "shopmap-auth.firebaseapp.com",
    projectId: "shopmap-auth",
    storageBucket: "shopmap-auth.firebasestorage.app",
    messagingSenderId: "126545928331",
    appId: "1:126545928331:web:dea14aac36bf1d2965f48e",
    measurementId: "G-MCTNS63JVZ",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
