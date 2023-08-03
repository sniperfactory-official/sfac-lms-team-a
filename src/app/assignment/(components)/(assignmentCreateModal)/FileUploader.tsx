import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { getStorage, ref } from "firebase/storage";
import { db } from "@/utils/firebase";

interface FormValue {
  title: string;
  content: string;
  level: "상" | "중" | "하",
  images: string[],
  startDate: Timestamp;
  endDate: Timestamp;
  createAt: Timestamp;
  updateAt: Timestamp;
  order: number
}

const FilUploader = ({ setValue, d }: { setValue: UseFormSetValue<FormValue>, d: string[] }) => {
  const [myImage, setMyImage] = useState<string[]>([]);
  // const storage = getStorage(firebaseApp);

  const addImage: React.FormEventHandler<HTMLDivElement> = e => {
    const a = (e.target as HTMLInputElement).files;
    const arr = Array.from(a as FileList)
    // let c = arr.map((file, index) => {
    //   const pathReference = ref(storage, file)
    //   return file.name
    // })
    // console.log(c)
    // const pathReference = ref(storage, 'images/stars.jpg');
    const b = [...myImage];
    if (a === null) return;

    for (let i = 0; i < a.length; i++) {
      const c = URL.createObjectURL(a[i]);
      b.push(c);
    }
    setMyImage(b);
  };

  const deleteImage: React.MouseEventHandler<HTMLImageElement> = e => {
    const id = e.currentTarget.id;
    setMyImage(prev => {
      let copy = [...prev];
      copy.splice(+id, 1);
      return [...copy];
    });
  };

  useEffect(() => {
    console.log(myImage)
    setValue('images', [...myImage])
  }, [myImage]);

  // useEffect(() => {
  //   if (d !== undefined) {
  //     // console.log(d)
  //     setMyImage(prev => {
  //       return [...d]
  //     })
  //   }
  // }, [])

  return (
    <div className="flex gap-x-[6px]">
      <div
        className="relative w-[60px] h-[60px] rounded-[10px] bg-black z-3]"
        // className="relative w-[60px] h-[60px] rounded-[10px] bg-[url('')]"
        onChange={addImage}
      >
        {/* //이미지 png, jpeg 등등 테스트 해볼것 */}
        <input
          className="w-[60px] h-[60px] overflow-hidden cursor-pointer pointer-events-auto opacity-0 z-[2]"
          id="file"
          accept="image/*"
          multiple
          type="file"
        />
      </div>
      {myImage.map((ele, index) => {
        return (
          <>
            <img
              id={String(index)}
              key={index}
              className="rounded-[10px] relative after:bg-[url('/images/redClose.svg')] after:absolute after:w-[14px] after:h-[14px] after:bg-red after:block after:content-[''] after:top-[2px] after:left-[2px]"
              width={"100%"}
              src={ele}
              onClick={deleteImage}
            />
            {/* <div className="w-[13.33px] h-[13.33px]"> */}
            {/* <img src="/images/redClose.svg" alt="close" className="w-full h-full"/> */}
            {/* </div> */}
          </>
        );
      })}
    </div>
  );
};

export default FilUploader;