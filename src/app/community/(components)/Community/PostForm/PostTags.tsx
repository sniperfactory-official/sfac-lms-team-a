import { KeyboardEvent, useState, useMemo } from "react";
import Image from "next/image";
import cancelIcon from "/public/images/cancel.svg";
import { v4 as uuid } from "uuid";

interface PostTagsProps {
  tagList: string[];
  setTagList: (newTagList: string[]) => void;
}

export default function PostTags({ tagList, setTagList }: PostTagsProps) {
  const tagsWithUuid = useMemo(() => {
    return tagList.map(tag => ({ value: tag, key: uuid() }));
  }, [tagList]);
  const [tagInputValue, setTagInputValue] = useState<string>("");

  const deleteTags = (value: string) => {
    setTagList(tagList.filter(tag => tag !== value));
  };

  const handleTagEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInputValue.length > 0) {
      e.preventDefault();
      if (!tagList.includes(tagInputValue) && tagList.length < 5) {
        const id = uuid();
        setTagList([...tagList, tagInputValue]);
      }
      setTagInputValue("");
    }
  };

  return (
    <>
      <input
        id="tags"
        placeholder="# 태그 입력"
        onKeyPress={e => handleTagEnter(e)}
        maxLength={10}
        className="w-[102px] h-[40px] text-center placeholder-grayscale-40 bg-grayscale-5 rounded-[10px] ring-grayscale-10 focus:outline-none focus:ring-2 focus:primary-5"
        disabled={tagList?.length === 5 ? true : false}
        onChange={e => setTagInputValue(e.target.value)}
        value={tagInputValue}
      />
      <div className="flex gap-1">
        {tagsWithUuid?.map(tag => (
          <div
            key={tag.key}
            className="flex relative justify-center items-center w-[70px] h-[35px] py-2 bg-grayscale-5 rounded-[10px] overflow-hidden"
          >
            <span className="text-grayscale-6 overflow-hidden overflow-ellipsis whitespace-nowrap">
              {tag.value}
            </span>
            <Image
              src={cancelIcon}
              onClick={() => deleteTags(tag.value)}
              alt="cancelIcon"
              className="absolute top-[2px] right-[2px]"
            />
          </div>
        ))}
      </div>
    </>
  );
}
