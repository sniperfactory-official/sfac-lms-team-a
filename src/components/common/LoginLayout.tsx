import Image from "next/image";
import login from "/public/images/login.svg";
import React from "react";

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-y-12">
      <Image src={login} alt="logo" priority={true} />
      {children}
    </div>
  );
}
