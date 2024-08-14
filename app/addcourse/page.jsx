"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { v4 } from "uuid";
import Image from "next/image";
import Variants from "../Spinner";

const Page = () => {
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  const [success, setSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/courses");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setCourses(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCourseDetails = async (id) => {
    push(`/addcourse/${id}`);
  };
  const [cTitle, setCTitle] = useState("");
  const [cPrice, setCPrice] = useState(0);
  const [cImage, setCImage] = useState("");
  const [cDetails, setCDetails] = useState("");
  const [cInstructor, setCInstructor] = useState("");
  const [image, setImage] = useState();
  const handleCreate = async (event) => {
    event.preventDefault();
    console.log(cTitle,cDetails,image?.name,cInstructor);
    let imgPath = v4();
    const response = await fetch("/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: cTitle,
        price: cPrice,
        details: cDetails,
        instructor: cInstructor,
        imgPath: image?.name !=null? image.name + imgPath:null,
      }),
    });

    const refresh = await fetch("/api/courses");


    const result = await refresh.json();

    if (image) {
      const imageRef = ref(storage, "images/courses/" + image.name + imgPath);
      uploadBytes(imageRef, image).then(() => {});
    }

    setCourses(result);
    setCTitle("");
    setCPrice(0);
    setCImage("");
    setCDetails("");
    setCInstructor("");
    setSuccess(true);
    setImage(null);
  };

  const handleDelete = async (id) => {
    let conf = confirm("are you sure you want to delete this course");
    if (conf) {
      const response = await fetch(`/api/courses/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ collectionName: "courses", documentId: id }),
      });
      const refresh = await fetch("/api/courses");

      const result = await refresh.json();
      setCourses(result);
    }
  };
  const filteredCourses = courses?.filter((course) =>
    course.data?.title?.toLowerCase().includes(searchTerm?.toLowerCase())
  );
  if (!courses)
    return (
      <div className="max-h-full">
        <Variants></Variants>
      </div>
    );
  return (
    <div>
      <h2 className="text-5xl mb-5 p-5"> Add new course</h2>
      <div className="mt-11">
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
              className="block mb-2 text-sm font-medium text-gray-900  "
            >
              course Price
            </label>
            <input
              type="number"
              id="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              className="block mb-2 text-sm font-medium text-gray-900  "
            >
              instructor name
            </label>
            <input
              type="text"
              id="instructor"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400   dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              className="block mb-2 text-sm font-medium text-gray-900 text-gray-950"
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
          <div>
            <input
              type="file"
              name="Image"
              id=""
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={(e) => handleCreate(e)}
            >
              Create
            </button>
          </div>
        </form>
      </div>
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

                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="default-modal"
                    onClick={(e) => {
                      handleDelete(course.id);
                    }}
                  >
                    <big>
                      <b>X</b>
                    </big>
                  </button>
                </div>
                <div className="image-container w-full h-48 mb-4 ">
                  <Image
                    className="object-cover w-full h-full"
                    src={course.image}
                    alt={course.data.title}
                    width={100}
                    height={100}
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
                      handleCourseDetails(course.id);
                    }}
                  >
                    Update course
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
