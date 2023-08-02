import LoginForm from "@/components/LoginForm/LoginForm";
import Image from "next/image";
import login from "/public/images/login.svg";

export default function LoginPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-y-12">
      <Image src={login} alt="logo" priority={true} />
      <LoginForm />
    </div>
  );
}
