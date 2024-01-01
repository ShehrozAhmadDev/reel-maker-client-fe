import Cookie from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  IoChatbubbleEllipsesOutline,
  IoCloudUploadOutline,
} from "react-icons/io5";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";

interface SidebarProps {
  selectedTab: string;
  setSelectedTab: (index: string) => void;
}

const Sidebar = ({ selectedTab, setSelectedTab }: SidebarProps) => {
  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove("token");
    Cookie.remove("role");
    router.refresh();
  };

  return (
    <div className="bg-[#111114] text-white h-screen w-full p-6 text-lg">
      <div
        onClick={() => router.push("/")}
        className="w-fit flex items-center mb-12 text-white mr-6 space-x-2 cursor-pointer"
      >
        <Image
          src={"/logo.png"}
          alt="logo"
          width={50}
          height={50}
          className="w-[40px] object-contain"
        />
        <p className="text-[#e61072] text-xl font-bold">Hexeel</p>
      </div>
      <div
        className={`flex space-x-2 items-center cursor-pointer mb-6 hover:opacity-70 transition-all duration-300 p-2 ${
          selectedTab === "dashboard"
            ? "text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"
            : ""
        }`}
        onClick={() => setSelectedTab("dashboard")}
      >
        <MdOutlineDashboardCustomize />
        <p>Dashboard</p>
      </div>
      <div
        className={`flex space-x-2 items-center cursor-pointer mb-6 hover:opacity-70 transition-all duration-300 p-2 ${
          selectedTab === "chat"
            ? "text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"
            : ""
        }`}
        onClick={() => setSelectedTab("chat")}
      >
        <IoChatbubbleEllipsesOutline />
        <p>Chat</p>
      </div>
      <div
        className={`flex space-x-2 items-center cursor-pointer mb-6 hover:opacity-70 transition-all duration-300 p-2 ${
          selectedTab === "video-upload"
            ? "text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"
            : ""
        }`}
        onClick={() => setSelectedTab("video-upload")}
      >
        <IoCloudUploadOutline />
        <p>Video Upload</p>
      </div>
      <div
        className={`flex space-x-2 items-center cursor-pointer mb-6 hover:opacity-70 transition-all duration-300 p-2 ${
          selectedTab === "logout"
            ? "text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"
            : ""
        }`}
        onClick={handleLogout}
      >
        <TbLogout2 />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default Sidebar;
