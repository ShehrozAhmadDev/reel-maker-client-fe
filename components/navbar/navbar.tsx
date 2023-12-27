import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="flex items-center text-white mr-6 space-x-20">
        <span className="font-semibold text-xl tracking-tight">
          Hexeel Logo
        </span>
      </div>
      <span className="flex space-x-8 text-lg font-bold text-white">
        <p
          onClick={() => router.push("/")}
          className="mr-4 cursor-pointer hover:underline"
        >
          Home
        </p>
        <p
          onClick={() => router.push("/")}
          className="mr-4 cursor-pointer hover:underline"
        >
          About Us
        </p>
        <p
          onClick={() => router.push("/pricing")}
          className="mr-4 cursor-pointer hover:underline"
        >
          Pricing
        </p>
      </span>
      <div className="flex">
        <div className="flex">
          <button
            onClick={() => router.push("/login")}
            className="bg-white text-pink-500 px-4 py-2 rounded-lg mr-4 hover:bg-pink-500 hover:text-white transition-all duration-300"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-80 transition-all duration-300"
          >
            Signup
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
