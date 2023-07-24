"use client";
import Image from "next/image";
import loginLogo from '/public/images/login.png';
import { useRouter } from 'next/navigation';
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "@/utils/firebase"


interface User {
  profileImage: string;
  email: string;
  role: string;
  createdAt: Date;
  username: string;
}

export default function ForgotPassword() {
  const [data, setData] = useState<User[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async() => {
      try {
        const querySnapShot = await getDocs(collection(db, "users"));
        const fetchData: User[] = querySnapShot.docs.map((doc) => {
          return doc.data() as User;
        });
        setData(fetchData);
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();

  }, [])


  return (
       <div className="h-screen flex flex-col justify-center items-center gap-y-12">
        <Image src={loginLogo} alt="logo" priority={true} />
        <p>{data.map((user: User) => user.username[0])}님 비밀번호 초기화 요청이 되었습니다</p>
        <div className="w-[422px] flex flex-col gap-[30px]">
          <button className="h-[50px] px-[20px] py-[15px] rounded-[10px] bg-primary-80 text-white hover:opacity-60" onClick={() => {
            router.push("/login/");
          }}>
            돌아가기
          </button>
        </div>
      </div>
  );
}