import { doc, getDoc } from "@firebase/firestore";
import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";

const getLecture = async (docId: string) => {
  const docRef = doc(db, "lectures", docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("User not found");
  }
};

export default function fetchLectureInfo(docId: string) {
  return useQuery(["lectures", docId], async () => await getLecture(docId));
}
