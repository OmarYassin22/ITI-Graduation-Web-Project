"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./CoursePage.css";
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ReactImageGallery from "react-image-gallery";
import Rater from "react-rater";
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
        setCInstructor(result.instructor);
        setCourses(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  ///////////////////////////////////////////
  const productDetailItem = {
    images: [
      {
        original: `${cImage}`,
      },
      // {
      //   original:
      //     "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=600",
      //   thumbnail:
      //     "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=600",
      // },
      // {
      //   original:
      //     "https://images.pexels.com/photos/2697787/pexels-photo-2697787.jpeg?auto=compress&cs=tinysrgb&w=600",
      //   thumbnail:
      //     "https://images.pexels.com/photos/2697787/pexels-photo-2697787.jpeg?auto=compress&cs=tinysrgb&w=600",
      // },
      // {
      //   original:
      //     "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      //   thumbnail:
      //     "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      // },
      // {
      //   original:
      //     "https://images.pexels.com/photos/3910071/pexels-photo-3910071.jpeg?auto=compress&cs=tinysrgb&w=600",
      //   thumbnail:
      //     "https://images.pexels.com/photos/3910071/pexels-photo-3910071.jpeg?auto=compress&cs=tinysrgb&w=600",
      // },
    ],
    title: `${cTitle}`,
    reviews: "150",
    // availability: true,
    instructor: `${cInstructor}`,
    duration: "22 hours",
    // sku: "BE45VGTRK",
    price: `${cPrice}`,
    previousPrice: `${parseInt(cPrice) + 500}`,
    description: `${cDetails}`,
    language: ["Ar", "En"],
    // color: ["gray", "violet", "red"],
  };
  const plusMinuceButton =
    "flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";
  ///////////////////////////////////////////
  return (
    <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
      {/* image gallery */}
      <div className="container mx-auto px-4">
        <ReactImageGallery
          showBullets={false}
          showFullscreenButton={false}
          showPlayButton={false}
          items={productDetailItem.images}
          additionalClass="custom-image-gallery"
        />
        {/* /image gallery  */}
      </div>
      {/* description  */}
      <div className="mx-auto text-color px-5 lg:px-5">
        <h2 className="pt-3 text-3xl font-bold lg:pt-0">
          {productDetailItem.title}
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
              ({productDetailItem.reviews})
            </p>
          </div>
        </div>
        {/* <p className="mt-5 font-bold">
          Availability:{" "}
          {productDetailItem.availability ? (
            <span className="text-green-600">In Stock </span>
          ) : (
            <span className="text-red-600">Expired</span>
          )}
        </p> */}
        <p className="font-bold">
          Instructor:{" "}
          <span className="font-normal">{productDetailItem.instructor}</span>
        </p>
        <p className="font-bold">
          Duration:{" "}
          <span className="font-normal">{productDetailItem.duration}</span>
        </p>

        {/* <p className="font-bold">
          SKU: <span className="font-normal">{productDetailItem.sku}</span>
        </p> */}
        <p className="mt-4 text-4xl font-bold text-violet-900">
          ${productDetailItem.price}{" "}
          <span className="text-xs text-gray-400 line-through">
            ${productDetailItem.previousPrice}
          </span>
        </p>
        <p className="pt-5 text-sm leading-5 text-gray-500">
          {productDetailItem.description}
        </p>
        <div className="mt-6">
          <p className="pb-2 text-xs text-gray-500">Language</p>
          <div className="flex gap-1">
            {productDetailItem.language.map((x, index) => (
              <div
                key={index}
                className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
              >
                {x}
              </div>
            ))}
          </div>
        </div>

        {/* <div className="mt-6">
          <p className="pb-2 text-xs text-gray-500">Color</p>
          <div className="flex gap-1">
            {productDetailItem.color.map((x, index) => {
              return (
                <div
                  key={index}
                  className={`h-8 w-8 cursor-pointer border border-white bg-${x}-600 focus:ring-2 focus:ring-${x}-500 active:ring-2 active:ring-${x}-500`}
                />
              );
            })}
          </div>
        </div> */}
        {/* <div className="mt-6">
          <p className="pb-2 text-xs text-gray-500">Quantity</p>
          <div className="flex">
            <button className={`${plusMinuceButton}`}>-</button>
            <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
              1
            </div>
            <button className={`${plusMinuceButton}`}> +</button>
          </div>
        </div> */}
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
{
  /* <div className="w-full p-5 grid grid-cols-2 gap-8">
      <div>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {cTitle}
          </h1>
          <p className="text-xl text-gray-700">Instructor: {cInstructor}</p>
        </div>
          <div className="image-container w-full h-48 mb-4 ">
                <img className="object-cover w-full h-full" src={cImage} alt={cTitle} />
            </div>
          <div className="text-2xl font-semibold text-gray-900 mb-4">
            {`${cPrice} $`}
          </div>
          <button className="w-full bg-green-600 text-white text-xl font-semibold py-3 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300">
            Buy This Course
          </button>
      </div>
      <div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Introduction :
          </h2>
          <p className="text-lg text-gray-600">{cDetails}</p>
        </div>
      </div>
    </div> */
}
//     <div className="w-full p-5 grid grid-cols-2 gap-8">
//   <div>
//     <div className="mb-8">
//       <h1 className="text-4xl font-bold text-gray-900 mb-2">
//         {cTitle}
//       </h1>
//       <p className="text-xl text-gray-700">Instructor: {cInstructor}</p>
//     </div>

//     <div className="flex items-center mb-4">
//       <div className="flex items-center mr-4">
//         {[...Array(5)].map((_, index) => (
//           <svg
//             key={index}
//             className="w-5 h-5 text-yellow-400"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="currentColor"
//             viewBox="0 0 22 20"
//           >
//             <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//           </svg>
//         ))}
//       </div>
//       <span className="text-lg text-gray-700">
//         Duration: 22 hours
//       </span>
//     </div>

//     <div className="image-container w-full h-64 mb-4">
//       <img className="object-cover w-full h-full rounded-lg" src={cImage} alt={cTitle} />
//     </div>

//     <div className="text-3xl font-semibold text-gray-900 mb-4" style={{ color: "green" }}>
//       {`${cPrice} $`}
//     </div>
//     <div className="text-2xl font-semibold text-gray-500 mb-4" style={{ textDecoration: "line-through" }}>
//       {`${parseInt(cPrice) + 200} $`}
//     </div>

//     <button className="w-full bg-green-600 text-white text-xl font-semibold py-3 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 mb-4">
//       Buy This Course
//     </button>

//     <button className="w-full bg-gray-200 text-gray-700 text-xl font-semibold py-3 rounded-lg shadow-lg hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 flex justify-center items-center">
//       <svg className="w-6 h-6 mr-2 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
//         <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
//       </svg>
//       Add to Wishlist
//     </button>
//   </div>

//   <div>
//     <div className="mb-8">
//       <h2 className="text-3xl font-bold text-gray-900 mb-4">
//         Introduction:
//       </h2>
//       <p className="text-lg text-gray-600">{cDetails}</p>
//     </div>
//   </div>
// </div>
