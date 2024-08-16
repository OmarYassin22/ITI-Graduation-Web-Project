"use client";
import React, { useState } from "react";
const TableOne = () => {
    const dataInstructors = [
        {
            courseStudent: "Emad Elshplangy",
            courseName: "C++",
        },
        {
            courseStudent: "Omar Sleem",
            courseName: "JavaScript",
        },

        {
            courseStudent: "Amr Gado",
            courseName: "Flutter",
        },
        {
            courseStudent: "Mohamed Elsisi",
            courseName: "Python",
        },
        {
            courseStudent: "Mostafa Ahmed",
            courseName: "UI/UX",
        },
        {
            courseStudent: "Mahmoud Tamer",
            courseName: "React",
        },
        {
            courseStudent: "Osama Sayed",
            courseName: "Business",
        },

        {
            courseStudent: "Samir William",
            courseName: "Next",
        },
        {
            courseStudent: "Mohsen Salim",
            courseName: "Data Science",
        },
        {
            courseStudent: "Mostafa Ali",
            courseName: "Kotlin",
        },
    ];

    const [courseData, setCourseData] = useState(dataInstructors);

    return (
        <div className="rounded-sm w-2/3 mx-auto border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex flex-col">
                <div className="grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-white-4 sm:grid-cols-2">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Name
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Course
                        </h5>
                    </div>
                </div>
                {courseData.map((course, key) => (
                    <div
                        className={`grid grid-cols-2 sm:grid-cols-2 ${key === courseData.length - 1
                            ? ""
                            : "border-b border-stroke dark:border-strokedark"
                            }`}
                        key={key}
                    >
                        <div className="flex items-center gap-3 p-2.5 xl:p-5">  
                            <p className="text-black dark:text-white sm:block">
                                {course.courseStudent}
                            </p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">{course.courseName}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableOne;
