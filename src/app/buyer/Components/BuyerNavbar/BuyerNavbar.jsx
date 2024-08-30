// 'use client';
import React from "react";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { CiBellOn } from "react-icons/ci";
import SearchBar from "./SearchBar";
import UserProfile from "./UserProfile";
import CategoryDropdown from "./CategoryDropdown";
import ThemeToggle from "./../../../../components/Navbar/ThemeToggle";

const Logo = () => (
  <h2 className="font-bold text-2xl text-color mr-12">
    <Link href="/buyer">E-Learning</Link>
  </h2>
);

const NavIcons = ({ handleRouteChange }) => {
  const icons = [
    { Icon: FaRegHeart, size: 24, label: "Favorites" },
    { Icon: IoCartOutline, size: 30, label: "Cart" },
  ];
  const handleClick = (index) => {
    if (index === 1) {
      handleRouteChange("MyCart"); // Call handleRouteChange when the second icon is clicked
    }
  };
  return (
    <ul className="flex items-center text-color space-x-5">
      {icons.map(({ Icon, size, label }, index) => (
        <li key={label} className="text-color">
          <Icon size={size} onClick={() => handleClick(index)} />
        </li>
      ))}
    </ul>
  );
};

const BuyerNavbar = ({ handleRouteChange }) => {
  return (
    <nav
      className="flex items-center cardesbackground justify-between px-20 py-7 w-full"
      role="navigation"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000, // Ensure the navbar is above other content
        // A white background to overlay on content
      }}
    >
      <div className="flex items-center cardesbackground ">
        <Logo />
      </div>
      <ul className="flex items-center space-x-5">
        <li
          className="cursor-pointer"
          onClick={() => handleRouteChange("courses")}
        >
          Courses
        </li>
        <li
          className="cursor-pointer"
          onClick={() => handleRouteChange("MyLearning")}
        >
          MyLearning
        </li>
        <li
          className="cursor-pointer"
          onClick={() => handleRouteChange("MyCart")}
        >
          MyCart
        </li>
        <li
          className="cursor-pointer"
          onClick={() => handleRouteChange("Scholarship")}
        >
          Scholarship
        </li>
      </ul>

      <div className="flex items-center space-x-5">
        <NavIcons handleRouteChange={handleRouteChange} />
        {/* <UserProfile /> */}
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default BuyerNavbar;
