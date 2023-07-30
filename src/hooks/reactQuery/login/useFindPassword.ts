import { sendPasswordResetEmail } from "firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";

interface FormValue {
  email: string;
}

export default function useFindPassword() {
  const router = useRouter();

  const resetPasswordMutation = useMutation(
    ({ email }: FormValue) => sendPasswordResetEmail(auth, email),
    {
      onSuccess: () => {
        router.push("/resetPassword/");
      },
      onError: () => {
        alert("등록되지 않은 이메일입니다. ");
      },
    },
  );
  return { resetPasswordMutation };
}
