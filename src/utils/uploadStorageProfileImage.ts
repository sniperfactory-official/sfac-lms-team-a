import { ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

export const uploadStorageImages = async (root: string, files: File[]) => {
  console.log("uploadstorage!!!::", files);
  const promises = files.map(file => {
    let rootUrl = "";
    if (root === "users") {
      rootUrl = `users/${file.name}`;
    } else {
      rootUrl = `posts/${root}/${file.name}`;
    }
    const storageRef = ref(storage, rootUrl);
    return uploadBytes(storageRef, file);
  });

  try {
    const snapshots = await Promise.all(promises);
    // console.log('스냅샷배열:', snapshots);
  } catch (error) {
    console.error(error);
  }
};
