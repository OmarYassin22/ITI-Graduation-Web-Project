"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import "./CoursePage.css";
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ReactImageGallery from "react-image-gallery";
import Rater from "react-rater";
import { courseContext } from "../../../Contexts/Courses/CourseContextProvider";
import Variants from "../../../Spinner";
import Image from "next/image";
const Page = ({ params }) => {
  const [course, setCourse] = useState();
  // const { push } = useRouter();
  // const [cTitle, setCTitle] = useState("");
  // const [cPrice, setCPrice] = useState(0);
  // const [cImage, setCImage] = useState("");
  // const [cDetails, setCDetails] = useState("");
  // const [cInstructor, setCInstructor] = useState("");
  const { localCourse, setLocalCourse } = useContext(courseContext);
  useEffect(() => {
    setCourse(localCourse?.find((c) => c.id == params.id));
  }, [localCourse, params.id]);
  // const productDetailItem = {
  //   images: [
  //     {
  //       original: `${cImage}`,
  //     },
  //   ],
  //   title: `${cTitle}`,
  //   reviews: "150",
  //   // availability: true,
  //   instructor: `${cInstructor}`,
  //   duration: "22 hours",
  //   // sku: "BE45VGTRK",
  //   price: `${cPrice}`,
  //   previousPrice: `${parseInt(cPrice) + 500}`,
  //   description: `${cDetails}`,
  //   language: ["Ar", "En"],
  //   // color: ["gray", "violet", "red"],
  // };
  // const plusMinuceButton =
  //   "flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";
  if (!course)
    return (
      <>
        <Variants></Variants>
      </>
    );
  return (
    <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
      <div className="container mx-auto px-4">
        {/* <ReactImageGallery
          showBullets={false}
          showFullscreenButton={false}
          showPlayButton={false}
          items={course.image}
          additionalClass="custom-image-gallery"
        /> */}
        {console.log(course.image)}
        <Image
          src={
            course?.image.length > 0 ? course.image[0] : "/defaultCourse.jpeg"
          }
          width={800}
          height={500}
          alt={course.data.title}
        ></Image>
      </div>

      <div className="mx-auto text-color px-5 lg:px-5">
        <h2 className="pt-3 text-3xl font-bold lg:pt-0">
          {course?.data.title}
        </h2>
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
              ({course?.data.reviews})
            </p>
          </div>
        </div>

        <p className="font-bold">
          Instructor:{" "}
          <span className="font-normal">{course?.data.instructor}</span>
        </p>
        <p className="font-bold">
          Duration: <span className="font-normal">{course?.data.duration}</span>
        </p>

        <p className="mt-4 text-4xl font-bold text-violet-900">
          ${course?.data.price}{" "}
          <span className="text-xs text-gray-400 line-through">
            ${+course?.data.price+500}
          </span>
        </p>
        <p className="pt-5 text-sm leading-5 text-gray-500">
          {course?.data.description}
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
  );
};

export default Page;
