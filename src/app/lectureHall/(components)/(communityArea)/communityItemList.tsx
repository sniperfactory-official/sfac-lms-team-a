import useGetLectureCommentQuery from "@/hooks/reactQuery/lecture/useGetLectureCommentQuery";
import { LectureComment } from "@/types/firebase.types";
import ReplyItem from "./ReplyItem";
import Image from "next/image";
import ClassRoomLoadingSpinner from "../LoadingSpinner";

// 댓글과 답글 둘 다 사용하기 위한 컴포넌트
// 답글의 경우 parentId를 넣어서 작동하려 함
const LectureCommunityItemList = ({
  selectId,
  parentId,
  userId,
  nowPlayTimeHandler,
  mentionHandler,
  modalCloseHandler,
}: {
  selectId: string;
  parentId: string;
  userId: string;
  nowPlayTimeHandler: (time: string) => void;
  mentionHandler: (inputText: string) => void;
  modalCloseHandler: () => void;
}) => {
  const { data, isLoading } = useGetLectureCommentQuery(
    selectId,
    parentId,
    "asc",
  );

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center p-10">
        <ClassRoomLoadingSpinner />
      </div>
    );
  } else if (!isLoading && data !== undefined) {
    return (
      <div className="relative">
        {data.map(e => (
          <div className="flex">
            <Image
              src="/images/replyCommentArrow.svg"
              width={20}
              height={20}
              alt="대댓글화살표이미지"
              className="ml-2 mr-2"
            />
            <ReplyItem
              nowPlayTimeHandler={nowPlayTimeHandler}
              userId={userId}
              lectureId={selectId}
              modalCloseHandler={modalCloseHandler}
              comment={e as LectureComment}
              key={e.id}
              mentionHandler={mentionHandler}
            />
          </div>
        ))}
      </div>
    );
  }
};

export default LectureCommunityItemList;
