import React, { useEffect, useState, useContext } from "react";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "./../../../firebaseConfig";
import { courseContext } from "./../../../Contexts/Courses/CourseContextProvider";
import Image from "next/image";

function MyLearning() {
  const [buyedCourses, setBuyedCourses] = useState([]);
  const [courses, setCourses] = useState(null);
  const [learningCourses, setLearningCourses] = useState([]);
  const { localCourse } = useContext(courseContext);
  console.log(localCourse);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [courseTitle, setCourseTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseIns, setCourseIns] = useState(null);
  

  useEffect(() => {
    setCourses(localCourse);
  }, [localCourse]);

  function openCourseDetails(id) {
    setSelectedCourseId(id);
  }

  useEffect(() => {
    const fetchCourseTitle = async () => {
      if (selectedCourseId) {
        setIsLoading(true);
        console.log(selectedCourseId);  
        try {
          const courseRef = doc(db, 'courses', selectedCourseId);
          const courseSnap = await getDoc(courseRef);
          console.log(courseRef);
          console.log(courseSnap);          
          if (courseSnap.exists()) {
            setCourseTitle(courseSnap.data().title);
            setCourseIns(courseSnap.data().instructor)
          } else {
            setError('No such course!');
          }
        } catch (error) {
          setError('Error fetching course: ' + error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchCourseTitle();
  }, [selectedCourseId]);

  console.log(courseTitle);
  console.log(courseIns);

  async function getData() {
    try {
      let buyerEmail = window.localStorage.getItem("email");
      const UserDataCollection = collection(db, "UserData");
      const q = query(UserDataCollection, where("email", "==", buyerEmail));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        let userDocument = userDoc.data();
        setBuyedCourses(userDocument.buyedCourses);
        console.log(userDocument.buyedCourses);
        console.log("Firebase update successful");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (courses && buyedCourses?.length > 0) {
      const filteredCourses = courses.filter((course) =>
        buyedCourses.includes(course.id)
      );
      setLearningCourses(filteredCourses);
    }
  }, [courses, buyedCourses]);

  return (
    <div>
      <div className="flex items-center text-color justify-between pl-5 pt-7 mb-5">
        <h2 className="text-5xl">Learning courses</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {learningCourses?.map((course, i) => (
          <div key={i} className="mx-3 text-color  my-5">
            <div className="card-body  p-0 h-full flex flex-col justify-between">
              <div className="max-w-sm p-6  cardesbackgroundcourse border  rounded-lg shadow   flex flex-col h-full">
                <div className="flex  justify-between items-center cardesbackgroundcourse mb-4">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {course.data.title}
                  </h5>
                </div>
                <div className="image-container w-full h-48 mb-4 ">
                  <Image
                    className="object-cover w-full h-full"
                    src={course.image}
                    alt={course.data.title}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex-grow">
                  <p className="card-title text-base text-color mb-2">{`by : ${course.data.instructor
                    .split(" ")
                    .slice(0, 3)
                    .join(" ")}`}</p>
                </div>
                <div className="flex justify-center mt-auto">
                  <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => {
                      openCourseDetails(course.id);
                    }}
                  >
                    start learning
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
      </div>
    </div>
  );
}

export default MyLearning;
