import { ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

export const uploadStorageImages = (files: File[]) => {
  files.map(file => {
    const storageRef = ref(storage, `posts/postImages/${file.name}`);
    uploadBytes(storageRef, file).then(snapshot => {
      console.log(snapshot);
    });
  });
};
