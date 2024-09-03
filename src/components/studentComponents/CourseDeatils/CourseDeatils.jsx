"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import CourseVideoPlayer from "../../instructorComponents/CourseVideoPlayer/CourseVideoPlayer";
import { courses } from '../Courses/Courses';
import DefaultImages from "../../../app/DefaultImages";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../app/firebaseConfig';

function CourseDetails({id}) {
  const [data,setData] = useState([]);
  useEffect(()=>{
    var newData = [];
    console.log(id);
    const fetchData = async ()=>{
      try {
        const querySnapshot2 = await getDocs(collection(db, "courses"));

        querySnapshot2.forEach((doc) => {
            const courseid = doc.id;
            if (courseid == id) {
              const coursesData2 = doc.data();
           newData = [
            coursesData2.title,
            coursesData2.instructor,
            DefaultImages[coursesData2.title],
           ];
            }
        });

    } catch (error){
        console.error("Error fetching data: ", error);
    }
    setData(newData);
    };
    fetchData();
  },[]);
  return (
    <div className='flex justify-between items-center px-50 py-10'>
      <div className="flex flex-col justify-center items-center container mx-auto p-4">
           <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">{data[0]}</h1>
           <Image
             src={data[2]}
             alt={data[0]}
             width={200}
             height={200}
             className="mb-4"
           />
           <p className="text-black dark:text-white">Instructor: {data[1]}</p>
      </div>
      {/* <div className='w-full'> 
          <CourseVideoPlayer 
          />
      </div> */}
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