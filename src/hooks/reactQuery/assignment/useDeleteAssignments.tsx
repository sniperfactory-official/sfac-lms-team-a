import { db } from "@/utils/firebase";
import {
  collection,
  doc,
  getDocs,
  writeBatch,
  WriteBatch,
} from "firebase/firestore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, usePathname, useRouter } from "next/navigation";

const batchDelete = (
  batch: WriteBatch,
  collectionName: string,
  deleteList: string[],
) => {
  deleteList.forEach(deleteItemId => {
    const documentRef = doc(db, collectionName, deleteItemId);
    batch.delete(documentRef);
  });
};

const getFilteredAndSortedAssignments = async (deleteList: string[]) => {
  const assignmentsRef = collection(db, "assignments");
  const assignmentsSnapshot = await getDocs(assignmentsRef);

  // 1. 데이터를 매핑하여 필요한 속성들을 추출
  const extractedAssignments = assignmentsSnapshot.docs.map(doc => ({
    ...(doc.data() as { id: string; order: number }),
    id: doc.id,
  }));
  // 2. 삭제 리스트에 없는 항목들만 필터링
  const filteredAssignments = extractedAssignments.filter(
    item => !deleteList.includes(item.id),
  );
  // 3. order 속성 순서로 정렬
  const sortedAssignments = filteredAssignments.sort(
    (a, b) => a.order - b.order,
  );
  // 4. order값 재지정.
  const finalAssignments = sortedAssignments.map((item, idx) => {
    item.order = idx;
    return item;
  });
  console.log(finalAssignments);
  return finalAssignments;
};

const deleteAssignments = async (deleteList: string[]) => {
  // 과제를 삭제하면 그과제의 연관 컬렉션(submittedAssignment와attachment)데이터들을 함께 삭제
  const batch = writeBatch(db);

  batchDelete(batch, "assignments", deleteList);

  const updatedAssignments = await getFilteredAndSortedAssignments(deleteList);
  updatedAssignments.forEach(assignment => {
    const assignmentRef = doc(db, "assignments", assignment.id);
    batch.update(assignmentRef, { order: assignment.order });
  });

  const submittedAssignmentsDeleteList = (
    await getDocs(collection(db, "submittedAssignments"))
  ).docs
    .filter(doc => deleteList.includes(doc.data().assignmentId.id))
    .map(doc => doc.id);
  // console.log(submittedAssignmentsDeleteList);
  batchDelete(batch, "submittedAssignments", submittedAssignmentsDeleteList);

  const attachmentsDeleteList = (
    await getDocs(collection(db, "attachments"))
  ).docs
    .filter(doc =>
      submittedAssignmentsDeleteList.includes(
        doc.data().submittedAssignmentId.id,
      ),
    )
    .map(doc => doc.id);
  // console.log(attachmentsDeleteList);
  batchDelete(batch, "attachments", attachmentsDeleteList);
  await batch.commit();

  return deleteList;
};

export const useDeleteAssignments = () => {
  const pathName = usePathname();
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation(deleteAssignments, {
    onSuccess: resultDeleteList => {
      queryClient.invalidateQueries(["assignments"]);
      queryClient.refetchQueries(["assignments"]);
      if (pathName !== "/assignment") {
        if (resultDeleteList.includes(String(params.assignmentId))) {
          router.push("/assignment");
        }
      }
    },
  });
};
