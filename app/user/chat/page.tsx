import ChatSection from "@/components/sections/ChatSection/ChatSection";
import DashboardLayout from "@/providers/dashboardLayout/dashboardLayout";
import React from "react";

function Chat() {
  return (
    <DashboardLayout>
      <ChatSection />
    </DashboardLayout>
  );
}

export default Chat;
