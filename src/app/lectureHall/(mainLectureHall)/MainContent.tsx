"use client";

import { useParams, useRouter } from "next/navigation";
import ContentArea from "../(components)/Wrapper";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";

const MainContent = ({}) => {
  const playLectureStore = useSelector(
    (store: RootState) => store.nowPlayLecture,
  );
  const router = useRouter();
  useEffect(() => {
    console.log("playLectureStore", playLectureStore);
    if (
      playLectureStore.nowPlayIndex === -1 &&
      playLectureStore.nowPlayLectureId === ""
    ) {
      router.push("/classroom");
    }
  }, [playLectureStore]);

  return (
    <div>
      {playLectureStore && playLectureStore.nowPlayLectureId !== "" && (
        <ContentArea id={playLectureStore.nowPlayLectureId} />
      )}
    </div>
  );
};

export default MainContent;
