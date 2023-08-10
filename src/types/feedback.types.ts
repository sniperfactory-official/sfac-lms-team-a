import { UseFormReturn } from "react-hook-form";
import { Feedback, User } from "./firebase.types";
import { DocumentData } from "firebase/firestore";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

export type UserFeedback = Pick<Feedback, Exclude<keyof Feedback, "id">>;

// 공통으로 사용되는 props
export interface BaseProps {
  docId: string;
  // userId: string;
  userData: User;
}

export interface FeedbackProps extends BaseProps {
  data: Feedback[] | undefined;
}

// FeedbackCard에서 사용되는 props
export interface FeedbackCardProps extends Omit<BaseProps, "isContent"> {
  setIsEdit: React.Dispatch<React.SetStateAction<string | null>>;
  isEdit?: boolean;
  feedback?: Feedback;
  setIsModalOn: React.Dispatch<React.SetStateAction<string | null>>;
  isModalOn?: boolean;
  isFeedback: boolean;
  // setIsFeedback: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FeedbackTextAreaProps
  extends Omit<
    FeedbackCardProps,
    "setIsModalOn" | "docId" | "userId" | "userData"
  > {
  useFeedbackForm: UseFormReturn<UserFeedback, any, undefined>;
  handleMutateFeedback: (data: UserFeedback) => Promise<void>;
  setIsContent: Dispatch<SetStateAction<boolean>>;
  textAreaRef: MutableRefObject<HTMLTextAreaElement | null>;
}

export interface FeedbackButtonProps
  extends Pick<FeedbackCardProps, "feedback" | "isEdit" | "isFeedback"> {
  textAreaRef: MutableRefObject<HTMLTextAreaElement | null>;
  handleChangeToUpdate: (id: string) => void;
  isContent: boolean;
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
