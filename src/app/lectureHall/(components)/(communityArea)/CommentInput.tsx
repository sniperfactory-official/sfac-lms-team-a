"use client";
import useLectureCommentMutation from "@/hooks/reactQuery/lecture/useLectureCommentMutation";
import { RootState } from "@/redux/store";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Timestamp } from "firebase/firestore";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import type { sendCommentDataType } from "@/hooks/reactQuery/lecture/useLectureCommentMutation";
import Image from "next/image";
import ClassRoomLoadingSpinner from "../LoadingSpinner";
import { Avatar, Button, Text } from "sfac-designkit-react";

const addPrefixToText = (text: string, prefix: string): string => {
  return "@" + prefix + " " + text;
};

const LectureCommentInput = ({
  lectureId,
  parentId,
  replyCount,
  mention,
  modalCloseHandler,
  mentionHandler,
}: {
  lectureId: string;
  parentId: string;
  replyCount: number;
  mention: string;
  mentionHandler: (inputText: string) => void;
  modalCloseHandler: () => void;
}) => {
  const { id, username, role, profileImage } = useSelector(
    (store: RootState) => store.userInfo,
  );
  const [replyCountState, setReplyCountState] = useState(replyCount);
  useEffect(() => {
    if (mention !== "") {
      const inputText = inputTextData;
      const modifiedString = addPrefixToText(inputText, mention);
      setInputTextData(modifiedString);
      mentionHandler("");
    }
  }, [mention]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({ mode: "onChange" });
  const { mutate, isLoading: isMutating } = useLectureCommentMutation(parentId);
  const [inputTextData, setInputTextData] = useState("");
  const [submitButtonDisable, setSubmitButtonDisable] = useState(true);

  return (
    <div className="w-full min-h-[90px] bg-white rounded-2xl p-5 flex items-center justify-center border-2 border-grayscale-10">
      {isMutating && (
        <div className="inset-0 fixed bg-[rgba(0,0,0,0.3)] z-[1000000] flex justify-center items-center">
          <ClassRoomLoadingSpinner />
        </div>
      )}
      <div className="w-full h-full">
        <div className="w-full h-2/5 flex items-center mb-3">
          {/* 추후 프로필 이미지 들어갈 공간 */}
          <div className="w-10 relative h-10 mr-2 rounded-full border border-grayscale-10 overflow-hidden flex justify-center items-center">
            <Avatar
              src={profileImage}
              ring={false}
              className="object-cover w-full h-full rounded-full"
            />
          </div>
          <div className="flex mb-2 gap-[11px] items-center text-grayscale-60">
            <Text size="base" weight="medium">
              {username}{" "}
            </Text>
          </div>
        </div>
        <form
          className="flex flex-col"
          onSubmit={handleSubmit(async data => {
            const sendData: sendCommentDataType = {
              content: inputTextData,
              createdAt: Timestamp.now(),
              updatedAt: Timestamp.now(),
              letcurId: lectureId,
              parentId: parentId,
              replyCount: parentId !== "" ? replyCountState + 1 : 0,
              uid: id,
            };

            mutate(
              { sendData },
              {
                onSuccess: () => {
                  reset({
                    commentInput: "",
                  });
                  setInputTextData("");
                  setSubmitButtonDisable(true);
                  setReplyCountState(prev => prev + 1);
                  if (parentId === "") {
                    modalCloseHandler();
                  }
                },
              },
            );
          })}
        >
          <input
            placeholder="댓글을 입력해 주세요"
            className="w-full text-sm mb-3 border-b-2 p-3"
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
              onChange: (event: ChangeEvent<HTMLInputElement>) => {
                setInputTextData(prev => {
                  return event.target.value;
                });
              },
            })}
            value={inputTextData}
          />
          <Button
            type="submit"
            variant="primary"
            disabled={submitButtonDisable || isSubmitting}
            className={`${
              submitButtonDisable || isSubmitting
                ? "bg-grayscale-5 text-grayscale-20"
                : "bg-primary-80 text-white"
            } ml-auto text-sm w-28 h-9 rounded-lg flex items-center`}
            text="업로드"
            textSize="sm"
            textWeight="medium"
          ></Button>
        </form>
      </div>
    </div>
  );
};

export default LectureCommentInput;
