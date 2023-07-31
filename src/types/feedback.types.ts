import { UseFormReturn } from "react-hook-form";
import { Feedback } from "./firebase.types";

export type UserFeedback = Pick<Feedback, Exclude<keyof Feedback, "id">>;

// 공통으로 사용되는 props
export interface BaseProps {
  docId: string;
  useFeedbackForm: UseFormReturn<UserFeedback>;
  onChangeInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setIsContent: React.Dispatch<React.SetStateAction<boolean>>;
  isContent?: boolean;
}

// FeedbackCard에서 사용되는 props
export interface FeedbackCardProps extends Omit<BaseProps, "isContent"> {
  feedback: Feedback;
  // setIsEdit: React.Dispatch<React.SetStateAction<string | null>>;
  // isEdit: boolean;
  setIsModalOn: React.Dispatch<React.SetStateAction<string | null>>;
  isModalOn: boolean;
}

export interface FeedbackFormCompProps
  extends Omit<BaseProps, "docId" | "setIsContent" | "setIsEdit"> {
  onSubmitFeedback: (data: UserFeedback) => Promise<void>;
}

export interface FeedbackUpdateProps
  extends Pick<FeedbackCardProps, "useFeedbackForm" | "feedback"> {
  handleUpdateFeedback: (data: UserFeedback) => Promise<void>;
  handleChangeToUpdate: () => void;
}
