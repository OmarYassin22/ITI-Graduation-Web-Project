"use client";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import axios from "axios";
import Variants from "../Spinner";
import { useRouter } from "next/navigation";
import { BackgroundSection, CardGridSection } from "./StaticSections";

function UserPage() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("/api/courses") 
      .then((response) => {
        if (response.data) {
          setCourses(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
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

  if (!courses.length) {
    return (
      <div className="max-h-full">
        <Variants />
      </div>
    );
  }

  return (
    <div className="container text-color mx-auto px-4">
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
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <BackgroundSection/>

      {/* Popular Courses Section */}
      <div className="my-20">
        <h2 className="font-bold text-4xl mb-5">Most Popular Courses</h2>
        <div className="cards-course text-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => {
                router.push(`/Courses/${course.id}`);
              }}
              className="relative w-full h-80 flex items-end p-5 bg-cover bg-center bg-no-repeat rounded-xl hover:scale-105 duration-500"
              style={{ backgroundImage: `url(${course.image})` }}
            >
              <div className="overlay rounded-xl absolute top-0 left-0 opacity-50 h-full w-full bg-slate-900"></div>
              <div className="relative z-10 text-white">
                <div className="card-content">
                  <h3 className="font-bold mb-2">{course.data.title}</h3>
                  <span className="flex">
                    <FaStar className="text-yellow-400" /> <span>4.7</span>
                  </span>{" "}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CardGridSection />
    </div>
  );
}

export default UserPage;
