import MainContainer from "@/providers/mainContainer/mainContainer";
import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center px-5 h-screen justify-center bg-[#0d0d10] to-pink-500">
      <MainContainer>
        <span className="w-[40%] space-y-5 text-center text-white">
          <h1 className="text-4xl font-bold gradient-text w-[40%] mx-auto">
            Unlock Your Video Editing Potential with Hexeel Master
          </h1>
          <p className="text-2xl mx-auto max-w-prose text-center text-white/80">
            Experience seamless video uploading, professional editing, and
            real-time chat for a truly immersive video editing journey
          </p>
        </span>
        <div className="flex space-x-2 my-10 items-center">
          <Image
            src={"/images/heroImage1.jpg"}
            alt="hero image"
            width={400}
            height={400}
            className="w-fit max-h-[400px] object-contain rounded-xl cardShadow"
          />
          <Image
            src={"/images/heroImage5.jpg"}
            alt="hero image"
            width={400}
            height={400}
            className="w-fit max-h-[400px] object-contain rounded-xl cardShadow"
          />
          <span className="space-y-2">
            <Image
              src={"/images/heroImage3.jpg"}
              alt="hero image"
              width={400}
              height={400}
              className="w-fit max-h-[400px] object-contain rounded-xl cardShadow"
            />
            <Image
              src={"/images/heroImage4.jpg"}
              alt="hero image"
              width={400}
              height={400}
              className="w-fit max-h-[400px] object-contain rounded-xl cardShadow"
            />
          </span>
          <Image
            src={"/images/heroImage2.jpg"}
            alt="hero image"
            width={400}
            height={400}
            className="w-fit max-h-[400px] object-contain rounded-xl cardShadow"
          />
        </div>
      </MainContainer>
    </div>
  );
};

export default HeroSection;
