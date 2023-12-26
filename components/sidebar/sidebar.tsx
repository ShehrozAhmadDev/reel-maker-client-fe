import { useState } from "react";

interface SidebarProps {
  selectedTab: string;
  setSelectedTab: (index: string) => void;
}

const Sidebar = ({ selectedTab, setSelectedTab }: SidebarProps) => {
  return (
    <div className="bg-gray-800 text-white h-screen w-1/4 p-6 text-xl">
      <div className="text-2xl font-bold mb-6 text-yellow-500">
        Hexeel [LOGO]
      </div>
      <div
        className={`cursor-pointer mb-4 hover:text-blue-500 ${
          selectedTab === "dashboard" ? "text-blue-500" : ""
        }`}
        onClick={() => setSelectedTab("dashboard")}
      >
        Dashboard
      </div>
      <div
        className={`cursor-pointer mb-4 hover:text-blue-500 ${
          selectedTab === "chat" ? "text-blue-500" : ""
        }`}
        onClick={() => setSelectedTab("chat")}
      >
        Chat
      </div>
      <div
        className={`cursor-pointer mb-4 hover:text-blue-500 ${
          selectedTab === "settings" ? "text-blue-500" : ""
        }`}
        onClick={() => setSelectedTab("settings")}
      >
        Settings
      </div>
    </div>
  );
};

export default Sidebar;
