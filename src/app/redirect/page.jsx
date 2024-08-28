"use client";

import React from "react";

import { useRouter } from "next/navigation";
import "./test.css";

const type = localStorage.getItem("type");
const Redirect = (props) => {
  const router = useRouter();
  console.log(type);
  if (type == "admin") router.push(`/admin/home`);
  if (type == "buyer"||type=='applicant') router.push(`/buyer`);
  if (type == "student") router.push(`/student`);
  if (type == "instructor") router.push(`/instructor`);
  return (
    <div>
      <div>
        <br />
        <br />
        <h1>Just a moment...</h1>
        <br />
        <div className="slider">
          <div className="line" />
          <div className="break dot1" />
          <div className="break dot2" />
          <div className="break dot3" />
        </div>
        <p>
          We are redirecting you to our new site... Not working?{" "}
          <a href="#0">Click here.</a>
        </p>
      </div>
    </div>
  );
};

export default Redirect;
