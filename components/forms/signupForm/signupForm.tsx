import React from "react";
import { useRouter } from "next/navigation";

interface SignupProps {
  fullName: string;
  email: string;
  password: string;
  setFullName: (index: string) => void;
  setEmail: (index: string) => void;
  setPassword: (index: string) => void;
  handleSignUp: (index: React.FormEvent<HTMLFormElement>) => void;
}

const SignupForm = ({
  fullName,
  email,
  password,
  setFullName,
  setEmail,
  setPassword,
  handleSignUp,
}: SignupProps) => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-[calc(100vh-160px)] text-black bg-[#0d0d10]">
      <div className="w-full max-w-md m-4 p-8 bg-[#212121] rounded-lg shadow-2xl text-white">
        <h2 className="text-3xl font-semibold mb-6 text-center  gradient-text">
          SignUp
        </h2>

        <form onSubmit={handleSignUp}>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 rounded-md focus:outline-none bg-[#2f2f2f]"
              required
            />
          </div>
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
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-md hover:opacity-80 transition-all duration-300"
          >
            Sign Up
          </button>
        </form>
        <span className="w-full flex justify-end items-center mt-5 space-x-2">
          <p className="text-sm text-white/[.60]">
            You already have an account?
          </p>
          <p
            className="underline w-fit font-bold cursor-pointer text-purple-500 hover:opacity-85 "
            onClick={() => router.push("/login")}
          >
            Login
          </p>
        </span>
      </div>
    </div>
  );
};

export default SignupForm;
