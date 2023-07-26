"use client";

import Image from "next/image";
import logoImg from "/public/images/logo.png";
import LoginForm from "@/components/LoginForm/LoginForm";
import { auth } from "@/utils/firebase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
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
      <Image src={logoImg} alt="logo" priority={true} />
      <LoginForm />
    </div>
  );
}
