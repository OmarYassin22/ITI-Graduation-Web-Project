"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = ({ params }) => {
  const [courses, setCourses] = useState();
  const { push } = useRouter();
  const [cTitle, setCTitle] = useState("");
  const [cPrice, setCPrice] = useState(0);
  const [cImage, setCImage] = useState("");
  const [cDetails, setCDetails] = useState("");
  const [cInstructor, setCInstructor] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/courses/${params.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setCTitle(result.title);
        setCPrice(result.price);
        setCDetails(result.details);
        setCImage(result.image);
        setCInstructor(result.instructor)

        setCourses(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const handlePUT = async (event) => {
    event.preventDefault();
    console.log(`/api/courses/${params.id}`);
    console.log(JSON.stringify({ title: cTitle, price: cPrice, image: cImage, details: cDetails, instructor:cInstructor }));
    const response = await fetch(`/api/courses/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: cTitle, 
        price: cPrice, 
        image: cImage, 
        details: cDetails, 
        instructor:cInstructor
      }),
    });
    const data = await response.json();
    if (data.message !== null) push("/addcourse");
  };
  return (
    <div>
      <div
        href="#"
        className="block max-w-screen-md align-middle p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 "
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <form className="max-w-sm mx-auto">
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                course Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="product name"
                required
                value={cTitle}
                onChange={(e) => {
                  setCTitle(e.target.value);
                }}
              />
            </div>

            <div className="mb-5">
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              course Price
            </label>
            <input
              type="number"
              id="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={cPrice}
              onChange={(e) => {
                setCPrice(e.target.value);
              }}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="instructor"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              instructor name
            </label>
            <input
              type="text"
              id="instructor"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={cInstructor}
              onChange={(e) => {
                setCInstructor(e.target.value);
              }}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="details"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              course details
            </label>
            <input
              type="text"
              id="details"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={cDetails}
              onChange={(e) => {
                setCDetails(e.target.value);
              }}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              course image link
            </label>
            <input
              type="text"
              id="image"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={cImage}
              onChange={(e) => {
                setCImage(e.target.value);
              }}
            />
          </div>

            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={(e) => handlePUT(e)}
            >
              Update
            </button>
          </form>
        </h5>
      </div>
    </div>
  );
};

export default Page;
