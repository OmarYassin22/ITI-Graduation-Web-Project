"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
///
import { FiSearch } from "react-icons/fi";
///
const Page = () => {
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/courses");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setCourses(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const openCourseDetails = async (id) => {
    push(`/allcouses/${id}`);
  };
  const filteredCourses = courses?.filter((course) =>
    course.data.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <div className="flex items-center justify-between pl-5 pt-7 mb-5">
        <h2 className="text-5xl">All courses</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="search about courses..."
            className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-72 mr-5"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-1/3 transform-translate-y-1/2 text-gray-500" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {filteredCourses?.map((course, i) => (
          <div key={i} className="mx-3 my-5">
            <div className="card-body p-0 h-full flex flex-col justify-between">
              <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col h-full">
                <div className="flex justify-between items-center mb-4">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {course.data.title}
                  </h5>
                </div>
                <div className="image-container w-full h-48 mb-4 ">
                  <img
                    className="object-cover w-full h-full"
                    src={course.data.image}
                    alt={course.data.title}
                  />
                </div>
                <div className="flex-grow">
                  <p className="card-title text-base mb-2">{`by : ${course.data.instructor
                    .split(" ")
                    .slice(0, 3)
                    .join(" ")}`}</p>
                  <p className="text-3xl text-gray-600 mb-4">{`Price: ${course.data.price}`}</p>
                </div>
                <div className="flex justify-center mt-auto">
                  <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => {
                      openCourseDetails(course.id);
                    }}
                  >
                    Open course
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Page;
