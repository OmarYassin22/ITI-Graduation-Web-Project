"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../app/firebaseConfig';

const Table = () => {

  const [courseData, setCourseData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [gradeInputs, setGradeInputs] = useState({});

  // const handleGradeInputChange = (studentId, value) => {
  //   setGradeInputs(prev => ({ ...prev, [studentId]: value }));
  // };

  const handleGradeInputChange = (studentId, courseName, value) => {
    setGradeInputs(prev => ({ ...prev, [`${studentId}-${courseName}`]: value }));
  };

  const handleEditGrade = async (studentId, courseName) => {
    // const newGrade = gradeInputs[studentId];
    // if (!newGrade) return;

    const newGrade = gradeInputs[`${studentId}-${courseName}`];
    if (!newGrade) return;
  
    try {
      const studentDoc = doc(db, "students", studentId);
      const studentSnapshot = await getDoc(studentDoc);
      
      if (studentSnapshot.exists()) {
        const studentData = studentSnapshot.data();
        const updatedCourses = studentData.courses.map(course => 
          course.course === courseName
            ? { ...course, grade: newGrade }
            : course
        );

        await updateDoc(studentDoc, { courses: updatedCourses });

        setCourseData(prevData => 
          prevData.map(course => 
            course.studentId === studentId && course.courseName === courseName
              ? { ...course, grade: newGrade }
              : course
          )
        );

        // setGradeInputs(prev => ({ ...prev, [studentId]: '' }));
        setGradeInputs(prev => ({ ...prev, [`${studentId}-${courseName}`]: '' }));
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error updating grade: ", error);
    }
  };

  useEffect(() => {
    if (!dataFetched) {
      fetchData();
    }
  }, [dataFetched]);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "students"));
      const students = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      
      const emadCourses = students.flatMap(student => {
        if (!student.courses || !Array.isArray(student.courses) || student.courses.length === 0) {
          return []; 
        }
        
        return student.courses
          .filter(course => course.instructor === 'Emad Elshplangy')
          .map(course => ({
            studentId: student.id,
            courseStudent: student.fname + " " + student.lname,
            courseName: course.course,
            grade: course.grade || 0,
            field: student.field || "",
          }));
      });

      setCourseData(emadCourses);
      setDataFetched(true);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const sortData = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
  
    const sortedData = [...courseData].sort((a, b) => {
      if (key === 'grade') {
        // Convert grade strings to numbers for comparison
        const aValue = parseFloat(a[key]);
        const bValue = parseFloat(b[key]);
        
        if (aValue < bValue) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      } else {
        // For other fields, use the existing comparison logic
        if (a[key] < b[key]) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      }
    });
  
    setCourseData(sortedData);
    setSortConfig({ key, direction });
  };

  const getSortDirection = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '▲' : '▼';
    }
    return '';
  };

  return (
    <div className="rounded-sm w-3/4 mx-auto border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-col">
        <div className="grid grid-cols-5 font-bold rounded-sm bg-neutral-200 dark:bg-white sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 
              className="text-sm uppercase xsm:text-base cursor-pointer"
              onClick={() => sortData('courseStudent')}
            >
              Name {getSortDirection('courseStudent')}
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 
              className="text-sm uppercase xsm:text-base cursor-pointer"
              onClick={() => sortData('courseName')}
              >
              Course {getSortDirection('courseName')}
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 
              className="text-sm uppercase xsm:text-base cursor-pointer"
              onClick={() => sortData('grade')}
              >
              Grade {getSortDirection('grade')}
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 
              className="text-sm uppercase xsm:text-base cursor-pointer"
              onClick={() => sortData('field')}
              >
              Field 
              {getSortDirection('field')}
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 
              className="text-sm uppercase xsm:text-base"
              >
              Add Grade 
            </h5>
          </div>
        </div>
        {courseData.map((course, key) => (
          <div
            className={`grid grid-cols-5 sm:grid-cols-5 ${
              key === courseData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">  
              <p className="text-black dark:text-white sm:block">{course.courseStudent}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{course.courseName}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{course.grade}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{course.field}</p>
            </div>
            <div className="flex items-center justify-between p-2.5 xl:p-5">
              <input 
                type="number" 
                className="w-2/4 border outline-none" 
                value={gradeInputs[`${course.studentId}-${course.courseName}`] || ''}
                onChange={(e) => handleGradeInputChange(course.studentId, course.courseName, e.target.value)}
              />
              <button 
                className="bg-sky-500 text-white px-3 py-1 rounded-lg"
                onClick={() => handleEditGrade(course.studentId, course.courseName)}
              >
                {course.grade === '0' ? 'Add' : 'Edit'}
              </button>
            </div>
            {/* <div className="flex items-center justify-between p-2.5 xl:p-5">
              <input 
                type="number" 
                className="w-2/4 border outline-none" 
                value={gradeInputs[course.studentId]}
                onChange={(e) => handleGradeInputChange(course.studentId, e.target.value)}
              />
              <button 
                className="bg-sky-500 text-white px-3 py-1 rounded-lg"
                onClick={() => handleEditGrade(course.studentId, course.courseName)}
              >
                {course.grade === '0' ? 'Add' : 'Edit'}
              </button>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
