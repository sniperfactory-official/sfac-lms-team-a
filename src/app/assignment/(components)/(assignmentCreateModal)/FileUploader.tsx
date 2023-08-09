import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

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

const FilUploader = ({
  setValue,
  d,
}: {
  setValue: UseFormSetValue<FormValue>;
  d: string[];
}) => {
  console.log(d);
  const [myImage, setMyImage] = useState([]);
  const storage = getStorage();
  const addImage: React.FormEventHandler<HTMLDivElement> = e => {
    const a = (e.target as HTMLInputElement).files;
    const arr = Array.from(a as FileList);
    let m = arr.map(async file => {
      const pathReference = ref(storage, `assignments/images/${file.name}`);
      const snapshot = await uploadBytes(pathReference, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setMyImage(prev => {
        if (d) {
          return [...prev, ...d];
        } else {
          return [...prev, downloadURL];
        }
      });
    });
    // const b = [...myImage];
    if (a === null) return;
    // setMyImage(m);
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
    setValue("images", [...myImage]);
  }, [myImage]);

  return (
    <div className="flex gap-x-[6px]">
      <div
        className="relative w-[60px] h-[60px] rounded-[10px] bg-[url('/images/Vector.svg')] bg-no-repeat bg-center bg-[length:27.26px_28.58px] bg-grayscale-10 z-3"
        onChange={addImage}
      >
        <input
          className="w-[60px] h-[60px] overflow-hidden cursor-pointer pointer-events-auto opacity-0 z-[2]"
          id="file"
          accept="image/*"
          multiple
          type="file"
        />
      </div>
      {!myImage.length
        ? d?.map((ele, index) => {
            return (
              <div className="w-[60px] h-[60px] relative" key={ele}>
                <div className="w-[60px] h-[60px]">
                  <img
                    id={String(index)}
                    className="rounded-[10px] w-full h-full"
                    src={ele}
                  />
                </div>
                <div className="w-[13.33px] h-[13.33px] absolute top-[4.33px] right-[4.33px] cursor-pointer">
                  <img
                    src="/images/redClose.svg"
                    alt="close"
                    className="w-full h-full"
                    onClick={deleteImage}
                  />
                </div>
              </div>
            );
          })
        : ""}
      {myImage.map((ele, index) => {
        return (
          <div className="w-[60px] h-[60px] relative" key={ele}>
            <div className="w-[60px] h-[60px]">
              <img
                id={String(index)}
                className="rounded-[10px] w-full h-full"
                src={ele}
              />
            </div>
            <div className="w-[13.33px] h-[13.33px] absolute top-[4.33px] right-[4.33px] cursor-pointer">
              <img
                src="/images/redClose.svg"
                alt="close"
                className="w-full h-full"
                onClick={deleteImage}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FilUploader;
