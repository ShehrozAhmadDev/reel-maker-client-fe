"use client";
import { setUser } from "@/redux/features/user-slice";
import Cookie from "js-cookie";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  IoChatbubbleEllipsesOutline,
  IoCloudUploadOutline,
} from "react-icons/io5";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Sidebar = () => {
  const router = useRouter();
  const param = usePathname();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setUser(null));
    Cookie.remove("token");
    Cookie.remove("role");
    toast.success("logging out...");
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
          param === "/user/dashboard"
            ? "text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"
            : ""
        }`}
        onClick={() => {
          router.push("/user/dashboard");
        }}
      >
        <MdOutlineDashboardCustomize />
        <p>Dashboard</p>
      </div>
      <div
        className={`flex space-x-2 items-center cursor-pointer mb-6 hover:opacity-70 transition-all duration-300 p-2 ${
          param === "/user/chat"
            ? "text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"
            : ""
        }`}
        onClick={() => {
          router.push("/user/chat");
        }}
      >
        <IoChatbubbleEllipsesOutline />
        <p>Chat</p>
      </div>
      <div
        className={`flex space-x-2 items-center cursor-pointer mb-6 hover:opacity-70 transition-all duration-300 p-2 ${
          param === "/user/video-upload"
            ? "text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"
            : ""
        }`}
        onClick={() => {
          router.push("/user/video-upload");
        }}
      >
        <IoCloudUploadOutline />
        <p>Video Upload</p>
      </div>
      <div
        className={`flex space-x-2 items-center cursor-pointer mb-6 hover:opacity-70 transition-all duration-300 p-2 `}
        onClick={handleLogout}
      >
        <TbLogout2 />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default Sidebar;
