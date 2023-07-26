import { initializeApp, FirebaseError } from "firebase/app";
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  signOut,
} from "firebase/auth";
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

export const login = async (email: string, password: string) => {
  try {
    await setPersistence(auth, browserSessionPersistence);
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user.uid;
  } catch (error) {
    const errorCode = (error as FirebaseError).code;
    if (errorCode === "auth/user-not-found") {
      alert("등록되지 않은 아이디입니다.");
    } else if (errorCode === "auth/wrong-password") {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      alert(errorCode);
    }
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    alert(`error : ${error}`);
  }
};
