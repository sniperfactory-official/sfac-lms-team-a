"use client";
import Image from "next/image";
import { Lecture } from "@/types/firebase.types";
import { useState } from "react";
import useDeleteLecture from "@/hooks/reactQuery/lecture/useDeleteLecture";
import ModalWrapper from "@/components/ModalWrapper";
import Link from "next/link";
import timestampToDate from "@/utils/timestampToDate";
import UpdateLecture from "./UpdateLecture";
import { Text } from "sfac-designkit-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// 강의 리스트 항목
const LectureItem = ({ item, index }: { item: Lecture; index: number }) => {
  const { title, lectureContent, startDate, endDate, lectureType, id } = item;
  const user = useSelector((store: RootState) => store.userInfo);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false); // 강의 삭제 여부 모달
  const lectureDeleteMutation = useDeleteLecture();
  const handleDeleteLecture = (id: string) => {
    lectureDeleteMutation.mutate({
      lectureId: id,
    });
    setIsOpenDeleteModal(!isOpenDeleteModal);
  };

  const lectureIcon =
    lectureType === "비디오" ? "🎬" : lectureType === "노트" ? "📒" : "🔗";

  return (
    <div key={item.id} className="border rounded-lg flex px-[20px] py-[20px]">
      <div>
        {item.isPrivate ? (
          <Image
            src="/images/privateThumbnail.svg"
            width={216}
            height={132}
            alt={title}
            className="mr-5 h-full rounded-lg bg-slate-200"
          />
        ) : (
          <Image
            src="/images/logo.svg"
            width={216}
            height={132}
            alt={title}
            className="mr-5 h-full rounded-lg bg-slate-200"
          />
        )}
      </div>
      <div className="mr-20 flex flex-col justify-center gap-2 grow">
        {lectureType === "비디오" ? (
          <span className="w-[50px] h-[22px] text-xs bg-grayscale-5 px-[10px] py-[4px] rounded-md text-center">
            {lectureContent.videoLength}
          </span>
        ) : (
          <span className="gap-4 justify-around"></span>
        )}
        <h3 className="text-base font-bold">
          {`${lectureIcon} ` + `${title}`}
        </h3>
        <div className="text-xs font-medium">
          [수강기간]
          <p>
            {timestampToDate(startDate)} ~ {timestampToDate(endDate)}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="text-xs text-right">
          {user.role === "관리자" && (
            <>
              <UpdateLecture lectureId={id} />
              <Text weight="medium" size="sm">
                {" "}
                |{" "}
              </Text>
              <button onClick={() => setIsOpenDeleteModal(true)}>삭제</button>
              {isOpenDeleteModal && (
                <ModalWrapper
                  width="w-[477px]"
                  isCloseButtonVisible={false}
                  onCloseModal={() => setIsOpenDeleteModal(false)}
                >
                  <div className="text-center flex flex-col justify-center h-[120px]">
                    <h2 className="text-xl font-bold mb-[10px]">
                      강의를 삭제하시겠습니까?
                    </h2>
                    <div>
                      <button
                        className="bg-grayscale-5 text-grayscale-60 font-bold text-sm px-[46px] py-[6px] rounded-[7px] mr-[8px]"
                        onClick={() => setIsOpenDeleteModal(false)}
                      >
                        취소
                      </button>
                      <button
                        className="bg-red text-white font-bold text-sm px-[46px] py-[6px] rounded-[7px]"
                        onClick={() => handleDeleteLecture(id)}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </ModalWrapper>
              )}
            </>
          )}
        </div>

        <Link
          href={`/lectureHall/${id}`}
          className="bg-grayscale-5 px-14 py-2 rounded-lg"
        >
          {lectureType}보기
        </Link>
      </div>
    </div>
  );
};

export default LectureItem;
