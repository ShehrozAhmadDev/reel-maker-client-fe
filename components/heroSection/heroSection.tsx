import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center  h-screen justify-center bg-gradient-to-r from-purple-600 to-pink-500">
      <span className="w-[40%] space-y-5 text-center">
        <h1 className="text-white text-3xl font-bold">
          Unlock Your Video Editing Potential with Hexeel Master
        </h1>
        <p>
          Experience seamless video uploading, professional editing, and
          real-time chat for a truly immersive video editing journey
        </p>
      </span>
      <div className="flex space-x-2 my-10 px-5">
        <Image
          src={"/images/heroImage1.jpg"}
          alt="hero image"
          width={400}
          height={400}
          className="w-fit max-h-[400px] object-contain rounded-lg"
        />
        <Image
          src={"/images/heroImage5.jpg"}
          alt="hero image"
          width={400}
          height={400}
          className="w-fit max-h-[400px] object-contain rounded-lg"
        />
        <span className="space-y-2">
          <Image
            src={"/images/heroImage3.jpg"}
            alt="hero image"
            width={400}
            height={400}
            className="w-fit max-h-[400px] object-contain rounded-lg"
          />
          <Image
            src={"/images/heroImage4.jpg"}
            alt="hero image"
            width={400}
            height={400}
            className="w-fit max-h-[400px] object-contain rounded-lg"
          />
        </span>
        <Image
          src={"/images/heroImage2.jpg"}
          alt="hero image"
          width={400}
          height={400}
          className="w-fit max-h-[400px] object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

export default HeroSection;
