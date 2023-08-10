"use client";
import Image from "next/image";
import arrow from "/public/images/MypageArrow.svg";
import { Timestamp } from "firebase/firestore";

type CommentData = {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Timestamp;
};

type CategoryProps = {
  title: string;
  targetData: CommentData[] | undefined;
  handleClick: () => void;
  handleDetailModalClick?: (id: string) => void;
  width?: string;
};

export default function Category({
  title,
  targetData,
  handleClick,
  handleDetailModalClick,
  width,
}: CategoryProps) {
  const myData = title ? targetData?.slice(0, 3) : targetData;

  return (
    <div
      className={`flex flex-col ${width ? width : "w-1/3"} ${
        title ? "" : "grid grid-cols-2	gap-2"
      }`}
      onClick={handleClick}
    >
      {title && (
        <div className="flex justify-between">
          <h3 className="font-bold ">{title}</h3>
          <Image
            src={arrow}
            width={10}
            height={14}
            alt="더보기 버튼"
            className=" cursor-pointer"
          />
        </div>
      )}

      {myData && myData.length ? (
        myData.map(({ id, title, category, content }) => (
          <div
            key={id}
            className="h-[73px] text-base border-solid border border-gray-200 rounded-[10px] px-[12px] py-[16px] my-3 cursor-pointer"
            onClick={() => {
              handleDetailModalClick && handleDetailModalClick(id);
            }}
          >
            <div className="flex">
              <div className="align-middle px-[5px] leading-5 text-[10px] text-center bg-gray-200 rounded mr-[7px] mb-[4px]">
                {category}
              </div>
              <h4 className="text-sm">{title}</h4>
            </div>
            <p className=" text-xs text-primary-30 truncate overflow-hidden ...">
              {content}
            </p>
          </div>
        ))
      ) : (
        <div className="h-full flex items-center justify-center text-base border-solid border border-gray-200 rounded-[10px] my-3">
          <div>{title} 없음</div>
        </div>
      )}
    </div>
  );
}
