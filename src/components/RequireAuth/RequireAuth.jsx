import React, { useContext } from "react";
import Navbar from "@/components/Header/Navbar";
import Tab from "@/components/Header/Tab";
import Footer from "@/components/Footer/Footer";
import { useSelector } from "react-redux";
import { update } from "@/redux/userSlice";

export default function RequireAuth({ children }) {
  const uid = useSelector(state => state.userId.uid);

  console.log(uid);
  // const uid =true;
  // const uid = useSelector((state) => state.userSlice.useSelector);
  // console.log(uid);

  return (
    <>
      {uid ? (
        <>
          <Tab />
          <Navbar />
          {children}
          <Footer />
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
