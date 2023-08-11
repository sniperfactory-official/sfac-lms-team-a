"use client";
import Image from "next/image";
import { Lecture } from "@/types/firebase.types";
import { useState } from "react";
import useDeleteLecture from "@/hooks/reactQuery/lecture/useDeleteLecture";
import ModalWrapper from "@/components/ModalWrapper";
import Link from "next/link";
import timestampToDate from "@/utils/timestampToDate";
import UpdateLecture from "./UpdateLecture";
import { Button, Card, Photo, Text, Title } from "sfac-designkit-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// 강의 리스트 항목
const LectureItem = ({
  item,
  index,
  isEdit,
}: {
  item: Lecture;
  index: number;
  isEdit: boolean;
}) => {
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
    <Card CardType="Lecture" key={item.id} className="ring-1 ring-grayscale-5">
      <div className="flex">
        <div className="rounded-lg mr-5 overflow-hidden">
          {item.isPrivate ? (
            <Photo
              src="/images/privateThumbnail.svg"
              width={214}
              height={132}
              alt={title}
            />
          ) : (
            <Photo
              src="/images/lecturethumbnail.svg"
              width={214}
              height={132}
              alt={title}
              className="bg-primary-5"
            />
          )}
        </div>
        <div className="mr-20 flex flex-col justify-center gap-3 grow">
          {lectureType === "비디오" ? (
            <span className="w-[52px] h-[22px] text-xs bg-grayscale-5 px-[10px] py-[4px] rounded-md text-center">
              {lectureContent.videoLength}
            </span>
          ) : (
            <span className="gap-4 justify-center"></span>
          )}
          {/* size="base" weight="medium" className="text-color-Grayscale-100" */}
          {/* className="text-base text-grayscale-80 font-bold */}
          <Text size="base" weight="bold">
            {`${lectureIcon} ` + `${title}`}
          </Text>
          <Text size="xs" weight="medium" className="text-grayscale-60">
            [수강기간]
            <p>
              {timestampToDate(startDate)} ~ {timestampToDate(endDate)}
            </p>
          </Text>
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
                      <Title size="2xl" className="text-xl font-bold mb-[10px]">
                        강의를 삭제하시겠습니까?
                      </Title>
                      <div className="flex justify-center items-center">
                        <Button
                          variant="secondary"
                          text="취소"
                          className="w-[115px] py-[8px] mr-[8px]"
                          onClick={() => setIsOpenDeleteModal(false)}
                        />

                        <Button
                          variant="destructive"
                          text="삭제"
                          className="w-[115px] py-[8px] bg-red"
                          onClick={() => handleDeleteLecture(id)}
                        />
                      </div>
                    </div>
                  </ModalWrapper>
                )}
              </>
            )}
          </div>

          <Link
            href={`/lectureHall/${id}`}
            className="bg-grayscale-5 text-grayscale-60 w-[152px] px-[33px] py-[9px] text-center rounded-lg"
          >
            <Text size="sm" weight="bold">
              {lectureType}보기
            </Text>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default LectureItem;
