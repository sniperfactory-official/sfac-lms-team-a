"use client";

import Image from "next/image";
import logoImg from "/public/images/logo.png";
import LoginForm from "@/components/LoginForm/LoginForm";
import { auth } from "@/utils/firebase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { update } from "@/redux/userSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(update(user.uid));

        router.push("/community");
      }
    });
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-y-12">
      <Image src={logoImg} alt="logo" priority={true} />
      <LoginForm />
    </div>
  );
}
