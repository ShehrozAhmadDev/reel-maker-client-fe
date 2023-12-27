"use client";

import { useAppSelector } from "@/redux/store";

const DashboardContent = () => {
  const { user } = useAppSelector((state) => state.userReducer.value);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 ">Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <p className="bg-blue-200 p-6 h-28 flex items-center rounded-lg text-[20px]">
          Name: {user?.fullName}
        </p>
        <p className="bg-green-200 p-6 h-28 flex items-center rounded-lg text-[20px]">
          Email: {user?.email}
        </p>
        <p className="bg-red-300 p-6 h-28 flex items-center rounded-lg text-[20px]">
          Subscription Plan: Premium
        </p>
        <p className="bg-yellow-200 p-6 h-28 flex items-center rounded-lg text-[20px]">
          Videos Left: 10
        </p>
      </div>
    </div>
  );
};

export default DashboardContent;
