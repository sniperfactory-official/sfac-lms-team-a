import { Timestamp } from "firebase/firestore";
import React, { ChangeEvent } from "react";
import { CreateLecture } from "./CreateLecture";

interface Props {
  setLecture: React.Dispatch<React.SetStateAction<CreateLecture>>;
}

export default function LectureTimestamp({ setLecture }: Props) {
  const setStartTime = (e: ChangeEvent<HTMLInputElement>) => {
    const startDate = new Date(e.target.value);
    setLecture(prev => {
      return { ...prev, startDate: Timestamp.fromDate(startDate) };
    });
  };

  const setEndTime = (e: ChangeEvent<HTMLInputElement>) => {
    const endDate = new Date(e.target.value);
    setLecture(prev => {
      return { ...prev, endDate: Timestamp.fromDate(endDate) };
    });
  };

  return (
    <div className="flex gap-2 items-center">
      <span>수강 기간</span>
      <label htmlFor="start" className="sr-only">
        Start Date
      </label>
      <input type="date" id="start" onChange={setStartTime} />
      <label htmlFor="end" className="sr-only">
        End Date
      </label>
      <input type="date" id="end" onChange={setEndTime} />
    </div>
  );
}
