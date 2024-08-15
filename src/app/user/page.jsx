"use client";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import axios from "axios";
import Variants from "../Spinner";
import { useRouter } from "next/navigation";

function UserPage() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("api/courses").then((response) => setCourses(response.data));
  }, []);

  useEffect(() => {
    if (courses.length > 0) {
      setCourses((prevCourses) =>
        prevCourses.sort((a, b) =>
          (a.data.students?.length || 0) > (b.data.students?.length || 0)
            ? -1
            : (a.data.students?.length || 0) < (b.data.students?.length || 0)
            ? 1
            : 0
        )
      );
    }
  }, [courses]);
  
  console.log(courses);
  if (!courses)
    return (
      <div className="max-h-full">
        <Variants />
      </div>
    );
  
  return (
    <div className="container mx-auto px-4">
      {/* Introduction Section */}
      <div className="my-14">
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2 m-auto">
          <div className="text w-full md:w-auto mt-10 ml-auto">
            <h2 className="text-xl">
              Grow Your Skills In{" "}
              <span className="text-blue-700 font-bold">Few Minutes</span>
            </h2>
            <p className="max-w-96">
              We are accredited with the Most Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Illum
            </p>
          </div>
          <div className="w-full md:w-auto mr-auto">
            <Image
              src="/images/13.jpg"
              className="border rounded-xl"
              alt="User"
              width={350}
              height={300}
            />
          </div>
        </div>
      </div>

      {/* Background Image Section */}
      <div
        className="relative h-72 bg-cover bg-center bg-no-repeat my-20 bg-fixed"
        style={{ backgroundImage: "url(/images/bg-img.jpg)" }}
      >
        <div className="absolute top-0 left-0 opacity-60 h-full w-full bg-blue-900 rounded-xl"></div>
        <div className="text-white absolute inset-0 flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl font-bold">Your Text Here</h2>
          <p className="text-lg">Additional text or description can go here.</p>
        </div>
      </div>

      {/* Popular Courses Section */}
      <div className="my-20">
        <h2 className="font-bold text-4xl mb-5">Most Popular Courses</h2>
        <div className="cards-course text-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {courses?.map((course, id) => {
            if (id < 6)
              return (
                <div
                  key={course.id}
                  onClick={() => {
                    router.push(`/Courses/${course.id}`);
                  }}
                  className="relative w-full h-80 flex items-end p-5 bg-cover bg-center bg-no-repeat rounded-xl hover:scale-105 duration-500"
                  style={{ backgroundImage: `url(${course.image})` }}
                >
                  <div className=" overlay rounded-xl absolute top-0 left-0 opacity-50 h-full w-full bg-slate-900"></div>
                  <div className="relative z-10 text-white">
                    <div className="card-content">
                      <h3 className="font-bold mb-2">{course.data.title}</h3>
                      <span className=" flex">
                        <FaStar className="text-yellow-400" /> <span>4.7</span>
                      </span>{" "}
                    </div>
                  </div>
                </div>
              );
          })}
        </div>
      </div>

      {/* Card Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="cards w-full">
            <Image
              src={`/images/card-${index + 1}.jpg`}
              className="border rounded-xl w-full"
              alt="Card"
              width={300}
              height={300}
            />
            <h2 className="font-bold mt-2">Static Word</h2>
            <p className="max-w-80">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque quo
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPage;
