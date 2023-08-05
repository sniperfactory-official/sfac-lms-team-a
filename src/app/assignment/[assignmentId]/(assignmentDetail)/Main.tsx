import React from "react";

type Props = {};

const Main = (props: Props) => {
  return (
    <div>
      <div className="w-[736px] flex justify-between items-center mb-[33px]">
        <div className="flex items-center gap-x-[9px]">
          <div className="w-[46px] h-[46px] rounded-full">
            <img
              src="/images/avatar.svg"
              alt=""
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="flex flex-col gap-y-[7px]">
            <span className="text-[16px] font-[700] leading-[19.2px]">
              스나이퍼팩토리
            </span>
            <div className="flex items-center gap-x-[7px]">
              <span className="text-grayscale-60 leading-[19.2px] text-[16px] font-[400] ">
                멘토
              </span>
              <div className="w-[5px] h-[5px] rounded-full bg-grayscale-20"></div>
              <span className="text-grayscale-40 text-[14px]">{startDate}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-[5px]">
          <span
            className="text-grayscale-100 text-[12px] font-[400] leading-[14.4px] cursor-pointer"
            onClick={() => setAssignModal(!assignModal)}
          >
            수정
          </span>
          <div className="w-[1px] h-[14px] bg-grayscale-30"></div>
          <span
            className="text-grayscale-100 text-[12px] font-[400] leading-[14.4px] cursor-pointer"
            onClick={async () => {
              await deleteDoc(doc(db, "assignments", assignmentId as string));
              router.push("/assignment");
            }}
          >
            삭제
          </span>
        </div>
      </div>

      {data && (
        <div className="w-[736px]">
          <div className="mb-[16px]">
            <div className="mb-[10px] w-[469px] text-[18px] font-[700]">
              {data.title}
            </div>
            <div className="w-[700px] text-[14px] text-grayscale-60 font-[400]">
              {changeText(textes as string[])}
            </div>
          </div>
          <div className="ml-auto max-w-max mb-[18px] text-[14px] leading-[16.71px] flex items-center gap-x-[7px]">
            <span className="text-grayscale-60">마감일</span>
            <div className="w-[5px] h-[5px] rounded-full bg-grayscale-20"></div>
            <span className="text-grayscale-40">{endDate}</span>
          </div>
          <div className="w-[736px] h-[1px] bg-grayscale-5 mb-[16px]"></div>
        </div>
      )}
    </div>
  );
};

export default Main;
