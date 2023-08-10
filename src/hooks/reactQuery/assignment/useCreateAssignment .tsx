import { FormValue } from "@/app/assignment/(components)/(assignmentCreateModal)/Modal";
import { db } from "@/utils/firebase";
import { useQueryClient } from "@tanstack/react-query";
import {
  doc,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";

export const useCreateAssignment = (userId: string) => {
  const queryClient = useQueryClient();

  const createAssignment = async (data: FormValue) => {
    const userDocRef = doc(db, "users", userId);
    const assignmentsQuery = query(
      collection(db, "assignments"),
      orderBy("order", "desc"),
    );
    const querySnapshot = await getDocs(assignmentsQuery);
    const assignmentCount = querySnapshot.size;
    const docRef = await addDoc(collection(db, "assignments"), {
      title: data.title,
      level: data.level,
      content: data.content,
      images: data.images,
      createAt: data.createAt,
      updateAt: data.updateAt,
      startDate: data.startDate,
      endDate: data.endDate,
      readStudents: data.readStudents,
      order: assignmentCount,
      userId: userDocRef,
    });
    await queryClient.refetchQueries(["assignments"]);
  };

  return { createAssignment };
};
