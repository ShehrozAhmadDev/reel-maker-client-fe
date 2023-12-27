import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

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
    <div className="bg-gray-900 text-white h-screen w-1/4 p-6 text-lg">
      <p
        className="text-3xl font-bold mb-8 text-yellow-400 cursor-pointer"
        onClick={() => router.push("/")}
      >
        Hexeel [LOGO]
      </p>
      <div
        className={`cursor-pointer mb-6 hover:text-yellow-400 ${
          selectedTab === "dashboard" ? "text-yellow-400" : ""
        }`}
        onClick={() => setSelectedTab("dashboard")}
      >
        Dashboard
      </div>
      <div
        className={`cursor-pointer mb-6 hover:text-yellow-400 ${
          selectedTab === "chat" ? "text-yellow-400" : ""
        }`}
        onClick={() => setSelectedTab("chat")}
      >
        Chat
      </div>
      <div
        className={`cursor-pointer mb-6 hover:text-yellow-400 ${
          selectedTab === "settings" ? "text-yellow-400" : ""
        }`}
        onClick={() => setSelectedTab("settings")}
      >
        Settings
      </div>
      <div
        className={`cursor-pointer mb-6 hover:text-yellow-400 ${
          selectedTab === "logout" ? "text-yellow-400" : ""
        }`}
        onClick={handleLogout}
      >
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
