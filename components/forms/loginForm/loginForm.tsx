"use client";
import Login from "@/services/login";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookie from "js-cookie";
import { setUser } from "@/redux/features/user-slice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Login.postLogin(email, password)
      .then((data) => {
        if (data?.status === 200) {
          Cookie.set("token", data?.token);
          Cookie.set("role", data?.role);
          dispatch(
            setUser({
              id: data._id,
              fullName: data?.fullName,
              email: data?.email,
              stripeId: data?.stripeId,
              subscriptionId: data?.subscriptionId,
            })
          );
          toast.success("Logged In...");
          router.push("/user/dashboard");
          router.refresh();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  return (
    <div className="w-full flex justify-center items-center h-[calc(100vh-160px)] text-black ">
      <div className="w-full max-w-md m-4 p-8 bg-[#212121] rounded-lg shadow-2xl text-white">
        <h2 className="text-3xl font-semibold mb-6 text-center gradient-text">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-md focus:outline-none bg-[#2f2f2f]"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-md focus:outline-none bg-[#2f2f2f]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-3 rounded-md hover:opacity-80 transition-all duration-300"
          >
            Login
          </button>
        </form>

        <span className="w-full flex justify-end items-center mt-5 space-x-2">
          <p className="text-sm text-white/[.60]">You don't have an account?</p>
          <p
            className="underline w-fit font-bold cursor-pointer text-purple-500  hover:opacity-85 "
            onClick={() => router.push("/signup")}
          >
            SignUp
          </p>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
