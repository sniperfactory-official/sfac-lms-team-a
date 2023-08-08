import { ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

export default async function uploadStorageImages(root: string, files: File[]) {
  const rootsArray: string[] = [];
  const promises = files.map(file => {
    const storageRef = ref(storage, `${root}/${file.name}`);
    rootsArray.push(`${root}/${file.name}`);
    return uploadBytes(storageRef, file);
  });

  try {
    const snapshots = await Promise.all(promises);
    return rootsArray;
  } catch (error) {
    console.error("이미지 업로드 중 오류가 발생했습니다:", error);
    return;
  }
}
