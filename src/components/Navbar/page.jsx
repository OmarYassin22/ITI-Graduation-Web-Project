"use client"
import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import ThemeToggel from "./ThemeToggle";
import styles from "./navbar.module.css";
import { usePathname } from "next/navigation";
import { avatarClasses, Avatar } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSidebar } from "../SidebarContext";
const Navbar = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  let router = useRouter();
  const { data, status } = useSession();
  const handleClick = () => {
    router.push("/");
  };
  const pathName = usePathname();
  return (
    <nav
      className="flex  justify-between cardesbackground dark:text-white bg-blue-900 text-white p-4 dark:bg-[#2D344A] "
      style={{ position: 'sticky', top: 0, zIndex: 10000 }}
    >
      <div className="container flex  justify-between items-center">
      <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
              console.log("Sidebar Open:", !sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-blue-900 bg-blue-900 p-1.5 shadow-sm dark:border-[#2D344A] dark:bg-[#2D344A] lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-white delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-white delay-150 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-white delay-200 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
            </span>
          </button>
        </div>
        <h1 onClick={handleClick} className={styles.cursor}>
          <span className="sm:text-3xl md:text-3xl lg:text-3xl font-bold tracking-wide font-logo"> E-L</span>
          <span className="sm:text-2xl md:text-2xl lg:text-2xl font-light tracking-wide font-logo">earning</span>
        </h1>
        <ul className="flex gap-x-3">
          <li className="text-sm sm:text-base group">
            <Link href="/" className={`${(pathName == "" || pathName == "/" ? `text-warning` : `text-white`)} `}>Home</Link>
            <div className={`${styles.bar} group-hover:block dark:bg-white`}></div>
          </li>

          <li className="text-sm sm:text-base group hidden lg:block">
            <Link href="/user/About" className={`${(pathName == "/user/About" ? `text-warning` : `text-white`)}`}>About</Link>
            <div className={`${styles.bar} group-hover:block dark:bg-white`}></div>
          </li>
          <li className="text-sm sm:text-base group">
            <Link href="/user/Courses" className={`${(pathName == "/user/Courses" ? `text-warning` : `text-white`)}`}>Courses</Link>
            <div className={`${styles.bar} group-hover:block dark:bg-white`}></div>
          </li>

          <li className="text-sm sm:text-base group hidden lg:block">
            <Link href="/user/Contact" className={`${(pathName == "/user/Contact" ? `text-warning` : `text-white`)}`}>Contact Us</Link>
            <div className={`${styles.bar} group-hover:block dark:bg-white`}></div>
          </li>

          
        </ul>
        <div className="flex justify-between items-center gap-2">
          {status === "loading" && (
            <p className="text-sm sm:text-base">Loading...</p>
          )}
          {status == "authenticated" && (
            <button
              onClick={() => {
                signOut();
              }}
              className="text-sm sm:text-base"
            >
              Logout
            </button>
          )}
          {status == "unauthenticated" && (
            <button
              onClick={() => {
                router.push("/api/auth/signin");
              }}
              className="text-sm sm:text-base"
            >
              Login
            </button>
          )}
          <ThemeToggel />
        </div>

      </div>
    </nav>
  );
}
export default Navbar;
