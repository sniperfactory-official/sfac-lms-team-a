"use client";

import { Timestamp } from "firebase/firestore";
import React, { ChangeEvent, useEffect, useState } from "react";
import { LectureInfo } from "./CreateLecture";
import timestampToDate from "@/utils/timestampToDate";
import { DateSelector } from "sfac-designkit-react";

interface Props {
  startDate?: Timestamp;
  endDate?: Timestamp;
  setLecture: React.Dispatch<React.SetStateAction<LectureInfo>>;
}

interface Dates {
  startDate: Date;
  endDate: Date;
}

export default function LectureDateSelector({
  startDate,
  endDate,
  setLecture,
}: Props) {
  const [dates, setDates] = useState<Dates>({
    startDate: startDate ? new Date(timestampToDate(startDate)) : new Date(),
    endDate: endDate ? new Date(timestampToDate(endDate)) : new Date(),
  });

  const setChangeDate = (select: any) => {
    const [start, end] = select;
    setDates({
      startDate: start,
      endDate: end,
    });
  };

  useEffect(() => {
    if (dates.startDate && dates.endDate) {
      setLecture(prev => {
        return {
          ...prev,
          startDate: Timestamp.fromDate(dates.startDate),
          endDate: Timestamp.fromDate(dates.endDate),
        };
      });
    } else {
      setLecture(prev => {
        return {
          ...prev,
          startDate: Timestamp.fromDate(dates.startDate),
          endDate: Timestamp.fromDate(
            new Date(
              Timestamp.fromDate(dates.startDate).toMillis() +
                7 * 24 * 60 * 60 * 1000,
            ),
          ),
        };
      });
    }
  }, [dates]);

  return (
    <div className="flex gap-2 items-center">
      <label className="text-[16px] font-bold">수강 기간</label>
      <DateSelector
        selected={dates.startDate}
        startDate={dates.startDate}
        endDate={dates.endDate}
        ChangeDate={setChangeDate}
      />
    </div>
  );
}
