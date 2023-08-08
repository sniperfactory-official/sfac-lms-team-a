import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const uploadFileToStorage = async (
  route: string,
  file: File,
): Promise<string> => {
  const storage = getStorage();
  const storageRef = ref(storage, route + file.name);
  await uploadBytes(storageRef, file);
  const fileUrl = await getDownloadURL(storageRef);
  return fileUrl;
};

export default uploadFileToStorage;
