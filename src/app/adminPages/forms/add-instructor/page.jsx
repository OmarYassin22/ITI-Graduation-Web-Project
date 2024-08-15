"use client";
import Breadcrumb from "../../../../components/adminComponents/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../../../components/adminComponents/Layouts/DefaultLayout";
// import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import { v4 } from "uuid";
import Image from "next/image";
import Variants from "../../../Spinner";

const Page = () => {
  const [instructors, setInstructors] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  const [success, setSuccess] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/instructors");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setInstructors(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // const handleInstructorDetails = async (id) => {
  //   push(`/forms/add-course/${id}`);
  // };

  const [instructorName, setInstructorName] = useState('');
  const [instructorEmail, setInstructorEmail] = useState('');
  const [instructorPhone, setInstructorPhone] = useState('');
  const [instructorFields, setInstructorFields] = useState('');
  const [fieldsList, setFieldsList] = useState([]);

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
    if (instructorName && instructorEmail && instructorPhone && fieldsList.length > 0){

      const uniquePassword = generatePassword(8);

      console.log(instructorName, instructorPhone, instructorEmail, fieldsList , uniquePassword);
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
      console.log(result.id);
      const refresh = await fetch("/api/instructors");
      const refreshedInstructors = await refresh.json();
      setInstructors(refreshedInstructors);
      alert(`An instructor added successfully with : \nname : ${instructorName} \npassword :${uniquePassword}`);
    setInstructorName("");
    setInstructorEmail("");
    setInstructorPhone("");
    setFieldsList([]);
    setSuccess(true);
  } else{
    alert('Failed to add instructor');
  }
} else{
   alert('Please enter all required information');
}
  };





  const handleAddField = () => {
    if (instructorFields) {
      setFieldsList([...fieldsList, instructorFields]);
      setInstructorFields(''); 
    }
  };
  const handleDeleteItem = (index) => {
    const updatedFieldsList = [...fieldsList];
    updatedFieldsList.splice(index, 1);
    setFieldsList(updatedFieldsList);
  };
  
  if (!instructors)
    return (
      <div className="max-h-full">
        <Variants></Variants>
      </div>
    );
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add New Constructors" />
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-115 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Input Constructor Info
            </h3>
          </div>
          <div className="flex w-full flex-col gap-5.5 p-6.5">
            <form className="max-w-sm">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Instructor Name
                </label>
                <input
                  type="text"
                  placeholder="Instructor Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={instructorName}
                  onChange={(e)=>
                    setInstructorName(e.target.value)
                  }
                />
              </div>
              <div>
                <label className="mb-3 mt-3 block text-sm font-medium text-black dark:text-white">
                  Instructor Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={instructorEmail}
                  onChange={(e)=>
                    setInstructorEmail(e.target.value)
                  }
                  />
              </div>
              <div>
                <label className="mb-3 mt-3 block text-sm font-medium text-black dark:text-white">
                  Instructor Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Instructor Phone Number"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={instructorPhone}
                  onChange={(e)=>
                    setInstructorPhone(e.target.value)
                  }
                  />
              </div>
              <div>
                <label className="mb-3 mt-3 block text-sm font-medium text-black dark:text-white">
                  Instructor Field
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Instructor Field"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={instructorFields}
                    onChange={(e) => setInstructorFields(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleAddField}
                    className="rounded-lg bg-blue-600 px-5 py-2 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                  >
                    Add
                  </button>
                </div>

                <ul className="mt-3 list-disc pl-5">
                  {fieldsList.map((field, index) => (
                    <div key={index} className="flex gap-2">
                      <li className="text-black dark:text-white">
                        {field}
                      </li>
                      <button onClick={() => handleDeleteItem(index)} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-default" aria-label="Close">
                          <span className="sr-only">Close</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                      </button>
                    </div>
                  ))}
                </ul>
              </div>
              <br />
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 sm:w-auto"
                  onClick={handleCreate}
                >
                  Create
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