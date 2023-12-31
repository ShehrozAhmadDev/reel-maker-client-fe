"use client";
import DashboardContent from "@/components/sections/dashboard/dashboard";
import DashboardLayout from "@/providers/dashboardLayout/dashboardLayout";

const Dashboard = () => {
  return (
    // <div className="flex bg-[#0d0d10] text-black/[.80]">
    //   <div className="w-[20%]">
    //     <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    //   </div>
    //   <div className="w-[80%] p-6">
    //     {selectedTab === "dashboard" && <DashboardContent />}
    //     {selectedTab === "chat" && <Chat />}
    //     {selectedTab === "video-upload" && <VideoForm />}
    //   </div>
    // </div>
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
};

export default Dashboard;
