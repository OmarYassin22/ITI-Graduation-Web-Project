"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./CoursePage.css";
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import Rater from "react-rater";
import BuyerNavbar from "./../Components/BuyerNavbar/BuyerNavbar";
import BuyerNavbar2 from "./../Components/BuyerNavbar2/BuyerNavbar2";

const Page = ({ params }) => {
  const [courses, setCourses] = useState();
  const { push } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/courses/${params.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setCourses(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [params.id]);

  if (!courses) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <>
      <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
        <div className="mx-auto text-color px-5 lg:px-5">
          <h2 className="pt-3 text-3xl font-bold lg:pt-0">{courses.title}</h2>
          <div className="mt-1">
            <div className="flex items-center">
              <Rater
                style={{
                  fontSize: "20px",
                  display: "flex",
                  flexDirection: "row",
                }}
                total={5}
                interactive={false}
                rating={3}
              />
              <p className="ml-3 text-sm text-gray-400">
                ({courses.reviews || 5})
              </p>
            </div>
          </div>

          <p className="font-bold">
            Instructor:{" "}
            <span className="font-normal">{courses.instructor}</span>
          </p>
          <p className="font-bold">
            Duration: <span className="font-normal">{courses.duration}</span>
          </p>

          <p className="mt-4 text-4xl font-bold text-violet-900">
            ${courses.price}{" "}
          </p>
          <p className="pt-5 text-sm leading-5 text-gray-500">
            {courses.description}
          </p>

          <div className="mt-7 flex flex-row items-center gap-6">
            <button className="flex h-12 w-40 items-center justify-center bg-violet-900 text-white duration-100 hover:bg-blue-800">
              <BiShoppingBag className="text-lg mr-2" />
              Add to cart
            </button>
            <button className="flex h-12 w-40 items-center justify-center bg-amber-400 duration-100 hover:bg-yellow-300">
              <AiOutlineHeart className="text-lg mr-2" />
              Wishlist
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
