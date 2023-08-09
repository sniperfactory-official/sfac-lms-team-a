import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { FormValue } from "./Modal";

const FilUploader = ({
  setValue,
  d,
}: {
  setValue: UseFormSetValue<FormValue>;
  d: string[];
}) => {
  const [myImage, setMyImage] = useState<string[]>([]);
  const storage = getStorage();
  const addImage: React.FormEventHandler<HTMLDivElement> = e => {
    const a = (e.target as HTMLInputElement).files;
    if (a === null) return;
    const arr = Array.from(a as FileList);
    let m = arr.map(async file => {
      const pathReference = ref(storage, `assignments/images/${file.name}`);
      const snapshot = await uploadBytes(pathReference, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setMyImage(prev => {
        return [...prev, downloadURL];
      });
    });
  };

  const deleteImage: React.MouseEventHandler<HTMLImageElement> = e => {
    const id = e.currentTarget.id;
    setMyImage(prev => {
      let copy = [...prev];
      copy.splice(+id,1);
      return [...copy];
    });
  };

  useEffect(() => {
    setValue("images", [...myImage]);
  }, [myImage]);

  useEffect(() => {
    if (d) {
      setMyImage(prev => {
        return ([...d, ...prev])
      });
    }
  },[])

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
              <div
                className="w-[60px] h-[60px] relative cursor-pointer"
                key={ele}
                onClick={deleteImage}
                id={String(index)}
              >
                <div className="w-[60px] h-[60px]">
                  <img
                    className="rounded-[10px] w-full h-full"
                    src={ele}
                  />
                </div>
                <div className="w-[13.33px] h-[13.33px] absolute top-[4.33px] right-[4.33px]">
                  <img
                    src="/images/redClose.svg"
                    alt="close"
                    className="w-full h-full"
                  />
                </div>
              </div>
            );
          })
        : ""}
      {myImage.map((ele, index) => {
        return (
          <div
            className="w-[60px] h-[60px] relative cursor-pointer"
            key={ele}
            onClick={deleteImage}
            id={String(index)}
          >
            <div className="w-[60px] h-[60px]">
              <img
                className="rounded-[10px] w-full h-full"
                src={ele}
              />
            </div>
            <div className="w-[13.33px] h-[13.33px] absolute top-[4.33px] right-[4.33px]">
              <img
                src="/images/redClose.svg"
                alt="close"
                className="w-full h-full"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FilUploader;
