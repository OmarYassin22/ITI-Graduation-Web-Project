"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import StarRating from "./Components/StarRating/StarRating";
import BuyerNavbar from "./Components/BuyerNavbar/BuyerNavbar";
import Coursess from "./Courses/Coursess";
import MyLearning from "./Components/CourseCardes/MyLearning";
import MyCart from "./Components/CourseCardes/MyCart";


export default function Home() {
  const [selectedRoute, setSelectedRoute] = useState("courses");
  const [buyerCorses, setBuyerCorses] = useState([]);
  const handleRouteChange = (route) => {
    setSelectedRoute(route);
  };
  function handelCourses(x) {
    setBuyerCorses(x);
  }
  return (
    <div>
      <BuyerNavbar handleRouteChange={handleRouteChange} />

      <div className="px-20 py-12 ">
        {selectedRoute === "courses" && (
          <Coursess handelCourses={handelCourses} />
        )}
        {selectedRoute === "MyCart" && <MyCart />}
        {selectedRoute === "MyLearning" && <MyLearning />}
      </div>
     
    </div>
  );
}
