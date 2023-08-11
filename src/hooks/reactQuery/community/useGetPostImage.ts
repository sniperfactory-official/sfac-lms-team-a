import { storage } from "@/utils/firebase";
import { getDownloadURL, ref } from "firebase/storage";

import { useQuery } from "@tanstack/react-query";

const getPostImage = async (imageArr: string[]) => {
  let postImages: { name: string; url: string }[] = [];

  // 모든 작업이 완료될 때까지 기다리도록 Promise.all을 사용합니다
  await Promise.all(
    imageArr.map(async img => {
      const storageRef = ref(storage, img);
      const url = await getDownloadURL(storageRef);
      postImages.push({ name: img, url });
    }),
  );

  return postImages;
};

export default function useGetPostImage(imageArr: string[]) {
  return useQuery(
    ["image", imageArr],
    async () => await getPostImage(imageArr),
  );
}
