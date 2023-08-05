import { storage } from "@/utils/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { useQuery } from "@tanstack/react-query";

const fetchThumbnailImage = async (
  thumbnailImages: string[],
): Promise<string | null> => {
  if (!thumbnailImages || thumbnailImages.length === 0) return null;

  const firstImageRef = ref(storage, thumbnailImages[0]);

  return await getDownloadURL(firstImageRef);
};

export const useFetchThumbnail = (thumbnailImages: string[] = []) => {
  return useQuery<string | null, Error>(
    ["thumbnailImage", thumbnailImages[0]],
    () => fetchThumbnailImage(thumbnailImages),
    {
      enabled: !!thumbnailImages && thumbnailImages.length > 0,
    },
  );
};
