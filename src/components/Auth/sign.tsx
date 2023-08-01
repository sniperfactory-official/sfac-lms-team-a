import { FirebaseError } from "firebase/app";
import { auth } from "@/utils/firebase";
import {
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  signOut,
} from "firebase/auth";

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
