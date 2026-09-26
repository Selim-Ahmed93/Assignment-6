import React from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="w-full bg-base-100 border-t border-gray-800/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Side: Brand Logo & Name */}
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="FitLog Logo"
            width={24}
            height={24}
            className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
          />
          <span className="text-base sm:text-lg font-black tracking-wider text-white uppercase font-sans">
            FitLog
          </span>
        </div>

        {/* Right Side: Copyright Text */}
        <p className="text-xs text-gray-400 font-normal text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;