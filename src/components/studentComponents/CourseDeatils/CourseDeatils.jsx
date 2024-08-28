"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import CourseVideoPlayer from "../../../components/instructorComponents/CourseVideoPlayer/CourseVideoPlayer";
import { courses } from '../../studentComponents/Courses/Courses';

function CourseDetails() {
  const { courseName } = useParams();
  const course = courses.find(c => c.name.toLowerCase() === courseName.toLowerCase());

  const [matchingCourseData, setMatchingCourseData] = useState(null);

  useEffect(() => {
    const allCoursesData = JSON.parse(localStorage.getItem('coursesData')) || [];
    const matchingCourse = allCoursesData.find(c => c.selectedCourse.toLowerCase() === courseName.toLowerCase());
    if (matchingCourse) {
      setMatchingCourseData(matchingCourse);
    }
  }, [courseName]);

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className='flex justify-between items-center px-50 py-10'>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
        <Image
          src={course.image}
          alt={course.name}
          width={200}
          height={200}
          className="mb-4"
        />
        <p>Instructor: Instructor Name</p>
      </div>
      <div className='w-full'>
        {matchingCourseData && (
          <CourseVideoPlayer 
            courseName={matchingCourseData.selectedCourse} 
            fileName={matchingCourseData.fileName} 
          />
        )}
      </div>
    </div>
  );
}

export default CourseDetails;

// "use client";
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import Image from 'next/image';
// import CourseVideoPlayer from "../../../components/instructorComponents/CourseVideoPlayer/CourseVideoPlayer";
// import { courses } from '../../studentComponents/Courses/Courses';

// function CourseDetails() {
//   const { courseName } = useParams();
//   const course = courses.find(c => c.name.toLowerCase() === courseName.toLowerCase());

//   const [storedCourse, setStoredCourse] = useState(null);
//   const [storedFileName, setStoredFileName] = useState(null);

//   useEffect(() => {
//     const coursesData = JSON.parse(localStorage.getItem('coursesData'));
//     // if (coursesData) {
//     //   setStoredCourse(coursesData.selectedCourse);
//     //   setStoredFileName(coursesData.fileName);
//     // }
//     console.log(coursesData);
    
//   }, []);

//   if (!course) {
//     return <div>Course not found</div>;
//   }

//   return (
//     <div className='flex justify-between items-center px-50 py-10'>
//       <div className="container mx-auto p-4">
//         <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
//         <Image
//           src={course.image}
//           alt={course.name}
//           width={200}
//           height={200}
//           className="mb-4"
//         />
//         <p>Instructor: Instructor Name</p>
//       </div>
//       <div className='w-full'>
//         {storedCourse && storedFileName && (
//           <CourseVideoPlayer courseName={course.name} fileName={storedFileName} />
//         )}
//       </div>
//     </div>
//   );
// }

// export default CourseDetails;