import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/components/Auth/sign";

const fetchLogout = async () => {
  await logout();
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(fetchLogout, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};
