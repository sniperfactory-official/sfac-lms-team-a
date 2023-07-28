import LoadingSpinner from "@/components/Loading/Loading";
import useGetLectureCommentQuery from "@/hooks/reactQuery/lecture/useGetLectureCommentQuery";
import { LectureComment } from "@/types/firebase.types";
import LectureCommunityItem from "./CommunityItem";


// 댓글과 답글 둘 다 사용하기 위한 컴포넌트
// 답글의 경우 parentId를 넣어서 작동하려 함
const LectureCommunityItemList = ({ selectId,parentId, modalOpenHandler} : {selectId:string,parentId:string, modalOpenHandler:(e:LectureComment) => void}) => {

    const { data, isFetching,isLoading } = useGetLectureCommentQuery(selectId,parentId);

    if (isFetching || isLoading) {
        return (
            <LoadingSpinner />
        )
    } else if (!isFetching && !isLoading && data !== undefined ) {
        return (
            <div className="relative">
                {data.map((e) => (
                    <LectureCommunityItem lectureId={ selectId }  comment={e as LectureComment} key={e.id} />
                 ))}
            </div>
    );
    }
}

export default LectureCommunityItemList;