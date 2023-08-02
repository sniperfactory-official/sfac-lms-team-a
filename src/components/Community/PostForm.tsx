"use client";
import Image from "next/image";
import inputAvatar from "/public/images/inputAvatar.svg";
import { useForm } from "react-hook-form";
import SelectMenu from "@/components/Community/SelectMenu";
import Button from "@/components/common/Button";
import { KeyboardEvent, useState } from "react";

interface PostValue {
  title: string;
  content: string;
  category: string;
  tags: string;
}

export default function PostForm() {
  const {
    register,
    handleSubmit,
    resetField,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<PostValue>();
  const titleValue = watch("title");
  const contentValue = watch("content");
  const tagValue = watch("tags");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tagList, setTagList] = useState<string[]>([]);
  const handleTagEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagValue.length > 0) {
      e.preventDefault();
      if (!tagList.includes(tagValue) && tagList.length < 5) {
        setTagList([...tagList, tagValue]);
      }
      resetField("tags");
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-5">
      <div className="flex items-center gap-[10px]">
        <Image src={inputAvatar} alt="inputAvatar" />
        <p className="grayscale-60">캐서린</p>
      </div>
      <form className="flex flex-col gap-[10px]">
        <input
          id="title"
          placeholder="제목을 입력해주세요. (선택)"
          {...register("title")}
          className=" rounded-[8px] ring-inset ring-grayscale-10 focus:outline-none focus:ring-2 focus:primary-5"
        />
        <textarea
          className="h-[300px] justify-center items-center rounded-[10px] border-grayscale-10 placeholder-grayscale-20 p-[15px] resize-none ring-1 ring-inset ring-grayscale-10 focus:outline-none focus:ring-2 focus:primary-5"
          placeholder="내용을 입력해주세요."
          {...register("content")}
        />
        <div className="flex gap-2.5 items-center mt-2">
          <SelectMenu setSelectedCategory={setSelectedCategory} />
          <input
            id="tag"
            placeholder="# 태그 입력"
            {...register("tags")}
            onKeyDown={e => handleTagEnter(e)}
            className="w-[102px] h-[40px] text-center placeholder-grayscale-40 bg-grayscale-5 rounded-[10px] ring-grayscale-10 focus:outline-none focus:ring-2 focus:primary-5"
            disabled={tagList.length === 5 ? true : false}
          />
          <div className="flex gap-1">
            {tagList.map((tag, index) => (
              <div
                key={index}
                className="flex justify-center items-center w-[70px] h-[35px] text-grayscale-60 bg-grayscale-5 rounded-[10px] overflow-hidden"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
        <Button
          text="업로드"
          disabled={isSubmitting}
          isError={!titleValue || !contentValue ? true : false}
          options={"w-[115px] h-[35px] self-end"}
        />
      </form>
    </div>
  );
}
