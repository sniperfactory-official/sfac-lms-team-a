"use client";
import Image from "next/image";
import inputAvatar from "/public/images/inputAvatar.svg";
import { useForm } from "react-hook-form";
import SelectMenu from "@/components/Community/SelectMenu";
import Button from "@/components/common/Button";
import { KeyboardEvent, useState } from "react";
import ImageUploader from "../common/ImageUploader";

interface PostValue {
  title: string;
  content: string;
  images?: string[];
  category: string;
  tags?: string[];
}

export default function PostForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<PostValue>();
  const titleValue = watch("title");
  const contentValue = watch("content");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [tagList, setTagList] = useState<string[]>([]);
  const [tagInputValue, setTagInputValue] = useState<string>("");
  const [selectedImgs, setSelectedImgs] = useState<string[]>([]);
  const handleTagEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInputValue.length > 0) {
      e.preventDefault();
      console.log(tagInputValue);
      if (!tagList.includes(tagInputValue) && tagList.length < 5) {
        setTagList([...tagList, tagInputValue]);
        console.log(tagList);
      }
      setTagInputValue("");
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-5">
      <div className="flex items-center gap-[10px]">
        <Image src={inputAvatar} alt="inputAvatar" />
        <p className="grayscale-60">캐서린</p>
      </div>
      <form
        onSubmit={handleSubmit(data => {
          data.tags = tagList;
          data.images = selectedImgs;
          console.log(data);
        })}
        className="flex flex-col gap-[10px]"
      >
        <input
          id="title"
          placeholder="제목을 입력해주세요. (선택)"
          {...register("title", { required: true })}
          className=" rounded-[8px] ring-inset ring-grayscale-10 focus:outline-none focus:ring-2 focus:primary-5"
        />
        <div className="relative">
          <textarea
            className="w-full h-[300px] justify-center items-center rounded-[10px] border-grayscale-10 placeholder-grayscale-20 p-[15px] resize-none ring-1 ring-inset ring-grayscale-10 focus:outline-none focus:ring-2 focus:primary-5"
            placeholder="내용을 입력해주세요."
            {...register("content", { required: true })}
          />
          <ImageUploader
            options="left-[40px]"
            options2="absolute start-[15px] bottom-[20px]"
            selectedImgs={selectedImgs}
            setSelectedImgs={setSelectedImgs}
          />
          <input {...register("images")} type="hidden" />
        </div>
        <div className="flex gap-2.5 items-center mt-2">
          <SelectMenu
            setSelectedCategory={setSelectedCategory}
            setValue={setValue}
          />
          <input
            id="category"
            {...register("category", { required: true })}
            value={selectedCategory}
            type="hidden"
          />
          <input
            id="tags"
            placeholder="# 태그 입력"
            onKeyDown={e => handleTagEnter(e)}
            className="w-[102px] h-[40px] text-center placeholder-grayscale-40 bg-grayscale-5 rounded-[10px] ring-grayscale-10 focus:outline-none focus:ring-2 focus:primary-5"
            disabled={tagList.length === 5 ? true : false}
            onChange={e => setTagInputValue(e.target.value)}
            value={tagInputValue}
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
          isError={
            !titleValue || !contentValue || !selectedCategory ? true : false
          }
          options={"w-[115px] h-[35px] self-end"}
        />
      </form>
    </div>
  );
}
