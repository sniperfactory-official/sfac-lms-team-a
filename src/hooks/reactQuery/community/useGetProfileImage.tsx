import { storage } from "@/utils/firebase";
import { getDownloadURL, ref } from "firebase/storage";

import { useQuery } from "@tanstack/react-query";

const getProfileImage = async (image: string | undefined) => {
  if (!image) {
    return "/images/avatar.svg";
  }

  const storageRef = ref(storage, image);
  const url = await getDownloadURL(storageRef);

  return url;
};

export default function useGetProfileImage(image: string | undefined) {
  return useQuery(["image", image], async () => await getProfileImage(image));
}
