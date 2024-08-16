// import { BRAND } from "@/types/brand";
"use client";
import Image from "next/image";
import React, { useState } from "react";
const TableOne = () => {
    const dataInstructors = [
        {
            name: "C++",
            grade: "120 / 200",
            percentage: (120 / 200) * 100,
            status: "Pass",
        },
        {
            name: "Java Script",
            grade: "70 / 200",
            percentage: (70 / 200) * 100,
            status: "Fail",
        },

        {
            name: "Flutter",
            grade: "150 / 200",
            percentage: (150 / 200) * 100,
            status: "Pass",
        },
        {
            name: "Python",
            grade: "135 / 200",
            percentage: (135 / 200) * 100,
            status: "Pass",
        },
        {
            name: "UI/UX",
            grade: "175 / 200",
            percentage: (175 / 200) * 100,
            status: "Pass",
        },
        {
            name: "React",
            grade: "190 / 200",
            percentage: (190 / 200) * 100,
            status: "Pass",
        },
        {
            name: "Business",
            grade: "95 / 100",
            percentage: (95 / 100) * 100,
            status: "Pass",
        },

        {
            name: "Cyper Security",
            grade: "160 / 200",
            percentage: (160 / 200) * 100,
            status: "Pass",
        },
        {
            name: "Data Science",
            grade: "80 / 200",
            percentage: (80 / 200) * 100,
            status: "Fail",
        },
        {
            name: "Kotlin",
            grade: "90 / 200",
            percentage: (90 / 200) * 100,
            status: "Fail",
        },
    ];


    const [courseData, setCourseData] = useState(dataInstructors);

    const handleRadioChange = (event) => {
        const value = event.target.value;
        if (value === "instructors") {
            setBrandData(dataInstructors);
        } else if (value === "students") {
            setBrandData(dataStudents);
        } else if (value === "courses") {
            setBrandData(dataCourses);
        }
    };


    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                Courses You Take
            </h4>
            <br></br>
            <div className="flex flex-col">
                <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Name
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Grade
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Percentage
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Status
                        </h5>
                    </div>
                </div>
                {courseData.map((course, key) => (
                    <div
                        className={`grid grid-cols-3 sm:grid-cols-5 ${key === courseData.length - 1
                            ? ""
                            : "border-b border-stroke dark:border-strokedark"
                            }`}
                        key={key}
                    >
                        <div className="flex items-center gap-3 p-2.5 xl:p-5">
                            {/* <div className="flex-shrink-0">
                <Image src={brand.logo} alt="Brand" width={48} height={48} />
              </div> */}
                            <p className="hidden text-black dark:text-white sm:block">
                                {course.name}
                            </p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">{course.grade}</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className={`text-meta-3 ${course.percentage >= 50 ? `text-success` : `text-red`}`}>{course.percentage}%</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className={`text-meta-3 ${course.status == "Pass" ? `text-success` : `text-red`}`}>{course.status}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableOne;
