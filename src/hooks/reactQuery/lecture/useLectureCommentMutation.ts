import type { LectureComment } from "@/types/firebase.types";
import { db } from "@/utils/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addDoc, collection } from "firebase/firestore";

const commentInputPost = async({
    sendData
}: {
    sendData:LectureComment
    }) => {
    const docRef = await addDoc(collection(db, "lectureComments"), sendData)
    
    return docRef.id;
}

const useLectureCommentMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: commentInputPost
    })
}