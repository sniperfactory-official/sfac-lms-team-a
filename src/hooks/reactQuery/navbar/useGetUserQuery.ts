import { doc, getDoc } from "@firebase/firestore";
import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";

const getUser = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    throw new Error("User not found");
  }
};

export default function fetchUserInfo(userId: string) {
  return useQuery(["users", userId], async () => await getUser(userId));
}
