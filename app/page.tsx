"use client";
import FeatureSection from "@/components/featureSection/featureSection";
import HeroSection from "@/components/heroSection/heroSection";
import MainLayout from "@/providers/mainLayout/mainLayout";
import React from "react";

const Home = () => {
  return (
    <div className="max-w-[1460px] mx-auto">
      <MainLayout>
        <HeroSection />
        <FeatureSection />
      </MainLayout>
    </div>
  );
};

export default Home;
