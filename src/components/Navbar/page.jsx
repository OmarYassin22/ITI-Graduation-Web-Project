"use client";
import React from "react";
import Link from "next/link";
// <<<<<<< HEAD
// import { useRouter } from "next/navigation";
// =======
import { useRouter } from "next/navigation";
// <<<<<<< HEAD:app/Navbar/page.jsx
// >>>>>>> fcf6f2b8117bcbb8265e889b768901ba3586baaf

import { signOut, useSession } from "next-auth/react";
import { avatarClasses, Avatar } from "@mui/material";
import ThemeToggel from "./ThemeToggle";

function Navbar() {
  let router = useRouter();

  const { data, status } = useSession();
  // >>>>>>> 5f81df541979e0781e214db42b9a76802f8c0d9e:src/components/Navbar/page.jsx

  return (
    <nav className="flex  justify-between cardesbackground dark:text-white bg-blue-900 text-white p-4">
      <div className="container flex  justify-between items-center">
        <h1>
          <span className="text-3xl"> E-L</span>
          <span className="text-2xl">earning</span>
        </h1>
        <ul className="flex  gap-x-3">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/user/About">About</Link>
          </li>
          <li>
            <Link href="/user/Courses">Courses</Link>
          </li>
          <li>
            <Link href="/user/Contact">Contact Us</Link>
          </li>
        </ul>
        <div className="flex justify-between items-center gap-2">
          {status === "loading" && <p>Loading...</p>}
          {status == "authenticated" && (
            <button
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </button>
          )}

          {status == "unauthenticated" && (
            <button
              onClick={() => {
                router.push("/api/auth/signin");
              }}
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
