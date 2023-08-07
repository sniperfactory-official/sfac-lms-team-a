import {
  doc,
  getDoc,
  DocumentReference,
  DocumentData,
} from "@firebase/firestore";
import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";

type UserData = {
  userRef: DocumentReference<DocumentData, DocumentData>;
  username: string;
  role: string;
  email: string;
};

const getUser = async (userId: string): Promise<UserData> => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return { userRef, ...userSnap.data() } as UserData;
  } else {
    throw new Error("User not found");
  }
};

export default function useFetchUserInfo(userId: string) {
  return useQuery(["users", userId], async () => await getUser(userId), {
    refetchOnWindowFocus: false,
  });
}
