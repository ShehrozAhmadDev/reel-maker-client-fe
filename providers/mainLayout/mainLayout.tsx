import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="text-transparent bg-clip-text">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
