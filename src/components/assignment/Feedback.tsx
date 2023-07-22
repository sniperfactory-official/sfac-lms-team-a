import { getFeedbacks } from "@/utils/getFeedbacks";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface FeedbackProps {
  docId: string;
}

const Feedback = ({ docId }: FeedbackProps) => {
  const { data } = useQuery(["feedbacks", docId], () => getFeedbacks(docId));

  console.log(data);

  return <div>Feedback</div>;
};

export default Feedback;
