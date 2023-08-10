import { useToast } from "./../../useToast";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/utils/sign";
import { useAppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { loginUser } from "@/redux/userSlice";
import { db } from "@utils/firebase";
import { getDoc, doc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

interface LoginData {
  email: string;
  password: string;
}

const fetchLogin = async (data: LoginData): Promise<string> => {
  const uid = await login(data.email, data.password);
  return uid;
};

export const useLoginMutation = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toastProps, setToastProps } = useToast();

  const { mutate, isLoading, isSuccess } = useMutation(fetchLogin, {
    onSuccess: async (uid: string) => {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        dispatch(loginUser({ uid, userData }));

        router.push("/community");
      }
    },
    onError: (error: FirebaseError) => {
      const errorCode = error.code;
      if (errorCode === "auth/user-not-found") {
        setToastProps({
          type: "Error",
          text: "등록되지 않은 아이디입니다.",
          textSize: "base",
        });
      } else if (errorCode === "auth/wrong-password") {
        setToastProps({
          type: "Error",
          text: "비밀번호가 일치하지 않습니다.",
          textSize: "base",
        });
      } else {
        setToastProps({
          type: "Error",
          text: `로그인 실패했습니다. 다시 로그인 해주세요. 오류: ${errorCode}`,
          textSize: "base",
        });
      }
    },
  });
  return { mutate, isLoading, isSuccess, toastProps };
};
