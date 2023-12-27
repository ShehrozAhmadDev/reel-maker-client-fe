"use client";
import { plans } from "@/constants/plans";
import MainLayout from "@/providers/mainLayout/mainLayout";
import React from "react";

const Pricing = () => {
  return (
    <MainLayout>
      <div className="py-20 h-[calc(100vh-160px)] bg-gradient-to-r from-purple-500 to-blue-500 text-black flex items-center justify-center">
        <div className="flex justify-center">
          {plans?.map((plan, index) => (
            <div
              key={index}
              className="bg-white w-[350px] rounded-lg p-6 shadow-2xl mx-4 flex flex-col justify-between"
            >
              <span>
                <h2 className="text-2xl font-bold mb-4 gradient-text text-center">
                  {plan.title}
                </h2>
                <p className="text-4xl font-semibold mb-4 text-center">
                  {plan.price}
                </p>

                <div className="list-disc pl-5 mb-8 mt-6">
                  {plan.features.map((feature, idx) => (
                    <span className="flex space-x-2">
                      <p className="bg-gradient-to-r from-purple-600 to-pink-500 w-2 h-2 rounded-full mt-1.5"></p>
                      <p key={idx}>{feature}</p>
                    </span>
                  ))}
                </div>
              </span>
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-80 transition-all duration-300">
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Pricing;
