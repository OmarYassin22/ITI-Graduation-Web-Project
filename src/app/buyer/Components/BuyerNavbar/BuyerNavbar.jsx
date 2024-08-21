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

const NavIcons = () => {
  const icons = [
    { Icon: FaRegHeart, size: 24, label: "Favorites", href: "/favorites" },
    { Icon: IoCartOutline, size: 30, label: "Cart", href: "/cart" },
    {
      Icon: CiBellOn,
      size: 34,
      label: "Notifications",
      href: "/notifications",
    },
  ];

  return (
    <ul className="flex items-center text-color space-x-5">
      {icons.map(({ Icon, size, label, href }) => (
        <li key={label} className="text-color">
          <Link href={href} aria-label={label}>
            <Icon size={size} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

const BuyerNavbar = ({ handleRouteChange }) => {
  return (
    <nav
      className="flex items-center cardesbackground justify-between px-20 py-7"
      role="navigation"
      style={{ position: "relative", top: "-68px" }}
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
      </ul>

      <div className="flex items-center space-x-5">
        <NavIcons />
        <UserProfile />
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default BuyerNavbar;
