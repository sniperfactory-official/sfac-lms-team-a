import useModifyLectureComment from "@/hooks/reactQuery/lecture/useModifyLectureComment";
import { LectureComment } from "@/types/firebase.types";
import { useState } from "react";
import { useForm } from "react-hook-form";

const LectureCommunityCommentModify = ({
  lectureId,
  comment,
  editHandler,
}: {
  lectureId: string;
  comment: LectureComment;
  editHandler: () => void;
}) => {

  const { mutate } = useModifyLectureComment({ lectureId });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
  });
  const [submitButtonDisable, setSubmitButtonDisable] = useState(true);
  return (
    <div className="w-full min-h-[90px] bg-white rounded-2xl p-4 flex items-center justify-center border-2 border-grayscale-10 mb-5">
      <div className="w-11">{comment.user?.profileImage}</div>
      <div className="w-full h-full">
        <div className="flex mb-2">
          <div className="mr-1 text-base font-bold">
            {comment.user?.username}
          </div>{" "}
          · <div className="text-grayscale-40 ml-1">{comment.user?.role}</div>
        </div>
        <form
          className="flex flex-col"
          onSubmit={handleSubmit(async data => {
            const sendData: { content: string; id: string } = {
              content: data.commentInput,
              id: comment.id,
            };
            mutate(sendData, {
              onSuccess: () => {
                editHandler();
              },
            });
          })}
        >
          <input
            placeholder="댓글을 입력해 주세요"
            className="w-full text-sm"
            {...register("commentInput", {
              value: comment.content,
              validate: value => {
                if (value && value.trim() !== "" && value.trim().length > 0) {
                  setSubmitButtonDisable(false);
                  return true;
                } else {
                  setSubmitButtonDisable(true);
                  return true;
                }
              },
            })}
          />
          <div className="ml-auto">
            <button
              onClick={editHandler}
              className={`bg-grayscale-5 text-grayscale-60 mr-5 text-sm w-28 h-9 rounded-lg`}
            >
              취소
            </button>
            <button
              type="submit"
              disabled={submitButtonDisable || isSubmitting}
              className={`bg-primary-80 text-white ml-auto text-sm w-28 h-9 rounded-lg`}
            >
              수정하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LectureCommunityCommentModify;
