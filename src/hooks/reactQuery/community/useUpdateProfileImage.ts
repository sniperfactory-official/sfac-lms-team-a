import { updateDoc, Timestamp, doc } from "@firebase/firestore";
import { db } from "@/utils/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface updateProfileProps {
  userId: string;
  profileImage: string;
}

const updateProfile = async ({ userId, profileImage }: updateProfileProps) => {
  let profileRef;
  profileRef = doc(db, "users", userId);
  await updateDoc(profileRef, {
    profileImage: `users/${profileImage}`,
  });
};
const useUpdateProfile = () => {
  // QueryClient를 통해 만들어진 객체의 정보를 얻기
  const queryClient = useQueryClient();
  const { mutate, error } = useMutation<void, Error, updateProfileProps>(
    // 실행할 함수
    updateProfile,
    {
      onMutate: async () => {},
      // 성공했을시
      onSuccess: () => {
        // 쿼리를 무효화 시켜 다시 조회해서 updated 바로 반영 처리
        // queryClient.invalidateQueries(["users"]);
        queryClient.invalidateQueries(["image"]); // 쿼리를 무효화하여 자동 리프레시
      },
    },
  );
  // 다른 컴포넌트에서 업데이트 작업, 에러 확인 가능.
  return { mutate, error };
};
export default useUpdateProfile;
