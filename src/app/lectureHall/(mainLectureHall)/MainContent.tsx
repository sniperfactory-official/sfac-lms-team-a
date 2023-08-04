"use client";

import { useParams } from "next/navigation";
import ContentArea from "../(components)/Wrapper";
import useGetLectureListQuery from "@/hooks/reactQuery/lecture/useGetLectureListQuery";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { updatePlayLecture } from "@/redux/lectureSlice";

const MainContent = ({}) => {
  const params = useParams();
  const { data: lectures } = useGetLectureListQuery("s5LYsVcx93Z2a50LZ1vS");
  const dispatch = useDispatch();
  const playLectureStore = useSelector(
    (store: RootState) => store.nowPlayLecture,
  );
  console.log(playLectureStore);
  useEffect(() => {
    if (lectures !== undefined) {
      const sortedLectures = [...lectures].sort((a, b) => {
        return a.order - b.order;
      });
      const nowPlayIndex = 0;
      dispatch(
        updatePlayLecture({
          lectures: sortedLectures,
          nowPlayIndex,
          nowPlayLectureId: sortedLectures[nowPlayIndex].id,
          maxOrder: sortedLectures.length - 1,
        }),
      );
    }
  }, [lectures]);
  return (
    <div>
      {playLectureStore && playLectureStore.nowPlayLectureId !== "" && (
        <ContentArea id={playLectureStore.nowPlayLectureId} />
      )}
    </div>
  );
};

export default MainContent;
