import { ref, deleteObject } from "firebase/storage";
import { storage } from "./firebase";

export default async function deleteStorageImages(rootsArray: string[]) {
  const promises = rootsArray.map(root => {
    const desertRef = ref(storage, root);
    return deleteObject(desertRef);
  });

  try {
    await Promise.all(promises);
  } catch (error) {
    console.error("파일삭제 실패 :: ", error);
  }
}
