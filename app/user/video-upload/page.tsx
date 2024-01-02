"use client";
import VideoForm from "@/components/sections/videoUpload/videoUpload";
import DashboardLayout from "@/providers/dashboardLayout/dashboardLayout";
import React from "react";

function VideoUpload() {
  return (
    <DashboardLayout>
      <VideoForm />
    </DashboardLayout>
  );
}

export default VideoUpload;
