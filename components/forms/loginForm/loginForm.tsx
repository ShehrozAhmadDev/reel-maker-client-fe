"use client";
import Login from "@/services/login";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
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
        console.log({ data });
        if (data?.status === 200) {
          Cookie.set("token", data?.token);
          Cookie.set("role", "user");
          dispatch(
            setUser({
              fullName: data?.fullName,
              email: data?.email,
            })
          );
          toast.success("Logged In...");
          router.push("/dashboard");
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
      <div className="w-full max-w-md m-4 p-8 bg-white rounded-lg shadow-2xl">
        <h2 className="text-3xl font-semibold mb-6 text-center  gradient-text">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-md hover:opacity-80 transition-all duration-300"
          >
            Login
          </button>
        </form>

        <span className="w-full flex justify-end">
          <p
            className="underline w-fit font-bold cursor-pointer text-purple-500 mt-2  hover:opacity-85 "
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
