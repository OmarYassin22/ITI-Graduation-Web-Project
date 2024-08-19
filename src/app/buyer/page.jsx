"use client";
import Image from "next/image";
import Link from "next/link";
import HTML from "./assets/Images/html-logo.svg";
import CSS from "./assets/Images/css-logo.svg";
import JS from "./assets/Images/javascript-logo.svg";
import Bootstrap from "./assets/Images/bootstrap-logo.svg";
import Tailwind from "./assets/Images/tailwind-logo.svg";
import SASS from "./assets/Images/sass-logo.svg";
import TS from "./assets/Images/typescript-logo.svg";
import ReactLogo from "./assets/Images/react-logo.svg";
import Dart from "./assets/Images/dart-logo.svg";
import Flutter from "./assets/Images/flutter-logo.svg";
import SearchBar from "./Components/BuyerNavbar/SearchBar";
import { useState } from "react";
import StarRating from "./Components/StarRating/StarRating";
import BuyerNavbar from "./Components/BuyerNavbar/BuyerNavbar";
import BuyerNavbar2 from "./Components/BuyerNavbar2/BuyerNavbar2";
import CourseCardes from "./Components/CourseCardes/CourseCardes";

export const courses = [
  { name: "HTML", image: HTML, link: "/htmldetails" },
  { name: "CSS", image: CSS, link: "/cssdetails" },
  { name: "JavaScript", image: JS, link: "/javascriptdetails" },
  { name: "Bootstrap", image: Bootstrap, link: "/bootstrapdetails" },
  { name: "Tailwind", image: Tailwind, link: "/tailwinddetails" },
  { name: "SASS", image: SASS, link: "/sassdetails" },
  { name: "TypeScript", image: TS, link: "/typescriptdetails" },
  { name: "React", image: ReactLogo, link: "/reactdetails" },
  { name: "Dart", image: Dart, link: "/dartdetails" },
  { name: "Flutter", image: Flutter, link: "/flutterdetails" },
];

const CourseCard = ({ corsedata }) => (
  <div className="card card-compact bg-base-100  transition-transform duration-300 hover:scale-110 border rounded-lg">
    <figure>
      <Image
        className="w-48 h-48 m-auto"
        width={100}
        height={100}
        src={corsedata.image}
        alt={corsedata.name}
      />
    </figure>
    <div className="card-body px-4">
      <h2 className="card-title font-bold text-xl">{corsedata.name}</h2>
      <p>Instructor Name</p>
      <div className="flex items-center mb-3">
        <span className="mr-1">4.5</span>
        <StarRating />
      </div>
    </div>
  </div>
);

export default function Home() {
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [categoryCourses, setCategoryCourses] = useState(courses);

  const handleSearch = (searchTerm) => {
    const filtered = courses.filter((course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  };
  const handleCategory = (xCategory) => {
    setCategoryCourses(xCategory);
  };
  console.log(categoryCourses);

  return (
    <div>
      <BuyerNavbar onSearch={handleSearch} handleCategory={handleCategory} />
      <BuyerNavbar2 />

      <div className="px-20 py-12 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categoryCourses && categoryCourses.length > 0
          ? categoryCourses.map((course, index) => (
              <CourseCardes key={index} data={course} />
            ))
          : filteredCourses.map((course, index) => (
              <CourseCard key={index} corsedata={course} />
            ))}
      </div>
    </div>
  );
}
