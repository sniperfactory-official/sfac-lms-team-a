"use client";

import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { FormValue } from "./Modal";
import { UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";

interface ClickDate {
  isOpen: boolean;
  idx: string;
}

interface Weeks {
  first: number[];
  second: number[];
  third: number[];
  fourth: number[];
  fifth: number[];
  sixth: number[];
}

interface Data {
  title: string;
  level: "상" | "중" | "하" | undefined;
  content: string;
  isModal: boolean; //얘가 첫번째 모달에서 date picker 여는 변수
  todayDate: string;
  ids: string; //왼쪽 오른쪽 date picker
  startAt: string;
  endAt: string;
  createAt: Timestamp | null;
  order: number;
}

interface DatePickerProps {
  dataes: Data;
  setDataes: React.Dispatch<React.SetStateAction<Data>>;
  endD: UseFormRegisterReturn<"endDate">;
  setValue: UseFormSetValue<FormValue>
}

const handleMonth = (
  year: number,
  month: number,
  leapYear: boolean,
): number[] => {
  const monthFirstDay = new Date(`${year}-${month}`).getDay();
  if (
    month === 1 ||
    month === 3 ||
    month === 5 ||
    month === 7 ||
    month === 8 ||
    month === 10 ||
    month === 12
  ) {
    return [monthFirstDay, 31];
  } else if (month === 4 || month === 6 || month === 9 || month === 11) {
    return [monthFirstDay, 30];
  } else if (month === 2 && leapYear) {
    return [monthFirstDay, 29];
  } else {
    return [monthFirstDay, 28];
  }
};

const checkLeapYear = (year: number): boolean => {
  if (year % 400 == 0) {
    return true;
  } else if (year % 100 == 0) {
    return false;
  } else if (year % 4 == 0) {
    return true;
  } else {
    return false;
  }
};

const DatePicker: React.FC<DatePickerProps> = ({ dataes, setDataes,setValue,endD }) => {
  endD;
  const [clickDate, setClickDate] = useState<ClickDate>({
    isOpen: false,
    idx: "",
  });

  const date = new Date();
  const years = +date.toLocaleDateString().slice(0, 4);
  const months = +date.toLocaleDateString().slice(5, 7);
  const nowDay = +date.toLocaleDateString().slice(9, 11);
  // const months = date.toLocaleDateString().slice(5, 7).trim().length === 1 ? ("0"+date.toLocaleDateString().slice(5, 7).trim()) : +(date.toLocaleDateString().slice(5, 7).trim());
  // console.log(months)

  const [cal, setCal] = useState({
    year: +dataes.startAt.slice(0, 4) || years, //화살표 클릭하면 몇년 바뀜
    month: +dataes.startAt.slice(5, 7) || months, //화살표 클릭하면 몇달 바뀜
  });

  const [monthFirstDay, monthTotalDay] = handleMonth(
    cal.year,
    cal.month,
    checkLeapYear(cal.year),
  );

  const weeks: Weeks = {
    first: [],
    second: [],
    third: [],
    fourth: [],
    fifth: [],
    sixth: [],
  };
  // const days: Days = {sunday: [],monday: [],tuesday: [],wednesday: [],thursday: [],friday: [],saturday: []}
  // 6+31 monthFirstDay+monthTotalDay / 7 == 37 /7 5...2 == 6 그러면 MasetDataesth.ceil((monthFirstDay+monthTotalDay)/7)
  // tr 이 6개
  for (let i = monthFirstDay; i < monthFirstDay + monthTotalDay; i++) {
    switch (Math.floor(i / 7)) {
      case 0:
        weeks.first.push(i - monthFirstDay + 1);
        break;
      case 1:
        weeks.second.push(i - monthFirstDay + 1);
        break;
      case 2:
        weeks.third.push(i - monthFirstDay + 1);
        break;
      case 3:
        weeks.fourth.push(i - monthFirstDay + 1);
        break;
      case 4:
        weeks.fifth.push(i - monthFirstDay + 1);
        break;
      case 5:
        weeks.sixth.push(i - monthFirstDay + 1);
        break;
      default:
        break;
    }
  }
  if (weeks.first.length !== 7) {
    weeks.first.unshift(...Array(7 - weeks.first.length).fill(null));
  }

  const handleUpCalender: React.MouseEventHandler<HTMLSpanElement> = e => {
    e.stopPropagation();
    setCal(prev => {
      if (prev.month > 11) {
        prev.year += 1;
        prev.month = 0;
      }
      return { ...prev, month: prev.month + 1 };
    });
    setDataes(prev => {
      return { ...prev, isModal: true };
    });
  };

  const handleDownCalender: React.MouseEventHandler<HTMLSpanElement> = e => {
    e.stopPropagation();
    setCal(prev => {
      if (prev.month < 2) {
        prev.year -= 1;
        prev.month = 13;
      }
      return { ...prev, month: prev.month - 1 };
    });
    setDataes(prev => {
      return { ...prev, isModal: true };
    });
  };

  const dayClick: React.MouseEventHandler<HTMLDivElement> = e => {
    let id = e.currentTarget.id;
    setDataes(prev => {
      if (!dataes.startAt && !dataes.endAt) {
        // console.log("1");
        return {
          ...prev,
          isOpen: true,
          // idx: id,
          isModal: false,
          todayDate: `${cal.year} ${cal.month} ${id}`,
          startAt: `${cal.year} ${cal.month} ${id}`,
          endAt: ``,
        };
      } else if (!dataes.startAt && dataes.endAt) {
        if (cal.year > +dataes.endAt.slice(0, 4)) {
          // console.log("2");
          return {
            ...prev,
            isOpen: true,
            // idx: id,
            isModal: true,
            todayDate: `${cal.year} ${cal.month} ${id}`,
            startAt: dataes.startAt,
            endAt: `${cal.year} ${cal.month} ${id}`,
          };
        } else if (cal.month > +dataes.endAt.slice(5, 7)) {
          // console.log("3");
          return {
            ...prev,
            isOpen: true,
            // idx: id,
            isModal: true,
            todayDate: `${cal.year} ${cal.month} ${id}`,
            startAt: dataes.startAt,
            endAt: `${cal.year} ${cal.month} ${id}`,
          };
        } else if (id > dataes.endAt.slice(7, 9)) {
          // console.log("4");
          return {
            ...prev,
            isOpen: true,
            // idx: id,
            isModal: true,
            todayDate: `${cal.year} ${cal.month} ${id}`,
            startAt: dataes.startAt,
            endAt: `${cal.year} ${cal.month} ${id}`,
          };
        }
        // console.log("5");
        return {
          ...prev,
          isOpen: true,
          // idx: id,
          isModal: true,
          todayDate: `${cal.year} ${cal.month} ${id}`,
          startAt: `${cal.year} ${cal.month} ${id}`,
        };
      } else if (dataes.startAt && !dataes.endAt) {
        if (cal.year > +dataes.startAt.slice(0, 4)) {
          // console.log("6");
          return {
            ...prev,
            isOpen: true,
            // idx: id,
            isModal: false,
            todayDate: `${cal.year} ${cal.month} ${id}`,
            endAt: `${cal.year} ${cal.month} ${id}`,
          };
        } else if (
          cal.year >= +dataes.startAt.slice(0, 4) &&
          cal.month > +dataes.startAt.slice(5, 7)
        ) {
          // console.log("7");
          return {
            ...prev,
            isOpen: true,
            // idx: id,
            isModal: false,
            todayDate: `${cal.year} ${cal.month} ${id}`,
            endAt: `${cal.year} ${cal.month} ${id}`,
          };
        } else if (
          cal.year >= +dataes.startAt.slice(0, 4) &&
          cal.month >= +dataes.startAt.slice(5, 7) &&
          +id > +dataes.startAt.slice(7, 9)
        ) {
          // console.log("8");
          return {
            ...prev,
            isOpen: true,
            // idx: id,
            isModal: false,
            todayDate: `${cal.year} ${cal.month} ${id}`,
            endAt: `${cal.year} ${cal.month} ${id}`,
          };
        }
        // console.log("9");
        return {
          ...prev,
          isOpen: true,
          // idx: id,
          isModal: false,
          todayDate: `${cal.year} ${cal.month} ${id}`,
          startAt: `${cal.year} ${cal.month} ${id}`,
          endAt: dataes.startAt,
        };
      }
      // console.log("10");
      return {
        ...prev,
        isOpen: true,
        // idx: id,
        isModal: true,
        todayDate: `${cal.year} ${cal.month} ${id}`,
        startAt: `${cal.year} ${cal.month} ${id}`,
        endAt: ``,
      };
    });
    // for(let i=0; i < 2; i++){
    //   console.log(i)
    //   const arr:string[] = ['startDate','endDate']
    //   const answer:string[] = [data.startAt,data.endAt]
    //   setValue(arr[i],answer[i])
    // }
  };
  // console.log(data)
  // console.log(+data.startAt.slice(0,4) <= 2023 <= +data.endAt.slice(0,4) )
  return (
    <>
      {
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.stopPropagation();
          }}
          className={
            "pt-[21px] w-[261px] h-[284px] absolute bg-white  top-[44px] rounded-[10px] border px-[30px] left-[75px]"
          }
        >
          <div className="flex justify-between items-center mb-[45px]">
            <span className="cursor-pointer" onClick={handleDownCalender}>
              {"<"}
            </span>
            <h3 className="">{`${cal.year}년 ${cal.month}월`}</h3>
            <span className="cursor-pointer" onClick={handleUpCalender}>
              {">"}
            </span>
          </div>
          <div className="" onClick={(value) => {setValue('endDate',value)}}>
            <table>
              <thead>
                <tr className="flex gap-x-[10px] mb-[28px]">
                  <th className="flex justify-center items-center w-[20px] h-[14px] text-[12px]">
                    일
                  </th>
                  <th className="flex justify-center items-center w-[20px] h-[14px] text-[12px]">
                    월
                  </th>
                  <th className="flex justify-center items-center w-[20px] h-[14px] text-[12px]">
                    화
                  </th>
                  <th className="flex justify-center items-center w-[20px] h-[14px] text-[12px]">
                    수
                  </th>
                  <th className="flex justify-center items-center w-[20px] h-[14px] text-[12px]">
                    목
                  </th>
                  <th className="flex justify-center items-center w-[20px] h-[14px] text-[12px]">
                    금
                  </th>
                  <th className="flex justify-center items-center w-[20px] h-[14px] text-[12px]">
                    토
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.values(weeks).map((week, index) => (
                  //gap-x-[10px] mb-[10px]
                  <tr className="flex gap-x-[10px] mb-[10px]" key={index}>
                    {week.map((day: number | null, index: number) => {
                      return (
                        <td
                          className={
                            "relative flex justify-center items-center w-[20px] h-[14px]"
                          }
                          key={index}
                        >
                          {/* border-solid border-[#337AFF] border-x-[3.5px] box-content*/}
                          <div
                            id={String(day)}
                            className={
                              "flex justify-center items-center cursor-pointer absolute w-[24px] h-[24px] text-[12px] " +
                              (day === null ? " pointer-events-none " : "") +
                              (!dataes.endAt
                                ? +dataes.startAt.slice(0, 4) == cal.year &&
                                  +dataes.startAt.slice(5, 7) == cal.month &&
                                  (day === null ? NaN : day) ==
                                    +dataes.startAt.slice(7, 10)
                                  ? "bg-primary-80 rounded-full text-grayscale-10"
                                  : ""
                                : "") +
                              (+dataes.startAt.slice(0, 4) ===
                              +dataes.endAt.slice(0, 4)
                                ? +dataes.startAt.slice(5, 7) !==
                                    +dataes.endAt.slice(5, 7) &&
                                  +dataes.startAt.slice(0, 4) === cal.year
                                  ? (+dataes.startAt.slice(5, 7) === cal.month
                                      ? +dataes.startAt.slice(7, 10) <=
                                        (day === null ? NaN : day)
                                        ? " bg-primary-80 text-grayscale-10 border-solid border-[#337AFF] border-x-[3.5px] box-content"
                                        : ""
                                      : "") +
                                    (+dataes.endAt.slice(5, 7) === cal.month
                                      ? +dataes.endAt.slice(7, 10) >=
                                        (day === null ? NaN : day)
                                        ? " bg-primary-80 text-grayscale-10 border-solid border-[#337AFF] border-x-[3.5px] box-content"
                                        : ""
                                      : "") +
                                    (+dataes.startAt.slice(5, 7) < cal.month &&
                                    cal.month < +dataes.endAt.slice(5, 7)
                                      ? (day === null ? NaN : day)
                                        ? " bg-primary-80 text-grayscale-10 border-solid border-[#337AFF] border-x-[3.5px] box-content"
                                        : ""
                                      : "")
                                  : +dataes.startAt.slice(0, 4) === cal.year &&
                                    +dataes.endAt.slice(0, 4) === cal.year &&
                                    +dataes.startAt.slice(5, 7) === cal.month &&
                                    +dataes.startAt.slice(5, 7) === cal.month &&
                                    +dataes.startAt.slice(7, 10) <=
                                      (day === null ? NaN : day) &&
                                    (day === null ? NaN : day) <=
                                      +dataes.endAt.slice(7, 10)
                                  ? " bg-primary-80 text-grayscale-10 border-solid border-[#337AFF] border-x-[3.5px] box-content"
                                  : ""
                                : (+dataes.startAt.slice(0, 4) === cal.year &&
                                  dataes.endAt
                                    ? +dataes.startAt.slice(5, 7) === cal.month
                                      ? (day === null ? NaN : day) >=
                                        +dataes.startAt.slice(7, 10)
                                        ? " bg-primary-80 text-grayscale-10 border-solid border-[#337AFF] border-x-[3.5px] box-content"
                                        : ""
                                      : +dataes.startAt.slice(5, 7) < cal.month
                                      ? (day === null ? NaN : day)
                                        ? " bg-primary-80 text-grayscale-10 border-solid border-[#337AFF] border-x-[3.5px] box-content"
                                        : ""
                                      : ""
                                    : "") +
                                  (+dataes.endAt.slice(0, 4) === cal.year
                                    ? +dataes.endAt.slice(5, 7) === cal.month
                                      ? (day === null ? NaN : day) <=
                                        +dataes.endAt.slice(7, 10)
                                        ? " bg-primary-80 text-grayscale-10 border-solid border-[#337AFF] border-x-[3.5px] box-content"
                                        : ""
                                      : +dataes.endAt.slice(5, 7) > cal.month
                                      ? (day === null ? NaN : day)
                                        ? " bg-primary-80 text-grayscale-10 border-solid border-[#337AFF] border-x-[3.5px] box-content"
                                        : ""
                                      : ""
                                    : "") +
                                  (+dataes.startAt.slice(0, 4) < cal.year &&
                                  cal.year < +dataes.endAt.slice(0, 4)
                                    ? (day === null ? NaN : day)
                                      ? " bg-primary-80 text-grayscale-10 border-solid border-[#337AFF] border-x-[3.5px] box-content"
                                      : ""
                                    : "")) +
                              (dataes.startAt && dataes.endAt
                                ? +dataes.startAt.slice(0, 4) == cal.year &&
                                  +dataes.startAt.slice(5, 7) == cal.month &&
                                  (day === null ? NaN : day) ==
                                    +dataes.startAt.slice(7, 10)
                                  ? " bg-primary-80 rounded-l-xl text-grayscale-10 border-solid border-[#337AFF] border-x-[3.5px] box-content"
                                  : ""
                                : "") +
                              (dataes.startAt && dataes.endAt
                                ? +dataes.endAt.slice(0, 4) == cal.year &&
                                  +dataes.endAt.slice(5, 7) == cal.month &&
                                  (day === null ? NaN : day) ==
                                    +dataes.endAt.slice(7, 10)
                                  ? " bg-primary-80 rounded-r-xl text-grayscale-10  border-solid border-[#337AFF] border-x-[3.5px] box-content"
                                  : ""
                                : "")
                            }
                            onClick={dayClick}
                          >
                            {day}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
    </>
  );
};

export default DatePicker;

{
  /* <DatePicker setDisplayCal={setDisplayCal} year={cal.year} month={cal.month}></DatePicker> */
}
//years === cal.year && months === cal.month && (+all.idx || nowDay) === day

{
  /* <div
  id={String(day)}
  className={
    "text-black absolute w-[24px] h-[24px] text-center " +
    ((
      data.ids === "left"
        ? cal.year === +data.startAt.split(" ")[0] &&
        cal.month === +data.startAt.split(" ")[1] &&
        day === +data.startAt.split(" ")[2]
        : cal.year === +data.endAt.split(" ")[0] &&
        cal.month === +data.endAt.split(" ")[1] &&
        day === +data.endAt.split(" ")[2]
    )
      ? // years === cal.year && months === cal.month && (+all.idx || nowDay) === day
      //(+all.startAt.split(' ')[2] || nowDay === day)
      "text-center rounded-[50%] bg-blue-500"
      : "")
  }
  onClick={dayClick}
></div> */
}

// +data.startAt.slice(0, 4) <= cal.year && +data.startAt.slice(5, 7) <= cal.month && (day === null ? NaN : day) >= +data.startAt.slice(7, 10) ? "text-center rounded-[50%] bg-blue-500" : ""

//+data.endAt.slice(0, 4) == cal.year && +data.endAt.slice(5, 7) == cal.month && (day === null ? NaN : day) <= +data.endAt.slice(7, 10) ? (day !== null ? "text-center rounded-[50%] bg-blue-500" : "") : ""
