"use client";
import FeatureSection from "@/components/featureSection/featureSection";
import HeroSection from "@/components/heroSection/heroSection";
import MainLayout from "@/providers/mainLayout/mainLayout";
import React from "react";

const Home = () => {
  return (
    <MainLayout>
      <HeroSection />
      <FeatureSection />
    </MainLayout>
  );
};

export default Home;
