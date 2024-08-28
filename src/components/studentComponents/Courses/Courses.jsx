'use client';
import React from 'react'
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
import { useState } from 'react';


export const courses = [
    { name: 'HTML', image: HTML},
    { name: 'CSS', image: CSS},
    { name: 'JavaScript', image: JS},
    { name: 'Bootstrap', image: Bootstrap},
    { name: 'Tailwind', image: Tailwind},
    { name: 'SASS', image: SASS},
    { name: 'TypeScript', image: TS},
    { name: 'React', image: ReactLogo},
    { name: 'Dart', image: Dart},
    { name: 'Flutter', image: Flutter},
];

const CourseCard = ({ name, image, link }) => (
    <Link href={`/student/courses/${name.toLowerCase()}`}>
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
            </div>
        </div>
    </Link>
);


function Courses() {
    const [filteredCourses, setFilteredCourses] = useState(courses);
    return (
        <>
            <div className="px-10 py-5 flex gap-y-4 justify-evenly flex-wrap">
                {filteredCourses.map((course, index) => (
                    <CourseCard key={index} {...course} />
                ))}
            </div>
        </>
    )
}

export default Courses;
