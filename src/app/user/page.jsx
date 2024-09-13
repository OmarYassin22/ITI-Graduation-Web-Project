"use client";
import React, { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import Variants from "../Spinner";
import { useRouter } from "next/navigation";
import { BackgroundSection, CardGridSection } from "./StaticSections";
import { courseContext } from "../Contexts/Courses/CourseContextProvider";
import Acordion from "./acordion";
import DefaultLayout from "../../components/homeComponents/Layouts/DefaultLayout";

function UserPage() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    console.log(localStorage.getItem("counter"));
    localStorage.setItem(
      "counter",
      localStorage.getItem("counter") == null
        ? 0
        : +localStorage.getItem("counter") + 1
    );

    window.onload = () => {
      // localStorage.setItem("counter", +localStorage.getItem("counter") + 1);
      localStorage.setItem("counter", +localStorage.getItem("counter") + 1);
    };
  }, []);
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const { localCourse, setLocalCourse } = useContext(courseContext);
  useEffect(() => {
    setCourses(localCourse);
  }, [localCourse]);
  useEffect(() => {
    if (courses.length > 0) {
      if (localCourse.length > 0) {
        setCourses((prevCourses) =>
          prevCourses.sort((a, b) =>
            (a.data.students?.length || 0) > (b.data.students?.length || 0)
              ? -1
              : (a.data.students?.length || 0) < (b.data.students?.length || 0)
              ? 1
              : 0
          )
        );
      }
    }

  }, []);

  return (
    <DefaultLayout>
     
    </DefaultLayout>
  );
}
export default UserPage;

// "use client";
// import React, { useContext, useEffect, useState } from "react";
// // import React from 'react';

// const Page = () => {
//     useEffect(() => {
//     console.log(localStorage.getItem("counter"));
//     localStorage.setItem(
//       "counter",
//       localStorage.getItem("counter") == null
//         ? 0
//         : +localStorage.getItem("counter") + 1
//     );

//     window.onload = () => {
//       localStorage.setItem("counter", +localStorage.getItem("counter") + 1);
//     };
//   }, []);
//   return (
//     <div>

//     </div>
//   );
// }

// export default Page;

// "use client";
// import React, { useContext, useEffect, useState } from "react";

// const Page = () => {
//   useEffect(() => {
//     console.log(localStorage.getItem("counter"));
//     localStorage.setItem(
//       "counter",
//       localStorage.getItem("counter") == null
//         ? 0
//         : +localStorage.getItem("counter") + 1
//     );

//     window.onload = () => {
//       // localStorage.setItem("counter", +localStorage.getItem("counter") + 1);
//       localStorage.setItem("counter", +localStorage.getItem("counter") + 1);
//     };
//   }, []);
//   return <div></div>;
// };

// export default Page;
