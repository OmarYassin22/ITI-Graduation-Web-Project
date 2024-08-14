"use client";
import Variants from "../../Spinner";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebaseConfig";

const Page = ({ params }) => {
  const [courses, setCourses] = useState();
  const { push } = useRouter();
  const [cTitle, setCTitle] = useState("");
  const [cPrice, setCPrice] = useState(0);
  const [cDetails, setCDetails] = useState("");
  const [cInstructor, setCInstructor] = useState("");
  const [cImage, setCImage] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/courses/${params.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setCTitle(result.title);
        setCPrice(result.price);
        setCDetails(result.details);
        setCImage(result.image);
        setCInstructor(result.instructor);

        setCourses(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const handlePUT = async (event) => {
    event.preventDefault();
    let imgPath = v4();
    console.log(cImage.name + imgPath);

    if (cImage) {
      const imageRef = ref(storage, "images/courses/" + cImage.name + imgPath);
      uploadBytes(imageRef, cImage).then(() => {});
    }
    const response = await fetch(`/api/courses/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: cTitle,
        price: cPrice,
        imgPath: cImage.name + imgPath,
        details: cDetails,
        instructor: cInstructor,
      }),
    });
    const data = await response.json();
    if (data.message !== null) push("/addcourse");
  };

  if (loading)
    return (
      <div className="max-h-full">
        <Variants></Variants>;
      </div>
    );

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
                type="file"
                id="image"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={(e) => {
                  setCImage(e.target.files[0]);
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
