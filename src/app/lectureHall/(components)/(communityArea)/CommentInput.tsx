"use client";
import useLectureCommentMutation from "@/hooks/reactQuery/lecture/useLectureCommentMutation";
import { RootState } from "@/redux/store";
import { LectureComment } from "@/types/firebase.types";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Timestamp } from "firebase/firestore";
import { ChangeEvent, useState } from "react";
import type { sendCommentDataType } from "@/hooks/reactQuery/lecture/useLectureCommentMutation";

const LectureCommentInput = ({
  lectureId,
  parentId,
  replyCount,
  modalCloseHandler,
}: {
  lectureId: string;
  parentId: string;
  replyCount: number;
  modalCloseHandler: () => void;
}) => {
  const { uid } = useSelector((store: RootState) => store.userId);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ mode: "onChange" });
  const { mutate } = useLectureCommentMutation(parentId);
  const [submitButtonDisable, setSubmitButtonDisable] = useState(true);
  return (
    <div className="w-full min-h-[90px] bg-white rounded-2xl p-4 flex items-center justify-center border border-grayscale-10">
      <div className="w-full h-full">
        <div className="w-full h-2/5">
          {/* 추후 프로필 이미지 들어갈 공간 */}
          캐서린 ˙ 수강생
        </div>
        <form
          onSubmit={handleSubmit(async data => {
            const sendData: sendCommentDataType = {
              content: data.commentInput,
              createdAt: Timestamp.now(),
              updatedAt: Timestamp.now(),
              letcurId: lectureId,
              parentId: parentId,
              replyCount: parentId !== "" ? replyCount + 1 : 0,
              uid: uid,
            };
            console.log("aaaa");
            mutate(
              { sendData },
              {
                onSuccess: () => {
                  modalCloseHandler();
                },
              },
            );
          })}
        >
          <input
            placeholder="댓글을 입력해 주세요"
            className="w-full"
            {...register("commentInput", {
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
          <button
            type="submit"
            disabled={submitButtonDisable || isSubmitting}
            className={`${
              submitButtonDisable || isSubmitting
                ? "bg-grayscale-70"
                : "bg-primary-90"
            }`}
          >
            업로드
          </button>
        </form>
      </div>
    </div>
  );
};

export default LectureCommentInput;
