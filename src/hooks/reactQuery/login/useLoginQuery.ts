import { useMutation } from "@tanstack/react-query";
import { login } from "@/components/Auth/sign";

const fetchLogin = async (data: { email: string; password: string }) => {
  const uid = await login(data.email, data.password);
  return uid;
};

export const useLoginMutation = () => {
  return useMutation(fetchLogin);
};
