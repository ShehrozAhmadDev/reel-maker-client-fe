import { features } from "@/constants/features";
import MainContainer from "@/providers/mainContainer/mainContainer";
import React from "react";

const FeatureSection = () => {
  return (
    <section className="w-full py-24 bg-[#212121] px-5">
      <MainContainer>
        <div className="container mx-auto text-center">
          <div className="max-w-[60%] mx-auto">
            <h2 className="text-3xl font-bold mb-4 gradient-text">
              The Easy Way to Upload and Edit Videos
            </h2>
            <p className="text-lg mb-8 text-gray-300">
              Hexeel Master provides a seamless experience for users to upload
              their videos and subscribe to plans. Our team of professionals
              will edit your videos and create stunning reels for you.
            </p>
          </div>
          <div className="grid mt-16 grid-cols-1 gap-8 md:grid-cols-3">
            {features?.map((feature, index) => (
              <div
                key={index}
                className="bg-[#2f2f2f] p-6 rounded-md shadow-md"
              >
                <h3 className="text-2xl font-semibold mb-4 gradient-text text-start">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-start">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </MainContainer>
    </section>
  );
};

export default FeatureSection;
