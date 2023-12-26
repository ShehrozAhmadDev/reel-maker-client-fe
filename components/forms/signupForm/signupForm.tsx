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
    <div className="flex justify-center items-center h-screen text-black bg-gray-100">
      <div className="w-full max-w-md m-4 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center">SignUp</h2>

        <form onSubmit={handleSignUp}>
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Full Name:</label>

            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Email:</label>

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
            <label className="block mb-2 font-semibold">Password:</label>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          {/* <div className="mb-6">
            <label className="block mb-2 font-semibold">Select a Plan:</label>
            <select
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500"
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              required
            >
              <option value="">Select a Plan</option>

              <option value="basic">Basic Plan - $200 per month</option>
              <option value="standard">Standard Plan - $500 per month</option>
              <option value="premium">Premium Plan - $3000 per month</option>
            </select>
          </div> */}
          {/* <div className="mb-6">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div> */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <span className="w-full flex justify-end">
          <p
            className="underline w-fit font-bold cursor-pointer text-blue-400 mt-2  hover:opacity-85 "
            onClick={() => router.push("/")}
          >
            Login
          </p>
        </span>
      </div>
    </div>
  );
};

export default SignupForm;
