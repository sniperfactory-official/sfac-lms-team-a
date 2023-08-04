"use client";

import Image from "next/image";
import login from "/public/images/login.svg";
import LoginForm from "@/components/LoginForm/LoginForm";
import { auth } from "@/utils/firebase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Auth() {
  const router = useRouter();
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        router.push("/community");
      }
    });
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-y-12">
      <Image src={login} alt="logo" priority={true} />
      <LoginForm />
    </div>
  );
}
