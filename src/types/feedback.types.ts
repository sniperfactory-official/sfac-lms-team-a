import {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { Feedback } from "./firebase.types";
import { DocumentData } from "firebase/firestore";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

export type UserFeedback = Pick<Feedback, Exclude<keyof Feedback, "id">>;

// 공통으로 사용되는 props
export interface BaseProps {
  docId: string;
  userId: string;
  userData: DocumentData | undefined;
}

// FeedbackCard에서 사용되는 props
export interface FeedbackCardProps extends Omit<BaseProps, "isContent"> {
  setIsEdit: React.Dispatch<React.SetStateAction<string | null>>;
  isEdit?: boolean;
  feedback?: Feedback;
  setIsModalOn: React.Dispatch<React.SetStateAction<string | null>>;
  isModalOn?: boolean;
  isFeedback: boolean;
}

export interface FeedbackTextAreaProps
  extends Omit<
    FeedbackCardProps,
    "setIsModalOn" | "docId" | "userId" | "userData"
  > {
  handleSubmit: UseFormHandleSubmit<UserFeedback, undefined>;
  register: UseFormRegister<UserFeedback>;
  setValue: UseFormSetValue<UserFeedback>;
  trigger: UseFormTrigger<UserFeedback>;
  reset: UseFormReset<UserFeedback>;
  handleSubmitFeedback: (data: UserFeedback) => Promise<void>;
  setIsContent: Dispatch<SetStateAction<boolean>>;
  textAreaRef: MutableRefObject<HTMLTextAreaElement | null>;
}

// hooks types

interface BasicHookProps {
  docId: string;
}

export interface CreateFeedbackProps extends BasicHookProps {
  feedback: Pick<Feedback, Exclude<keyof Feedback, "id">>;
}

export interface DeleteFeedbackProps extends BasicHookProps {
  feedbackId: string;
}

export interface UpdateFeedbackProps extends CreateFeedbackProps {
  feedbackId: string;
}
