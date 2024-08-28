// import { BRAND } from "@/types/brand";
"use client";
import Image from "next/image";
import React, { useState } from "react";
const TableOne = () => {
  const dataInstructors = [
    {
      name: "Ali Mohammed",
      visitors: 120,
      revenues: 2500,
      sales: 320,
      conversion: 80,
    },
    {
      name: "Omar Kamel",
      visitors: 115,
      revenues: 2200,
      sales: 250,
      conversion: 75,
    },

    {
      name: "Mahmoud Badr",
      visitors: 100,
      revenues: 2000,
      sales: 200,
      conversion: 75,
    },
    {
      name: "Yousef EL-Said",
      visitors: 89,
      revenues: 1850,
      sales: 150,
      conversion: 70,
    },
    {
      name: "Mona fareed",
      visitors: 88,
      revenues: 1830,
      sales: 160,
      conversion: 73,
    },
    {
      name: "Amr Yasser",
      visitors: 80,
      revenues: 1700,
      sales: 140,
      conversion: 70,
    },
    {
      name: "Hoda Ahmed",
      visitors: 70,
      revenues: 1200,
      sales: 120,
      conversion: 65,
    },

    {
      name: "Abdul-Rahman Sameer",
      visitors: 62,
      revenues: 1000,
      sales: 100,
      conversion: 65,
    },
    {
      name: "Ebrahim El-Ghobashy",
      visitors: 50,
      revenues: 840,
      sales: 77,
      conversion: 55,
    },
    {
      name: "Hesham Salem",
      visitors: 43,
      revenues: 650,
      sales: 50,
      conversion: 52,
    },
    {
      name: "Nader Sobhy",
      visitors: 30,
      revenues: 514,
      sales: 25,
      conversion: 50,
    },
  ];

  const dataStudents = [
    {
      // logo: "/images/brand/brand-03.svg",
      name: "Ahmed Helmy",
      visitors: 40,
      revenues: 1500,
      sales: 300,
      conversion: 70,
    },
    {
      name: "Mohammed Henedy",
      visitors: 35,
      revenues: 1400,
      sales: 280,
      conversion: 65,
    },
    {
      name: "Mohammed Saad",
      visitors: 30,
      revenues: 1300,
      sales: 270,
      conversion: 60,
    },
    {
      name: "Menna Shalaby",
      visitors: 25,
      revenues: 1300,
      sales: 170,
      conversion: 60,
    },
    {
      name: "Asmaa Galal",
      visitors: 20,
      revenues: 1200,
      sales: 260,
      conversion: 55,
    },
    {
      name: "Tamer Hosney",
      visitors: 15,
      revenues: 1100,
      sales: 250,
      conversion: 60,
    },
    {
      name: "Hend Sabry",
      visitors: 13,
      revenues: 1000,
      sales: 240,
      conversion: 55,
    },
    {
      name: "Ramez Galal",
      visitors: 11,
      revenues: 900,
      sales: 230,
      conversion: 50,
    },
    {
      name: "Amr Diab",
      visitors: 6,
      revenues: 800,
      sales: 220,
      conversion: 40,
    },
    {
      name: "Hoda EL-Mofty",
      visitors: 3,
      revenues: 700,
      sales: 210,
      conversion: 30,
    },
  ];

  const dataCourses = [
    {
      // logo: "/images/brand/brand-03.svg",
      name: "C++",
      visitors: 407,
      revenues: 2500,
      sales: 2600,
      conversion: 98,
    },
    {
      name: "Java Script",
      visitors: 357,
      revenues: 2400,
      sales: 2280,
      conversion: 70,
    },
    {
      name: "Flutter",
      visitors: 306,
      revenues: 2350,
      sales: 1970,
      conversion: 60,
    },
    {
      name: "Python",
      visitors: 255,
      revenues: 2300,
      sales: 1570,
      conversion: 60,
    },
    {
      name: "UI/UX",
      visitors: 200,
      revenues: 1900,
      sales: 1260,
      conversion: 55,
    },
    {
      name: "React",
      visitors: 151,
      revenues: 1500,
      sales: 1250,
      conversion: 60,
    },
    {
      name: "Business",
      visitors: 131,
      revenues: 1200,
      sales: 1140,
      conversion: 55,
    },
    {
      name: "Cyper Security",
      visitors: 111,
      revenues: 1000,
      sales: 930,
      conversion: 50,
    },
    {
      name: "Data Science",
      visitors: 61,
      revenues: 900,
      sales: 620,
      conversion: 40,
    },
    {
      name: "Kotlin",
      visitors: 31,
      revenues: 710,
      sales: 510,
      conversion: 30,
    },
  ];
  const [brandData, setBrandData] = useState(dataInstructors);

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
        Top 10
      </h4>
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="form-control  min-w-47.5">
            <label className="label cursor-pointer">
              <span className="label-text m-2 font-semibold text-secondary">
                Top Instructors
              </span>
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-red-500"
                value="instructors"
                defaultChecked
                onChange={handleRadioChange}
              />
            </label>
          </div>
          <div className="form-control min-w-47.5">
            <label className="label cursor-pointer">
              <span className="label-text m-2 font-semibold text-secondary">
                Top Students
              </span>
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-red-500"
                value="students"
                onChange={handleRadioChange}
              />
            </label>
          </div>
          <div className="form-control min-w-47.5">
            <label className="label cursor-pointer">
              <span className="label-text font-semibold text-secondary">
                Top Courses
              </span>
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-red-500 m-2"
                value="courses"
                onChange={handleRadioChange}
              />
            </label>
          </div>
        </div>
      </div>
      <br></br>
      <div className="flex flex-col">
        <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-[6px] md:text-base text-center font-medium uppercase">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-[6px] md:text-base font-medium uppercase">
              Visitors
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-[6px] md:text-base font-medium uppercase">
              Revenues
            </h5>
          </div>
          <div className="p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-[6px] md:text-base font-medium uppercase">
              Sales
            </h5>
          </div>
          <div className="p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-[6px] md:text-base font-medium uppercase">
              Conversion
            </h5>
          </div>
        </div>
        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-5 ${key === brandData.length - 1
              ? ""
              : "border-b border-stroke dark:border-strokedark"
              }`}
            key={key}
          >
            <div className="flex items-center justify-center gap-3 p-2.5 xl:p-5">
              {/* <div className="flex-shrink-0">
                <Image src={brand.logo} alt="Brand" width={48} height={48} />
              </div> */}
              <p className="text-[6px] md:text-base text-black dark:text-white sm:block">
                {brand.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-[6px] md:text-base text-black dark:text-white">{brand.visitors}K</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-[6px] md:text-base text-meta-3">${brand.revenues}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-[6px] md:text-base text-black dark:text-white">{brand.sales}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-[6px] md:text-base text-meta-5">{brand.conversion}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
