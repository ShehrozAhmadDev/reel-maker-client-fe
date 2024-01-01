import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
}

const MainLayout = ({ children }: GradientTextProps) => {
  return (
    <div className="text-transparent bg-clip-text">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
