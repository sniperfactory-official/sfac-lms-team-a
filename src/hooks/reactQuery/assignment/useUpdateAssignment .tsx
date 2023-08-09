import { FormValue } from "@/app/assignment/(components)/(assignmentCreateModal)/Modal";
import { db } from "@/utils/firebase";
import { useQueryClient } from "@tanstack/react-query";
import {
  doc,
  collection,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";

export const useUpdateAssignment = (
  userId: string,
  assignmentId: string,
  router: any,
) => {
  const queryClient = useQueryClient();

  const updateAssignment = async (data: FormValue) => {
    const userDocRef = doc(db, "users", userId);
    const assignmentsQuery = query(
      collection(db, "assignments"),
      orderBy("order", "desc"),
    );
    const querySnapshot = await getDocs(assignmentsQuery);
    const assignmentCount = querySnapshot.size;

    const assignment = doc(db, "assignments", assignmentId as string);
    const updateTimestamp = await updateDoc(assignment, {
      title: data.title,
      level: data.level,
      content: data.content,
      images: data.images,
      updateAt: serverTimestamp(),
      startDate: data.startDate,
      endDate: data.endDate,
    });
    router.refresh();
    await queryClient.refetchQueries(["assignments", assignmentId]);
  };

  return { updateAssignment };
};
