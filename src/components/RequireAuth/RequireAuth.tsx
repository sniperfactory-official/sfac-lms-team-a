// import Navbar from "@/components/Header/Navbar";
import Tab from "@/components/Header/Tab";
import Footer from "@/components/Footer/Footer";
import { auth } from "@/utils/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../Loading/Loading";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // 로그인이 되지 않았거나
    if (!loading && !authenticated) {
      router.push("/");
    } else {
      router.push("/community");
    }
  }, [loading, authenticated]);

  if (loading) {
    <LoadingSpinner />;
  } else {
    if (authenticated) {
      return (
        <>
          {/* <Navbar /> */}
          <Tab />
          {children}
          <Footer />
        </>
      );
    } else {
      return <>{children}</>;
    }
  }
}
