import { UseFormReturn } from "react-hook-form";
import { Feedback, User } from "./firebase.types";
import { DocumentData } from "firebase/firestore";

export type UserFeedback = Pick<Feedback, Exclude<keyof Feedback, "id">>;

// 공통으로 사용되는 props
export interface BaseProps {
  docId: string;
  userId: string;
  userData: DocumentData | undefined;
}

// FeedbackCard에서 사용되는 props
export interface FeedbackCardProps extends Omit<BaseProps, "isContent"> {
  useFeedbackForm: UseFormReturn<UserFeedback>;
  setIsEdit: React.Dispatch<React.SetStateAction<string | null>>;
  isEdit?: boolean;
  feedback?: Feedback;
  setIsModalOn: React.Dispatch<React.SetStateAction<string | null>>;
  isModalOn?: boolean;
  isFeedback: boolean;
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
