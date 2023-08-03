import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app, db } from "@/utils/firebase";
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

const FilUploader = ({
  setValue,
  d,
  dataes,
  setDataes,
  ig
}: {
  setValue: UseFormSetValue<FormValue>;
  d: string[];
}) => {
  const [myImage, setMyImage] = useState<string[]>([]);
  // const storage = getStorage(app);
  const firebaseApp = getApp();
  const storage = getStorage(firebaseApp, "gs://sniperfactory-lms.appspot.com");
  console.log(dataes)
  if (ig) {
    getDownloadURL(ref(storage, `assignments/2021-11-10 - 복사본.png`))
      .then(url => {
        console.log(url)
      })
  }

  const addImage: React.FormEventHandler<HTMLDivElement> = e => {
    const a = (e.target as HTMLInputElement).files;
    console.log(a)
    const arr = Array.from(a as FileList);
    let c = arr.map(file => {
      let fileRef = ref(storage,`assignments/${file.name}`);
      uploadBytesResumable(fileRef, file);
      return file.name
    })

    const b = [...myImage];
    if (a === null) return;

    for (let i = 0; i < a.length; i++) {
      const c = URL.createObjectURL(a[i]);
      b.push(c);
    }
    setDataes(prev => {
      return { ...prev, remoteImages: [...c], localImages: [...b] }
    })
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
          <img
            id={String(index)}
            key={index}
            className="rounded-[10px] relative after:bg-[url('/images/redClose.svg')] after:absolute after:w-[14px] after:h-[14px] after:bg-red after:block after:content-[''] after:top-[2px] after:left-[2px]"
            width={"100%"}
            src={ele}
            onClick={deleteImage}
          />
        );
      })}
    </div>
  );
};

export default FilUploader;


// import { Attachment, SubmittedAssignment, User } from "@/types/firebase.types";
// import { db } from "@/utils/firebase";
// import { useQuery } from "@tanstack/react-query";
// import {
//   DocumentData,
//   DocumentSnapshot,
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   query,
//   where,
// } from "firebase/firestore";

// const getSubmittedAssignment = async (docId: string) => {
//   const attachmentsCollectionRef = collection(db, "attachments");
//   const submittedAssignmentRef = doc(db, "submittedAssignments", docId);

//   const submittedAssignmentSnapshot = await getDoc(submittedAssignmentRef);
//   const submittedAssignmentData =
//     submittedAssignmentSnapshot.data() as SubmittedAssignment;

//   const querySnapshot = await getDocs(
//     query(
//       attachmentsCollectionRef,
//       where("submittedAssignmentId", "==", submittedAssignmentRef),
//     ),
//   );

//   return Promise.all(
//     querySnapshot.docs.map(async (doc: DocumentSnapshot<DocumentData>) => {
//       const attachments = doc.data() as Attachment;
//       let user;

//       if (attachments.userId) {
//         const userSnapshot = await getDoc(attachments.userId);
//         if (userSnapshot.exists()) {
//           user = userSnapshot.data() as User;
//         }
//       }
//       return {
//         user,
//         attachmentFiles: attachments.attachmentFiles,
//         links: attachments.links,
//         createdAt: submittedAssignmentData.createdAt,
//       };
//     }),
//   );
// };
// const useGetSubmittedAssignment = (docId: string) => {
//   return useQuery(
//     ["submittedAssignment", docId],
//     () => getSubmittedAssignment(docId),
//     {
//       refetchOnWindowFocus: false,
//     },
//   );
// };

// export default useGetSubmittedAssignment;