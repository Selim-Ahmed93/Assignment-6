import React from 'react';
import Image from 'next/image';
import logo from '@/assets/logo.png';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
        </div>
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image
            src={logo}
            alt="FitLog Logo"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
            priority
          />
          <span className="text-2xl font-black tracking-wider text-white uppercase font-sans">
            FitLog
          </span>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a className=" hover:text-yellow-300">Works</a>
          </li>
          <li>
            <a>My plan</a>
          </li>
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-3">
        <div className="flex items-[#0d0f12] items-center gap-4 bg-[#0d0f12] px-3 py-1.5 rounded-lg text-white">
          <button className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity">
            <span>Plan</span>
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#ccff00] text-black text-xs font-bold">
              0
            </span>
          </button>
          <button className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:opacity-80 transition-opacity">
            <span>Saved</span>
            <span className="flex items-center justify-center w-5 h-5 rounded-full border border-[#2a2f3a] text-xs font-medium text-gray-300">
              0
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;