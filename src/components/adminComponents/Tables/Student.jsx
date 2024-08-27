import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../../app/firebaseConfig"; 
import { IoMdClose } from "react-icons/io";

function Student() {
  const [studentData, setStudentData] = useState([]);
  const [selectedCourseGrades, setSelectedCourseGrades] = useState({});
  const [selectedCourses, setSelectedCourses] = useState({});
  const [selectedField, setSelectedField] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [studentFields, setStudentFields] = useState([]);
  const [newCourse, setNewCourse] = useState("");
  const [newDegree, setNewDegree] = useState([]);

  async function getStudentData() {
    try {
      const { data } = await axios.get('/api/students');
      console.log(data);
      setStudentData(data);

      const initialSelectedCourses = {};
      const initialSelectedCourseGrades = {};
      data.forEach(student => {
        if (student.data && student.data.courses && student.data.courses.length > 0) {
          const firstCourse = student.data.courses[0];
          initialSelectedCourses[student.id] = firstCourse.course;
          initialSelectedCourseGrades[student.id] = firstCourse.degree; // تم تغيير 'grade' إلى 'degree'
        }
      });
      setSelectedCourses(initialSelectedCourses);
      setSelectedCourseGrades(initialSelectedCourseGrades);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  }

  useEffect(() => {
    getStudentData();
  }, []);

  function handleCourseChange(studentId, event) {
    const courseName = event.target.value;
    setSelectedCourses(prevState => ({
      ...prevState,
      [studentId]: courseName
    }));

    const course = studentData
      .find(student => student.id === studentId)
      ?.data.courses.find(course => course.course === courseName);

    setSelectedCourseGrades(prevState => ({
      ...prevState,
      [studentId]: course ? course.degree : '' // تم تغيير 'grade' إلى 'degree'
    }));
  }

  function handleFieldChange(event) {
    setSelectedField(event.target.value);
  }

  const filteredStudents = selectedField
    ? studentData.filter(student => student.data.field === selectedField)
    : studentData;

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "students", id));
      setStudentData(studentData.filter((student) => student.id !== id));
    } catch (error) {
      alert("Error deleting student: ", error);
    }
  };

  const handleUpdate = (student) => {
    setSelectedStudent(student);
    setStudentName(`${student.data.fname} ${student.data.lname}`);
    setStudentEmail(student.data.email);
    setStudentPhone(student.data.number);
    setStudentFields(student.data.courses || []); 
  };

 const handleSubmitUpdate = async (e) => {
  e.preventDefault();
  if (selectedStudent) {
    try {
      const studentRef = doc(db, "students", selectedStudent.id);

      const docSnap = await getDoc(studentRef);
      const currentData = docSnap.data();

      const updatedCourses = studentFields.map(field => ({
        ...field,
        degree: 0 
      }));

      await updateDoc(studentRef, {
        courses: updatedCourses
      });

      setStudentData(studentData.map(student =>
        student.id === selectedStudent.id ? {
          ...student,
          data: {
            ...student.data,
            courses: updatedCourses
          }
        } : student
      ));

      setSelectedStudent(null);
      setStudentName("");
      setStudentEmail("");
      setStudentPhone("");
      setStudentFields([]);
    } catch (error) {
      alert("Error updating student: ", error);
    }
  }
};


  const handleDeleteField = (index) => {
    setStudentFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  const handleAddField = () => {
    if (newCourse && newDegree) {
      setStudentFields([...studentFields, { course: newCourse, degree: newDegree }]);
      setNewCourse("");
      setNewDegree("");
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className='mb-7'>
          <select className=' bg-white text-black dark:bg-slate-800 dark:text-white' onChange={handleFieldChange} value={selectedField}>
            <option value="">Tracks</option>
            {studentData?.length > 0 ? (
              [...new Set(studentData.map(student => student.data.field))].map((field, index) => (
                <option key={index} value={field}>{field}</option>
              ))
            ) : (
              <option>No fields available</option>
            )}
          </select>
        </div>
        <div className="grid grid-cols-7 p-2 bg-gray-2 dark:bg-meta-4 text-black dark:text-white">
          <h5 className="text-sm text-center font-medium xsm:text-base">Name</h5>
          <h5 className="text-sm font-medium text-center xsm:text-base">Phone</h5>
          <h5 className="text-sm font-medium text-center xsm:text-base">Email</h5>
          <h5 className="hidden sm:block text-sm text-center font-medium xsm:text-base">Field</h5>
          <h5 className="hidden sm:block text-sm text-center font-medium xsm:text-base">Degree</h5>
          <h5 className="hidden sm:block text-sm text-center font-medium xsm:text-base">Delete</h5>
          <h5 className="hidden sm:block text-sm text-center font-medium xsm:text-base">Update</h5>
        </div>
        {filteredStudents.map(student => (
          <div className="grid grid-cols-7 gap-2 p-2.5" key={student.id}>
            <p className="text-black dark:text-white">{student.data.fname} {student.data.lname}</p>
            <p className="text-meta-3 text-center">{student.data.number}</p>
            <p className="text-meta-3 text-center">
              {student.data.email ? student.data.email.split("@")[0] + "@" : "No Email"}
            </p>
            <p className="hidden sm:block text-black  dark:text-white text-center ">
              <select
                className='dark:bg-slate-800'
                value={selectedCourses[student.id] || ''}
                onChange={(e) => handleCourseChange(student.id, e)}
              >
                {/* <option value="">Select Course</option> */}
                {student.data?.courses?.length > 0 ? (
                  student.data.courses.map((course,index) => (
                    <option key={`${index}`} value={course.course} className=''>
                      {course.course}
                    </option>
                  ))
                ) : (
                  <option>No courses</option>
                )}
              </select>
            </p>
            <p className=" text-center w-fit mx-auto rounded-md text-black dark:text-white">
              {selectedCourseGrades[student.id] || '0'}
            </p>

            <button onClick={() => handleDelete(student.id)} className="hidden sm:block text-center bg-rose-800 w-fit mx-auto p-2 rounded-md text-white">
              Delete
            </button>
            <button onClick={() => handleUpdate(student)} className="hidden sm:block text-center bg-green-800 w-fit mx-auto p-2 rounded-md text-white">
              Update
            </button>
          </div>
        ))}
      </div>
      {selectedStudent && (
        <div className="fixed inset-0 flex z-99 items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-md">
            <h3 className="text-xl font-semibold mb-4">Update Student</h3>
            <form className="max-w-sm" onSubmit={handleSubmitUpdate}>
              <div>
                <label className="mb-3 block text-black text-sm font-medium my-1">
                  Student Name
                </label>
                <input
                  type="text"
                  placeholder="Student Name"
                  className="w-full rounded-lg border-[1.5px] border-gray-300 py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="mb-3 block text-black text-sm font-medium my-1">
                  Student Email
                </label>
                <input
                  type="email"
                  placeholder="Student Email"
                  className="w-full rounded-lg border-[1.5px] border-gray-300 py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="mb-3 block text-black text-sm font-medium my-1">
                  Student Phone
                </label>
                <input
                  type="text"
                  placeholder="Student Phone"
                  className="w-full rounded-lg border-[1.5px] border-gray-300 py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                  required
                />
              </div>

              {/* إضافة حقول جديدة للدورات */}
              <div className="mt-4 mb-2">
                <label className="mb-3 block text-black text-sm font-medium my-1">
                  Current Courses
                </label>
                {studentFields.map((field, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <span className="flex-grow">{field.course} - {field.degree}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteField(index)}
                      className="text-red-600"
                    >
                      <IoMdClose />
                    </button>
                  </div>
                ))}
              </div>

              {/* add fields*/}
              <div className="mb-4">
                <div className='flex justify-between items-center'>
                <input
                  type="text"
                  placeholder="New Course"
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  className="w-5/12 rounded-lg border-[1.5px] border-gray-300 py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                <input
                  type="text"
                  
                  placeholder="New Degree"
                  value={newDegree}
                  onChange={(e) => setNewDegree(e.target.value)}
                  className="w-5/12 rounded-lg border-[1.5px] border-gray-300 py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                </div>
                <button
                  type="button"
                  onClick={handleAddField}
                  className="w-full bg-blue-500 text-white rounded-lg py-2 mt-2"
                >
                  Add Course
                </button>
              </div>
               <div className='flex justify-between items-center'>
                  <button
                    type="submit"
                    className="mt-4 w-fit bg-blue-500 text-white rounded-lg p-2"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedStudent(null)}
                    className="mt-2 w-fit bg-rose-700 text-white rounded-lg p-2"
                  >
                    Cancel
                  </button>
               </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Student;
