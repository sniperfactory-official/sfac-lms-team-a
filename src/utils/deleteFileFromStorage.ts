import { deleteObject, getStorage, ref } from "firebase/storage";

const deleteFileFromStorage = async (route: string) => {
  const storage = getStorage();
  const storageRef = ref(storage, route);
  const response = await deleteObject(storageRef);
  return response;
};

export default deleteFileFromStorage;
