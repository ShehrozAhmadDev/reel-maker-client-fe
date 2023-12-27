import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
}

const MainLayout = ({ children }: GradientTextProps) => {
  return (
    <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
      <Navbar />
      {children}
      <Footer />
    </span>
  );
};

export default MainLayout;
