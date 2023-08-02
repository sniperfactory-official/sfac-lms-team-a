import { useMutation } from "@tanstack/react-query";
import { login } from "@/utils/sign";
import { useAppDispatch } from "@/redux/store";
import { update } from "@/redux/userSlice";

interface LoginData {
  email: string;
  password: string;
}

const fetchLogin = async (data: LoginData) => {
  const uid = await login(data.email, data.password);
  return uid;
};

export const useLoginMutation = () => {
  const dispatch = useAppDispatch();
  const { mutate, isLoading } = useMutation(fetchLogin, {
    onSuccess: uid => {
      dispatch(update(uid));
    },
    onError: () => {
      alert("로그인 실패했습니다. 다시 로그인 해주세요");
    },
  });
  return { mutate, isLoading };
};
