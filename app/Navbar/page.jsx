import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="flex justify-between bg-gray-200 p-4">
      <h1>Logo</h1>
      <ul className="flex gap-x-3">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/user/About">About</Link>
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
        <li>
          <Link href="/addcourse">Add course</Link>
        </li>
        <li>
          <Link href="/allcouses">Couses</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
