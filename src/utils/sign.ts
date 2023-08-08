import { auth } from "@/utils/firebase";
import {
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  signOut,
} from "firebase/auth";

export const login = async (
  email: string,
  password: string,
): Promise<string> => {
  await setPersistence(auth, browserSessionPersistence);
  const result = await signInWithEmailAndPassword(auth, email, password);
  if (!result.user) {
    throw new Error("Failed to log in");
  }
  return result.user.uid;
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    alert(`error : ${error}`);
  }
};
