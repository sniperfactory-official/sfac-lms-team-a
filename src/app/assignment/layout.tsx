import Navbar from "@/components/Header/Navbar";
import LectureHallHeader from "../lectureHall/(components)/Header";
import Tab from "@/components/Header/Tab";
import Footer from "@/components/Footer/Footer";

const AssignmentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full">
      {/* <Navbar /> */}
      <Tab />
      {children}
      {/* <div className="min-h-[470px]">{children}</div> */}
      <Footer />
    </div>
  );
};

export default AssignmentLayout;
