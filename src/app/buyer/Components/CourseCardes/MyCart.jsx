"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { CourseBuyerContext } from "../../../BuyerContext";
import { MdDeleteSweep } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import Image from "next/image";

const Coursess = () => {
  let {
    courseBuyerCart,
    setCourseBuyerCart,
    courseBuyerWish,
    setCourseBuyerWish,
  } = useContext(CourseBuyerContext);
  const [courses, setCourses] = useState(courseBuyerCart);
  const { push } = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const deleteCourse = (courseId) => {
    const updatedCourses = courses.filter((course) => course.id !== courseId);
    setCourses(updatedCourses);
    setCourseBuyerCart(updatedCourses);
    localStorage.setItem("courseBuyerCart", JSON.stringify(updatedCourses));
  };
  useEffect(() => {
    const savedCart = localStorage.getItem("courseBuyerCart");
    if (savedCart) {
      setCourseBuyerCart(JSON.parse(savedCart));
      setCourses(JSON.parse(savedCart));
    }
  }, []);

  if (!courseBuyerCart || courseBuyerCart.length === 0) {
    return (
      <div className="max-h-full">
        <h2>No courses added to your cart</h2>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-center text-color justify-between pl-5 pt-7 mb-5">
        <h2 className="text-5xl">All Cart courses</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="search about courses..."
            className="border border-gray-300 rounded-lg pl-10 dark:text-black pr-4 py-2 w-72 mr-5"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-1/3 transform-translate-y-1/2 text-gray-500" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {courses?.map((course) => console.log(course))}
        {filteredCourses?.map((course, i) => (
          <div key={i} className="mx-3 text-color  my-5">
            <div className="card-body  p-0 h-full flex flex-col justify-between">
              <div className="max-w-sm p-6  cardesbackgroundcourse border  rounded-lg shadow   flex flex-col h-full">
                <div className="flex  justify-between items-center cardesbackgroundcourse mb-4">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {course.title}
                  </h5>
                </div>
                <div className="image-container w-full h-48 mb-4 ">
                  <Image
                    className="object-cover w-full h-full"
                    src={course.image}
                    alt={course.title}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex-grow">
                  <p className="card-title text-base text-color mb-2">{`by : ${course.instructor
                    .split(" ")
                    .slice(0, 3)
                    .join(" ")}`}</p>
                  <p className="text-3xl text-color mb-4">{`Price: ${course.price}`}</p>
                </div>
                <div className="mt-7 flex flex-row items-center gap-2">
                  <button className="flex rounded-md h-12 w-45 items-center justify-center bg-violet-900 text-white duration-100 hover:bg-blue-800 p-2">
                    <HiOutlineShoppingCart className="text-3xl mr-2" />
                    Buy Course
                  </button>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="flex rounded-md h-12 w-45 items-center justify-center bg-amber-400 duration-100 hover:bg-yellow-300 p-2"
                  >
                    <MdDeleteSweep className="text-3xl mr-2 " />
                    Delete Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Coursess;
