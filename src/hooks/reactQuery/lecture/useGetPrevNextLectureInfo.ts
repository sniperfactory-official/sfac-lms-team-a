import { useQuery } from "@tanstack/react-query";
import { db } from "@/utils/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const getValidLectureId = async (
  courseId: string,
  comparator: "<" | ">",
  currentOrder: number,
) => {
  let order = currentOrder;
  let lectureId = null;

  while (!lectureId) {
    const q = query(
      collection(db, "lectures"),
      where("courseId", "==", courseId),
      where("order", comparator, order),
      comparator === "<" ? orderBy("order", "desc") : orderBy("order"),
      limit(1),
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) break;

    const lectureData = snapshot.docs[0].data();

    if (!lectureData.isPrivate) {
      lectureId = snapshot.docs[0].id;
    } else {
      order = lectureData.order;
    }
  }
  return lectureId;
};

const useGetPrevNextLectureInfo = (lectureId: string) => {
  return useQuery(["lectureNavigation", lectureId], async () => {
    const lectureDoc = await getDoc(doc(db, "lectures", lectureId));

    if (!lectureDoc.exists) {
      throw new Error("Lecture not found");
    }

    const { courseId, order } = lectureDoc.data() as {
      courseId: string;
      order: number;
    };

    const prevLectureId = await getValidLectureId(courseId, "<", order);
    const nextLectureId = await getValidLectureId(courseId, ">", order);

    return { prevLectureId, nextLectureId };
  });
};

export default useGetPrevNextLectureInfo;
