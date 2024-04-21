import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBV0XdIA08W3nlw52KyXf9oeeJDA09Sd64",
  authDomain: "chatting-project-f0e9b.firebaseapp.com",
  projectId: "chatting-project-f0e9b",
  storageBucket: "chatting-project-f0e9b.appspot.com",
  messagingSenderId: "700151908225",
  appId: "1:700151908225:web:ada0b572d060175de60a80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore();