import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
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
if (app.name && typeof window !== "undefined") {
  const analytics = getAnalytics(app);
}
export const db = getFirestore(app);

export const auth = getAuth();

export const login = (email: string, password: string) =>
  setPersistence(auth, browserSessionPersistence).then(() => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        return user.uid;
      })
      .catch(error => {
        const errorCode = error.code;
        if (errorCode === "auth/user-not-found") {
          alert("등록되지 않은 아이디입니다.");
        } else if (errorCode === "auth/wrong-password") {
          alert("비밀번호가 일치하지 않습니다.");
        } else {
          alert(errorCode);
        }
      });
  });
