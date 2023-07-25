import { db } from "@/utils/firebase"
import { useQuery } from "@tanstack/react-query"
import { DocumentData, collection, doc, getDocs, query, where } from "firebase/firestore"

const fetchLectureComment = async (docId: string) => {
    const q = query(collection(db, 'lectureComments'), where('lectureId', "==", doc(db, 'lectures', docId)))
    
    const letcureComments: DocumentData[] = [];
    await getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const letcureComment = doc.data();
            letcureComments.push(letcureComment);
        })
    })
    return letcureComments;
}

const useGetLectureCommentQuery = (docId:string) => {
    return useQuery(["LectureComment", docId], async () => await fetchLectureComment(docId), {refetchOnWindowFocus:false})
}
export default useGetLectureCommentQuery;