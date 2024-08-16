'use client';
import Image from 'next/image';
import Link from 'next/link';
import HTML from './assets/Images/html-logo.svg';
import CSS from './assets/Images/css-logo.svg';
import JS from './assets/Images/javascript-logo.svg';
import Bootstrap from './assets/Images/bootstrap-logo.svg';
import Tailwind from './assets/Images/tailwind-logo.svg';
import SASS from './assets/Images/sass-logo.svg';
import TS from './assets/Images/typescript-logo.svg';
import ReactLogo from './assets/Images/react-logo.svg';
import Dart from './assets/Images/dart-logo.svg';
import Flutter from './assets/Images/flutter-logo.svg';
import SearchBar from './Components/BuyerNavbar/SearchBar';
import { useState } from 'react';
import StarRating from './Components/StarRating/StarRating';
import BuyerNavbar from './Components/BuyerNavbar/BuyerNavbar';
import BuyerNavbar2 from './Components/BuyerNavbar2/BuyerNavbar2';

export const courses = [
  { name: 'HTML', image: HTML, link: '/htmldetails' },
  { name: 'CSS', image: CSS, link: '/cssdetails' },
  { name: 'JavaScript', image: JS, link: '/javascriptdetails' },
  { name: 'Bootstrap', image: Bootstrap, link: '/bootstrapdetails' },
  { name: 'Tailwind', image: Tailwind, link: '/tailwinddetails' },
  { name: 'SASS', image: SASS, link: '/sassdetails' },
  { name: 'TypeScript', image: TS, link: '/typescriptdetails' },
  { name: 'React', image: ReactLogo, link: '/reactdetails' },
  { name: 'Dart', image: Dart, link: '/dartdetails' },
  { name: 'Flutter', image: Flutter, link: '/flutterdetails' },
];

const CourseCard = ({ name, image, link }) => (
  <Link href={link}>
    <div className="card card-compact bg-base-100 w-60 hover:shadow-xl hover:scale-105 transition-all duration-700 border rounded-lg">
      <figure>
        <Image
          className="w-48 h-48 m-auto"
          width={100}
          height={100}
          src={image}
          alt={name}
        />
      </figure>
      <div className="card-body px-4">
        <h2 className="card-title font-bold text-xl">{name}</h2>
        <p>Instructor Name</p>
        <div className="flex items-center mb-3">
          <span className="mr-1">4.5</span>
          <StarRating />
        </div>
      </div>
    </div>
  </Link>
);

// export default function Home() {
//   return (
//     <div className="px-20 py-12 flex justify-between gap-y-9 flex-wrap">
//       {courses.map((course, index) => (
//         <CourseCard key={index} {...course} />
//       ))}
//     </div>
//   );
// }

export default function Home() {
  const [filteredCourses, setFilteredCourses] = useState(courses);

  const handleSearch = (searchTerm) => {
    const filtered = courses.filter((course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  return (
    <div>
      <BuyerNavbar onSearch={handleSearch}></BuyerNavbar>
      <BuyerNavbar2></BuyerNavbar2>
      {/* <SearchBar test={test} onSearch={handleSearch} /> */}
      <div className="px-20 py-12 flex justify-between gap-y-9 flex-wrap">
        {filteredCourses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
}
