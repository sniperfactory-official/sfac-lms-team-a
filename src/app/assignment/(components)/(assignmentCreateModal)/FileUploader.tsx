import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { getApp } from "firebase/app";

interface FormValue {
  title: string;
  content: string;
  level: "상" | "중" | "하";
  images: string[];
  startDate: Timestamp;
  endDate: Timestamp;
  createAt: Timestamp;
  updateAt: Timestamp;
  order: number;
}
// `gs://sniperfactory-lms.appspot.com`
const FilUploader = ({
  setValue,
  d,
}: {
  setValue: UseFormSetValue<FormValue>;
  d: string[];
}) => {
  const [myImage, setMyImage] = useState<string[]>([]);

  // const storage = getStorage(firebaseApp,`gs://sniperfactory-lms.appspot.com`);
  const storage = getStorage();
  // const storageRef = ref(storage, `assignments/images`);

  // const metadata = {
  //   contentType: 'image/png',
  // };

  const addImage: React.FormEventHandler<HTMLDivElement> = e => {
    const a = (e.target as HTMLInputElement).files;
    const arr = Array.from(a as FileList);

    // let c = arr.map((file, index) => {
    //   // uploadBytes(storageRef,file,metadata).then((snapshot) => {

    //   // })
    //   const pathReference = ref(storage, `assignments/images/${file.name}`);
    //   // console.log(pathReference)
    //   return file.name;
    // });

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
    // console.log(myImage)
    setValue("images", [...myImage]);
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
        className="relative w-[60px] h-[60px] rounded-[10px] bg-[url('/images/Vector.svg')] bg-no-repeat bg-center bg-grayscale-10 bg-[length:27.26px_28.58px] z-3"
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
        console.log(ele)
        return (
            <div key={index} className="relative">
              {/* 123 */}
              <img
                id={String(index)}
                className="max-w-[60px] h-[60px] rounded-[10px]"
                src={ele}
              />
              <img id={String(index)} src="images/redClose.svg" className="cursor-pointer absolute top-[4.33px] right-[4.33px]" alt="" onClick={deleteImage}/>
            </div>
        );
      })}
    </div>
  );
};

export default FilUploader;

{/* <img
  id={String(index)}
  key={index}
  className="rounded-[10px] relative after:bg-[url('/images/close.svg')] after:absolute after:w-[14px] after:h-[14px] after:bg-red after:block after:content-[''] after:top-[2px] after:left-[2px]"
  width={"100%"}
  src={ele}
  onClick={deleteImage}
/> */}

{/* <div className="w-[13.33px] h-[13.33px]"> */}
{/* <img src="/images/redClose.svg" alt="close" className="w-full h-full"/> */}
{/* </div> */}