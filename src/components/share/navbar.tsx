'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { usePlan } from "@/context/PlanContext";

const Navbar = () => {
  const { planList, savedList } = usePlan();

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 border-b border-gray-800/80 shadow-sm h-16 max-w-7xl mx-auto px-2 sm:px-4">
      <div className="navbar-start flex items-center gap-1 sm:gap-2">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle lg:hidden"
          >
            <svg
              aria-label="Menu"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          {/* Mobile Dropdown Menu Items */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow border border-gray-800"
          >
            <li>
              <Link href="/#library" className="hover:text-yellow-300">
                Workout
              </Link>
            </li>
            <li>
              <Link href="/my-plan" className="hover:text-yellow-300">
                My Plan
              </Link>
            </li>
          </ul>
        </div>

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer">
          <Image
            src={logo}
            alt="FitLog Logo"
            width={32}
            height={32}
            className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
            priority
          />
          <span className="text-xl sm:text-2xl font-black tracking-wider text-white uppercase font-sans">
            FitLog
          </span>
        </Link>
      </div>

      {/* Desktop Menu Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 font-medium">
          <li>
            <Link href="/#library" className="hover:text-yellow-300 transition-colors">
              Workout
            </Link>
          </li>
          <li>
            <Link href="/my-plan" className="hover:text-yellow-300 transition-colors">
              My Plan
            </Link>
          </li>
        </ul>
      </div>

      {/* Badges Section with Dynamic Counts */}
      <div className="navbar-end flex items-center gap-2 sm:gap-3">
        <Link
          href="/my-plan"
          className="flex items-center gap-2.5 sm:gap-4 bg-[#0d0f12] px-2.5 sm:px-3 py-1.5 rounded-lg text-white hover:opacity-90 transition-opacity"
        >
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium">
            <span>Plan</span>
            <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#ccff00] text-black text-[10px] sm:text-xs font-bold">
              {planList.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-gray-300">
            <span>Saved</span>
            <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-[#2a2f3a] text-[10px] sm:text-xs font-medium text-gray-300">
              {savedList.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;