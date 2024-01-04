"use client";
import moment from "moment";

import { useAppSelector } from "@/redux/store";

const DashboardContent = () => {
  const { user } = useAppSelector((state) => state.userReducer.value);

  return (
    <div className="py-12 px-6 text-white">
      <h2 className="text-2xl font-bold mb-8 gradient-text">
        Welcome {user?.fullName}!
      </h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#212121] p-8 rounded-2xl ">
          <p className="text-xl font-semibold mb-4">Name</p>
          <p>{user?.fullName}</p>
        </div>
        <div className="bg-[#212121] p-8 rounded-2xl ">
          <p className="text-xl font-semibold mb-4">Email</p>
          <p>{user?.email}</p>
        </div>
        <div className="bg-[#212121] p-8 rounded-2xl ">
          <p className="text-xl font-semibold mb-4">Subscribed Plan</p>
          <p>Premium</p>
        </div>
        <div className="bg-[#212121] p-8 rounded-2xl ">
          <p className="text-xl font-semibold mb-4">Number of Videos Left</p>
          <p>{user?.subscriptionId?.noOfVideosRemaining}</p>
        </div>
        <div className="bg-[#212121] p-8 rounded-2xl ">
          <p className="text-xl font-semibold mb-4">Expiry Date</p>
          <p>
            {moment(user?.subscriptionId?.expiryDate).format("MMM DD, YY ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
