import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";

interface User {
  profileImage: string;
  email: string;
  role: string;
  createdAt: Date;
  username: string;
}

export default function fetchUserInfo() {
  return useQuery(["users"], async () => {
    const querySnapShot = await getDocs(collection(db, "users"));
    return querySnapShot.docs.map(doc => doc.data() as User);
  });
}
