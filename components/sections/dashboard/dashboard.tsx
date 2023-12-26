"use client";

const DashboardContent = () => {
  const userData = {
    name: "John Doe",
    email: "john@gmail.com",
    subscriptionPlan: "Premium",
    videosLeft: 10,
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 ">Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <p className="bg-blue-200 p-6 h-28 flex items-center rounded-lg text-[20px]">
          Name: {userData.name}
        </p>
        <p className="bg-green-200 p-6 h-28 flex items-center rounded-lg text-[20px]">
          Email: {userData.email}
        </p>
        <p className="bg-red-300 p-6 h-28 flex items-center rounded-lg text-[20px]">
          Subscription Plan: {userData.subscriptionPlan}
        </p>
        <p className="bg-yellow-200 p-6 h-28 flex items-center rounded-lg text-[20px]">
          Videos Left: {userData.videosLeft}
        </p>
      </div>
    </div>
  );
};

export default DashboardContent;
