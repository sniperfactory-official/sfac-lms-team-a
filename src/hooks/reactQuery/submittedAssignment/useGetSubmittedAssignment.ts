import { Attachment, SubmittedAssignment, User } from "@/types/firebase.types";
import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";
import {
  DocumentData,
  DocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const getSubmittedAssignment = async (docId: string) => {
  const attachmentsCollectionRef = collection(db, "attachments");
  const submittedAssignmentRef = doc(db, "submittedAssignments", docId);

  const submittedAssignmentSnapshot = await getDoc(submittedAssignmentRef);
  const submittedAssignmentData =
    submittedAssignmentSnapshot.data() as SubmittedAssignment;

  const querySnapshot = await getDocs(
    query(
      attachmentsCollectionRef,
      where("submittedAssignmentId", "==", submittedAssignmentRef),
    ),
  );

  return Promise.all(
    querySnapshot.docs.map(async (doc: DocumentSnapshot<DocumentData>) => {
      const attachments = doc.data() as Attachment;
      let user;

      if (attachments.userId) {
        const userSnapshot = await getDoc(attachments.userId);
        if (userSnapshot.exists()) {
          user = userSnapshot.data() as User;
        }
      }
      return {
        user,
        attachmentFiles: attachments.attachmentFiles,
        links: attachments.links,
        createdAt: submittedAssignmentData.createdAt,
      };
    }),
  );
};
const useGetSubmittedAssignment = (docId: string) => {
    const {data, isLoading, error} = useQuery(
    ["submittedAssignment", docId],
    () => getSubmittedAssignment(docId),
    {
      refetchOnWindowFocus: false,
    },
  );
  return { data, isLoading, error };
};

export default useGetSubmittedAssignment;
