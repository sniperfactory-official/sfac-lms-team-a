import { useMutation } from "@tanstack/react-query";
import { login } from "@/components/Auth/sign";

interface LoginData {
  email: string;
  password: string;
}

const fetchLogin = async (data: LoginData) => {
  const uid = await login(data.email, data.password);
  return uid;
};

export const useLoginMutation = () => {
  return useMutation(fetchLogin);
};
