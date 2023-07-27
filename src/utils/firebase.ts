import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCc3R0n2ALsZIVcQdRooXMjjTYl7m-abRg",
  authDomain: "sniperfactory-lms.firebaseapp.com",
  projectId: "sniperfactory-lms",
  storageBucket: "sniperfactory-lms.appspot.com",
  messagingSenderId: "780057773316",
  appId: "1:780057773316:web:b9c45f9434044672247c51",
  measurementId: "G-3DW6BWMNXB",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
