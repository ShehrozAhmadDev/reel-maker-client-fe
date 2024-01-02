import Sidebar from "@/components/sidebar/sidebar";
import { ReactNode } from "react";

interface DashboardLayout {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayout) => {
  return (
    <div className="flex bg-[#0d0d10] text-black/[.80]">
      <div className="w-[20%]">
        <Sidebar />
      </div>
      <div className="w-[80%] p-6">{children}</div>
    </div>
  );
};

export default DashboardLayout;
