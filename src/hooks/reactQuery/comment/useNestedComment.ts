import { collection, query, where, getDocs } from "@firebase/firestore";
import { db } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";

const getNestedComment = async (parentId: string) => {
  const nestedCommentQuery = query(
    collection(db, "posts"),
    where("parentId", "==", parentId),
  );
  const querySnapshot = await getDocs(nestedCommentQuery);

  const nestedComments = [];
  for (const doc of querySnapshot.docs) {
    const docData = doc.data();
    nestedComments.push(docData);
  }
  return nestedComments;
};

export default function useFetchUserNestedComment(parentId: string) {
  return useQuery(
    ["nestedComments", parentId],
    async () => await getNestedComment(parentId),
  );
}
