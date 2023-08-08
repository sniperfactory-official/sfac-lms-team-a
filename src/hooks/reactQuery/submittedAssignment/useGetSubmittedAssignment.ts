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
  updateDoc,
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
export const useGetSubmittedAssignment = (docId: string) => {
  return useQuery(
    ["submittedAssignment", docId],
    () => getSubmittedAssignment(docId),
    {
      refetchOnWindowFocus: false,
    },
  );
};

const getUsersByStudent = async () => {
  // const users = collection(db, "users");
  // const submittedAssignmentRef = doc(db, "submittedAssignments", docId);
  const q = query(collection(db, "users"), where("role", "==", "수강생"));
  const querySnapshot = await getDocs(q);
  return Promise.all(
    querySnapshot.docs.map(async doc => {
      const userDoc = doc.data() as Attachment;
      let user;
      if (userDoc.userId) {
        const userSnapshot = await getDoc(userDoc.userId);
        if (userSnapshot.exists()) {
          user = userSnapshot.data() as User;
        }
      }
      return { ...userDoc };
    }),
  );
};

export const useGetUsersByStudent = (docId: string) => {
  return useQuery(["submittedAssignment", docId], () => getUsersByStudent(), {
    refetchOnWindowFocus: false,
  });
};

export const pushReadStudent = async (userId: string, assignmentId: string) => {
  const user = await getDoc(doc(db, "users", userId));
  return new Promise(async (resolve, reject) => {
    if (user.data()?.role === "관리자") {
      try {
        const assignment = await getDoc(doc(db, "assignments", assignmentId));
        if (!assignment.data()?.readStudents.includes(userId)) {
          const c = assignment.data()?.readStudents.filter((data: string) => data !== "")
          // console.log(c)
          let pushRead = [...c, userId];
          updateDoc(doc(db, "assignments", assignmentId), {
            readStudents: pushRead,
          });
        }
        return assignment.data()?.readStudents;
      } catch (error) {
        throw new Error("error")
      }
    }
  });
  // if(user.data().role === "관리자"){
  //   const assignment = await getDoc(doc(db,'assignments',assignmentId))
  //   if(!assignment.data().readStudents.include(userId)){
  //     let pushRead = [...assignment.data().readStudents,userId]
  //     updateDoc(doc(db, 'assignments', assignmentId),{
  //       readStudents: pushRead
  //   })
  //   }
  // }
};

export const usePushReadStudent = (userId: string, assignmentId: string) => {
  return useQuery(
    ["pushReadStudent", assignmentId],
    () => pushReadStudent(userId, assignmentId),
    {
      refetchOnWindowFocus: false,
    },
  );
};
