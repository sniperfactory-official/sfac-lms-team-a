import { ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

export const uploadStorageImages = async (root: string, files: File[]) => {
  const promises = files.map(file => {
    const storageRef = ref(storage, `posts/${root}/${file.name}`);
    return uploadBytes(storageRef, file);
  });

  try {
    const snapshots = await Promise.all(promises);
    // console.log('스냅샷배열:', snapshots);
  } catch (error) {
    console.error(error);
  }
};
