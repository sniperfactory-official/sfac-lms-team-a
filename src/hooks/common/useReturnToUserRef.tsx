import { db } from "@/utils/firebase";
import { doc } from "firebase/firestore";

export const useReturnToUserRef = (userId: string) => {
  const userRef = doc(db, "users", userId);

  return userRef;
};
