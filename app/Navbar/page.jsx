"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Navbar() {
  let router = useRouter();
  function logout() {
    window.localStorage.removeItem("token");
    router.push("/login");
  }

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
        <li>
          <Link href="/signup">Sign Up</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default Navbar;
