import MainContainer from "@/providers/mainContainer/mainContainer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Cookie from "js-cookie";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/user-slice";
import { toast } from "react-toastify";

const Navbar = () => {
  const router = useRouter();
  let verify = Cookie?.get("token");
  const { user } = useAppSelector((state) => state.userReducer.value);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setUser(null));
    Cookie.remove("token");
    Cookie.remove("role");
    toast.success("logging out...");
    router.refresh();
  };

  const navItems = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About Us",
      link: "/",
    },
    {
      title: "Pricing",
      link: "/pricing",
    },
  ];

  return (
    <nav className=" bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <MainContainer>
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center text-white mr-6 space-x-16 cursor-pointer">
            <span
              className="flex items-center space-x-2"
              onClick={() => router.push("/")}
            >
              <Image
                src={"/logo.png"}
                alt="logo"
                width={50}
                height={50}
                className="w-[40px] object-contain"
              />
              <p className="text-[#e61072] text-xl font-bold">Hexeel</p>
            </span>

            <span className="flex space-x-8 text-lg font-bold text-white">
              {navItems.map((item) => (
                <p
                  onClick={() => router.push(item.link)}
                  className="mr-4 cursor-pointer hover:opacity-70 transition-all duration-300"
                >
                  {item.title}
                </p>
              ))}
            </span>
          </div>
          {!verify ? (
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
          ) : (
            <div className="flex space-x-4 items-center">
              <p className="text-lg font-bold text-white">{user?.email}</p>
              <button
                onClick={() => router.push("/user/dashboard")}
                className="bg-white text-pink-500 px-4 py-2 rounded-lg mr-4 hover:bg-pink-500 hover:text-white transition-all duration-300"
              >
                Dashboard
              </button>
              <button
                className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-80 transition-all duration-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </MainContainer>
    </nav>
  );
};

export default Navbar;
