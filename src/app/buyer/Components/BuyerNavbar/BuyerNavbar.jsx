// 'use client';
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { CiBellOn } from "react-icons/ci";
import SearchBar from "./SearchBar";
import UserProfile from "./UserProfile";
import CategoryDropdown from "./CategoryDropdown";
import ThemeToggle from "./../../../../components/Navbar/ThemeToggle";
import { CourseBuyerContext } from "../../../BuyerContext";
import styles from "./style.module.css"; // Import the CSS module

const Logo = () => (
  <h2 className="font-bold text-2xl text-white dark:text-white mr-12">
    <Link href="/buyer">E-Learning</Link>
  </h2>
);

const NavIcons = ({ handleRouteChange }) => {
  let { courseBuyerCart, courseBuyerWish } = useContext(CourseBuyerContext);

  const handleCart = () => {
    handleRouteChange("MyCart");
  };

  const handleWish = () => {
    handleRouteChange("MyWishlist");
  };

  return (
    <ul className="flex items-center text-color space-x-5">
      {[
        {
          Icon: FaRegHeart,
          size: 24,
          label: "Favorites",
          count: courseBuyerWish.length, // Assuming courseBuyerWish is an array
          onClick: handleWish,
        },
        {
          Icon: IoCartOutline,
          size: 30,
          label: "Cart",
          count: courseBuyerCart.length, // Assuming courseBuyerCart is an array
          onClick: handleCart,
        },
      ].map(({ Icon, size, label, count, onClick }) => (
        <li
          key={label}
          className={`text-color cursor-pointer ${styles.cartIcon}`}
          onClick={onClick}
        >
          <Icon size={size} />
          {count > 0 && <span className={styles.cartBadge}>{count}</span>}
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
          className="cursor-pointer text-white dark:text-white hover:text-warning dark:hover:text-warning"
          onClick={() => handleRouteChange("courses")}
        >
          Courses
        </li>
        <li
          className="cursor-pointer text-white dark:text-white hover:text-warning dark:hover:text-warning"
          onClick={() => handleRouteChange("MyLearning")}
        >
          MyLearning
        </li>
        <li
          className="cursor-pointer text-white dark:text-white hover:text-warning dark:hover:text-warning"
          onClick={() => handleRouteChange("MyCart")}
        >
          MyCart
        </li>
        <li
          className="cursor-pointer text-white dark:text-white hover:text-warning dark:hover:text-warning"
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
