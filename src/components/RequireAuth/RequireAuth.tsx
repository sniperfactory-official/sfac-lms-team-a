"use client";

import Navbar from "@/components/Header/Navbar";
import Tabs from "@/components/Header/Tab";
import Footer from "@/components/Footer/Footer";
import { auth } from "@/utils/firebase";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import LoadingSpinner from "../Loading/Loading";
import LoginForm from "../LoginForm/LoginForm";
import LoginLayout from "../common/LoginLayout";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    });

    // unmounted 됐을 때 메모리 누수의 문제가 발생할 수 있으니 cleanup()함수 사용
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (loading) return;

    // 로그인 페이지에서만 로그인 폼 보이게 설정
    if (pathname === "/") {
      setShowLoginForm(true);
    } else {
      // 그 외 페이지에서는 로그인 폼 숨김
      setShowLoginForm(false);
    }

    // 만약 현재 경로가 forgotPassword이거나 resetPassword 페이지라면 아무것도 하지 않음
    if (pathname === "/forgotPassword" || pathname === "/resetPassword") return;

    // 로그인이 되지 않았다면 계속 로그인 페이지
    if (!authenticated) {
      router.push("/");
    } else {
      // 로그인이 되었고, 현재 경로가 로그인 페이지라면 커뮤니티로 이동
      if (pathname === "/") {
        router.push("/community");
      }
    }
  }, [loading, authenticated, pathname]);

  // 로딩 상태면 Loading Spinner 사용
  if (loading) {
    return <LoadingSpinner />;
  }

  if (showLoginForm) {
    return (
      <>
        <LoginLayout>
          <LoginForm />
        </LoginLayout>
      </>
    );
  }

  if (authenticated) {
    return (
      <>
        <Navbar />
        <Tabs />
        {children}
        <Footer />
      </>
    );
  } else {
    return <>{children}</>;
  }
}
