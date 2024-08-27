"use client";
import Breadcrumb from "../../../../components/adminComponents/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../../../components/adminComponents/Layouts/DefaultLayout";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Variants from "../../../Spinner";
import { IoMdClose } from "react-icons/io";

const Page = () => {
  const [instructors, setInstructors] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  const [success, setSuccess] = useState(false);
  const [courses, setCourses] = useState([]);
  const [fieldsList, setFieldsList] = useState([]);
  const [instructorName, setInstructorName] = useState('');
  const [instructorEmail, setInstructorEmail] = useState('');
  const [instructorPhone, setInstructorPhone] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

 
  
  useEffect(() => {
  const fetchInstructors = () => {
    fetch("/api/instructors")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        setInstructors(result);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  fetchInstructors();
}, []);

useEffect(() => {
  const fetchCourses = () => {
    fetch("/api/courses")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        setCourses(result);
      })
      .catch(error => {
        setError(error.message);
      });
  };
  fetchCourses();
}, []);


  const generatePassword = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    if (instructorName && instructorEmail && instructorPhone && fieldsList.length > 0) {
      const uniquePassword = generatePassword(8);
      const response = await fetch("/api/instructors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: instructorName,
          email: instructorEmail,
          phone: instructorPhone,
          fields: fieldsList,
          password: uniquePassword,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        const refresh = await fetch("/api/instructors");
        const refreshedInstructors = await refresh.json();
        setInstructors(refreshedInstructors);
        alert(`An instructor added successfully with : \nname : ${instructorName} \npassword :${uniquePassword}`);
        setInstructorName("");
        setInstructorEmail("");
        setInstructorPhone("");
        setFieldsList([]);
        setSuccess(true);
      } else {
        alert('Failed to add instructor');
      }
    } else {
      alert('Please enter all required information');
    }
  };

  const handleCourseChange = (e) => {
    const selected = e.target.value;
    if (selected && !fieldsList.includes(selected)) {
      setFieldsList([...fieldsList, selected]);
    }
    setSelectedCourse('');
  };

  const handleDeleteItem = (index) => {
    const updatedFieldsList = [...fieldsList];
    updatedFieldsList.splice(index, 1);
    setFieldsList(updatedFieldsList);
  };

  if (loading) return <Variants />;
  if (error) return <div>Error: {error}</div>;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add New Instructor" />
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-115 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Input Instructor Info</h3>
          </div>
          <div className="flex w-full flex-col gap-5.5 p-6.5">
            <form className="max-w-sm">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Instructor Name</label>
                <input
                  type="text"
                  placeholder="Instructor Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={instructorName}
                  onChange={(e) => setInstructorName(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-3 mt-3 block text-sm font-medium text-black dark:text-white">Instructor Email</label>
                <input
                  type="email"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={instructorEmail}
                  onChange={(e) => setInstructorEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-3 mt-3 block text-sm font-medium text-black dark:text-white">Instructor Phone Number</label>
                <input
                  type="tel"
                  placeholder="Instructor Phone Number"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={instructorPhone}
                  onChange={(e) => setInstructorPhone(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-3 mt-3 block text-sm font-medium text-black dark:text-white">Select Course</label>
                <div className="flex gap-2">
                  <select
                    value={selectedCourse}
                    onChange={handleCourseChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Select a Course</option>
                    {courses.length > 0 ? (
                      courses.map((course) => (
                        <option key={course.id} value={course.data.title}>
                          {course.data.title}
                        </option>
                      ))
                    ) : (
                      <option value="">No courses available</option>
                    )}
                  </select>
                </div>
              </div>
              {/* Display added courses */}
              <div className="mt-3">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">Added Courses</label>
                <ul>
                  {fieldsList.map((field, index) => (
                    <li key={index} className="flex items-center justify-between mt-2 text-sm font-medium text-black dark:text-white">
                      {field}
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(index)}
                        className="text-red-500 hover:text-red-700 text-xl dark:text-red-400 dark:hover:text-red-300"
                      >
                        <IoMdClose className="bg-rose-700 text-white rounded-full"/>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <button
                  type="submit"
                  onClick={handleCreate}
                  className="rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Page;
