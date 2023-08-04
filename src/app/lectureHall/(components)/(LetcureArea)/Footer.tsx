"use client";

import { nextPlayLecture } from "@/redux/lectureSlice";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

const LectureFooter = () => {
  const nowPlayLectureStore = useSelector(
    (store: RootState) => store.nowPlayLecture,
  );
  const dispatch = useDispatch();

  const nextLectureHandler = () => {
    const nowPlayIndex = nowPlayLectureStore.nowPlayIndex;
    console.log("test");
    dispatch(
      nextPlayLecture({
        nowPlayIndex: nowPlayIndex + 1,
        id: nowPlayLectureStore.lectures[nowPlayIndex + 1].id,
      }),
    );
  };
  const prevLectureHandler = () => {
    const nowPlayIndex = nowPlayLectureStore.nowPlayIndex;
    dispatch(
      nextPlayLecture({
        nowPlayIndex: nowPlayIndex - 1,
        id: nowPlayLectureStore.lectures[nowPlayIndex - 1].id,
      }),
    );
  };

  return (
    <div className="w-full h-full flex">
      {!(nowPlayLectureStore.nowPlayIndex === 0) && (
        <button
          className="ml-14 mr-auto text-lg font-bold text-grayscale-60 flex h-full items-center"
          disabled={nowPlayLectureStore.nowPlayIndex === 0}
          onClick={prevLectureHandler}
        >
          <Image
            src="/images/prevLectureButton.svg"
            alt="이전강의버튼"
            width={20}
            height={20}
            className="mr-3 mb-1"
          ></Image>
          이전강의
        </button>
      )}
      {!(nowPlayLectureStore.nowPlayIndex === nowPlayLectureStore.maxOrder) && (
        <button
          className="ml-auto mr-14 text-lg font-bold text-grayscale-60 flex h-full items-center"
          disabled={
            nowPlayLectureStore.nowPlayIndex === nowPlayLectureStore.maxOrder
          }
          onClick={nextLectureHandler}
        >
          다음강의
          <Image
            src="/images/nextLectureButton.svg"
            alt="이전강의버튼"
            width={20}
            height={20}
            className="ml-3 mb-1"
          ></Image>
        </button>
      )}
    </div>
  );
};

export default LectureFooter;
