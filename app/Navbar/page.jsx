"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { avatarClasses, Avatar } from "@mui/material";

function Navbar() {
  let router = useRouter();

  const { data, status } = useSession();

  return (
    <nav className="flex justify-between bg-blue-900 text-white p-4">
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
            router.push("api/auth/signin");
          }}
        >
          Login
        </button>
      )}
    </nav>
  );
}

export default Navbar;
