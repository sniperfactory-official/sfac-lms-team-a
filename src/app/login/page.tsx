"use client";

import Image from "next/image";
import logoImg from "/public/images/logo.png";
import LoginForm from "@/components/LoginForm/LoginForm";
import { auth } from "@/utils/firebase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { update } from "@/redux/userSlice";
import { useAppSelector } from "@/redux/store";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userId = useAppSelector(state => state.userId);

  useEffect(() => {
    // auth.onAuthStateChanged(user => {
    if (userId.uid) {
      console.log(userId);
      router.push("/community");
    }
    // });
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-y-12">
      <Image src={logoImg} alt="logo" priority={true} />
      <LoginForm />
    </div>
  );
}
