"use client";
import Image from "next/image";
import arrow from "/public/images/Arrow.svg";
import { Timestamp } from "firebase/firestore";

type CommentData = {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Timestamp; // 혹은 Date 객체를 사용하고 있다면 Date로 지정하십시오.
};

type CategoryProps = {
  title: string;
  targetData: CommentData[] | undefined;
};

export default function Category({ title, targetData }: CategoryProps) {
  return (
    <div className="flex flex-col ">
      <div className="flex justify-between">
        <h3 className="font-bold ">{title}</h3>
        <Image src={arrow} width={10} height={14} alt="더보기 버튼" />
      </div>
      {targetData?.map(({ id, title, category, content }) => (
        <div
          key={id}
          className="h-[73px] text-base border-solid border border-gray-200 rounded-[10px] px-[12px] py-[16px] my-3"
        >
          <div className="flex">
            <div className="align-middle px-[5px] leading-5 text-[10px] text-center bg-gray-200 rounded mr-[7px] mb-[4px]">
              {category}
            </div>
            <h4 className=" text-sm">{title}</h4>
          </div>
          <p className=" text-xs text-primary-30 truncate overflow-hidden ...">
            {content}
          </p>
        </div>
      ))}
    </div>
  );
}

{
  /* 
      <div className="">
        <div className="flex justify-between">
          <h3 className="font-bold">{title}</h3>
          <Image src={arrow} width={10} height={14} alt="더보기 버튼" />
        </div>
        {myPostData
          ?.filter(el => el.category)
          .map(post => (
            <div className="  h-[73px] text-base border-solid border border-gray-200 rounded-[10px] px-[12px] py-[16px] my-3">
              <div className="flex ">
                <div className=" leading-5 px-[2px] text-[10px] bg-gray-200 rounded mr-[7px] mb-[4px]">
                  {post.category}
                </div>
                <h4 className=" text-sm truncate ...">{post.title}</h4>
              </div>
              <p className=" text-xs text-primary-30 truncate overflow-hidden ...">
                {post.content}
              </p>
            </div>
          ))}
      </div>

      <div className="">
        <div className="flex justify-between">
          <h3 className="font-bold">{title}</h3>
          <Image src={arrow} width={10} height={14} alt="더보기 버튼" />
        </div>
        {myPostData
          ?.filter(el => !el.category)
          .map(post => (
            <div className="  h-[73px] text-base border-solid border border-gray-200 rounded-[10px] px-[12px] py-[16px] my-3">
              <div className="flex ">
                <div className=" leading-5 px-[2px] text-[10px] bg-gray-200 rounded mr-[7px] mb-[4px]">
                  {post.parentData.category}
                </div>
                <h4 className=" text-sm truncate ...">
                  {post.parentData.title}
                </h4>
              </div>
              <p className=" text-xs text-primary-30 truncate overflow-hidden ...">
                {post.content}
              </p>
            </div>
          ))}
      </div>
    </div> */
}
