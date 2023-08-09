import { ref } from "firebase/storage";
import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";
import { db, storage } from "@/utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";

// 이미지를 파이어베이스 스토리지에 업로드하는 함수
const uploadImageToStorage = async (
  path: string,
  file: File,
): Promise<string> => {
  const storageRef = ref(storage, `${path}/${file.name}`);
  await uploadBytesResumable(storageRef, file);
  return getDownloadURL(storageRef);
};

// 프로필 이미지를 업로드하고 가져오는 react-query hook
interface UseProfileImageReturnType {
  updateAndGetProfileImage: UseMutationResult<
    string,
    unknown,
    { file: File },
    unknown
  >;
  getProfileImage: UseQueryResult<string, unknown>;
}

export const useProfileImage = (
  userId: string | null,
): UseProfileImageReturnType => {
  const queryClient = useQueryClient();

  const updateAndGetProfileImage = useMutation(
    async ({ file }: { file: File }) => {
      if (!userId) throw new Error("유저 아이디가 없습니다!");
      const path = `users/${file.name}`;
      const url = await uploadImageToStorage(path, file);
      const userRef = doc(db, "users", userId);
      await setDoc(userRef, { profileImage: url }, { merge: true });

      return url;
    },
    {
      // 성공 시 getProfileImage 쿼리를 무효화하고 다시 가져옵니다.
      onSuccess: () => {
        queryClient.invalidateQueries(["profileImage", userId]);
      },
    },
  );

  const getProfileImage = useQuery(
    ["profileImage", userId],
    async () => {
      if (!userId) return "/images/avatar.svg";
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      const profileImage = userSnap.data()?.profileImage;

      return profileImage || "/images/avatar.svg";
    },
    {
      enabled: !!userId,
    },
  );

  return { updateAndGetProfileImage, getProfileImage };
};
