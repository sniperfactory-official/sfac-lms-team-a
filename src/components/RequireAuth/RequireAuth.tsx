import Navbar from "@/components/Header/Navbar";
import Tab from "@/components/Header/Tab";
import Footer from "@/components/Footer/Footer";
import { useAppSelector } from "@/redux/store";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const uid = useAppSelector(state => state.userId.uid);

  return (
    <>
      {uid ? (
        <>
          <Navbar />
          <Tab />
          {children}
          <Footer />
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
