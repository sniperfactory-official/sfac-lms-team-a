"use client";

import Image from "next/image";
import Link from "next/link";
import avatar from "/public/images/avatar.png";
import logo from "/public/images/logo.png";
import { persistor } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { db } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import LoadingSpinner from "@/components/Loading/Loading";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { asyncLogoutFetch } from "@/redux/userSlice";

export default function Navbar() {
  const router = useRouter();
  const userId = useAppSelector(state => state.userId.uid);
  const dispatch = useAppDispatch();

  const purge = async () => {
    await persistor.purge();
    router.push("/login");
  };
  const [userInfo, setUserInfo] = useState<{
    [key: string]: string | undefined;
  }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (userId: string) => {
      try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserInfo(userSnap.data());
          setLoading(false);
          return userSnap.data();
        }
        return null;
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchData(userId);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <div className="flex justify-center bg-blue-50 h-20 items-center">
        <div className="flex justify-between w-3/4">
          <div className="flex">
            <div className="">
              <Image src={avatar} alt="" className="w-10 h-10 mr-2" />
            </div>
            <div className="flex items-center">
              <p>
                안녕하세요
                <span className="font-bold">{userInfo?.username}님</span>, 강의
                <span className="font-bold">10일째</span>입니다.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Image src={logo} alt="" className="w-14 h-8 mr-2" />
            <p>
              <span className="mr-1 text-blue-600 font-bold text-xl">
                FLUTTER
              </span>
              <span className="font-bold text-xl">부트캠프 3기</span>
            </p>
          </div>
          <div className="flex w-1/4 divide-x-2 divide-gray justify-end">
            <Link href={"/mypage/"} className="flex items-center">
              <button className="mr-2">마이페이지</button>
            </Link>
            <div className="flex">
              <button
                className="ml-2"
                onClick={async () => {
                  dispatch(asyncLogoutFetch());
                  setTimeout(() => purge(), 200);
                }}
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
