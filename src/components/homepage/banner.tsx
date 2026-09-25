import React from "react";
import Image from "next/image";
import bannerImg from "@/assets/banner.png";

const Banner = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-3 sm:px-6 sm:py-4">
      {/* Parent Div - Compact Height & Sleek Padding */}
      <div className="bg-[#12141a] border border-gray-800/80 rounded-xl p-5 sm:p-7 lg:p-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-6 lg:gap-8 overflow-hidden shadow-xl">
        {/* 1st Div: Text Content & Browse Button */}
        <div className="flex-1 space-y-3.5 text-left w-full">
          {/* Subheading */}
          <p className="text-[#ccff00] text-[11px] sm:text-xs font-bold tracking-widest uppercase">
            WORKOUT LIBRARY
          </p>

          {/* Main Title - Compact Professional Typography */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight leading-snug text-white font-sans">
            TRAIN WITH INTENT. <br className="hidden sm:inline" />
            LOG EVERY SET.
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-xs sm:text-sm max-w-md leading-relaxed font-normal">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          {/* Button */}
          <div className="pt-1">
            <button className="bg-[#ccff00] hover:bg-[#b5e600] text-black font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded text-xs tracking-wider uppercase transition-all duration-200 active:scale-95 cursor-pointer">
              BROWSE WORKOUTS
            </button>
          </div>
        </div>

        {/*Image Container */}
        <div className="flex-1 flex justify-center lg:justify-end w-full">
          <div className="relative w-full max-w-55 sm:max-w-65 lg:max-w-[320px] flex items-center justify-center">
            <Image
              src={bannerImg}
              alt="Workout Equipment"
              width={320}
              height={320}
              className="object-contain w-full h-auto drop-shadow-xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
