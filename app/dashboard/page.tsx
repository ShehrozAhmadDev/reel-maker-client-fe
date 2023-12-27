"use client";
import Chat from "@/components/sections/chat/chat";
import DashboardContent from "@/components/sections/dashboard/dashboard";
import SettingsComponent from "@/components/sections/settings/settings";
import Sidebar from "@/components/sidebar/sidebar";
import { useState } from "react";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");

  return (
    <div className="flex bg-gradient-to-r from-purple-500 to-blue-500 text-black/[.80]">
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className="w-3/4 p-6">
        {selectedTab === "dashboard" && <DashboardContent />}
        {selectedTab === "chat" && <Chat />}
        {selectedTab === "settings" && <SettingsComponent />}
      </div>
    </div>
  );
};

export default Dashboard;
