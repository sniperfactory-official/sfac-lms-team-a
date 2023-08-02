import { Attachment, User } from "@/types/firebase.types";
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
      };
    }),
  );
};

const useGetSubmittedAssignment = (docId: string) => {
  return useQuery(
    ["submittedAssignment", docId],
    () => getSubmittedAssignment(docId),
    {
      refetchOnWindowFocus: false,
    },
  );
};

export default useGetSubmittedAssignment;
