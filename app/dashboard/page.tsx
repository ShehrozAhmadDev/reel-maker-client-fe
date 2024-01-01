"use client";
import Chat from "@/components/sections/chat/chat";
import DashboardContent from "@/components/sections/dashboard/dashboard";
import VideoForm from "@/components/sections/videoUpload/videoUpload";
import Sidebar from "@/components/sidebar/sidebar";
import { useState } from "react";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");

  return (
    <div className="flex bg-[#0d0d10] text-black/[.80]">
      <div className="w-[20%]">
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>
      <div className="w-[80%] p-6">
        {selectedTab === "dashboard" && <DashboardContent />}
        {selectedTab === "chat" && <Chat />}
        {selectedTab === "video-upload" && <VideoForm />}
      </div>
    </div>
  );
};

export default Dashboard;
