"use client";
import React, { useState, useEffect } from "react";
import { getDocs, collection, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../app/firebaseConfig"; 
import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
const Instructor = () => {
  const [brandData, setBrandData] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [instructorName, setInstructorName] = useState("");
  const [instructorEmail, setInstructorEmail] = useState("");
  const [instructorPhone, setInstructorPhone] = useState("");
  const [instructorFields, setInstructorFields] = useState("");
  const [fieldsList, setFieldsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFieldTerm, setSearchFieldTerm] = useState("");
  const [filteredData, setFilteredData] = useState(brandData);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const instructorsCollection = collection(db, "instructors");
        const instructorSnapshot = await getDocs(instructorsCollection);
        const instructorsList = instructorSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBrandData(instructorsList);
      } catch (error) {
        console.error("Error fetching instructors: ", error);
      }
    };
    fetchInstructors();
  }, []);

  useEffect(() => {
    setFilteredData(
      brandData.filter((instructor) => 
        instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        instructor.fields.some((field) => field.toLowerCase().includes(searchFieldTerm.toLowerCase()))
      )
    );
  }, [searchTerm, searchFieldTerm, brandData]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "instructors", id));
      setBrandData(brandData.filter(instructor => instructor.id !== id));
    } catch (error) {
      alert("Error deleting instructor: ", error);
    }
  };

  const handleUpdate = (instructor) => {
    setSelectedInstructor(instructor);
    setInstructorName(instructor.name);
    setInstructorEmail(instructor.email);
    setInstructorPhone(instructor.phone);
    setFieldsList(instructor.fields);
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    if (selectedInstructor) {
      try {
        const instructorRef = doc(db, "instructors", selectedInstructor.id);
        await updateDoc(instructorRef, {
          name: instructorName,
          email: instructorEmail,
          phone: instructorPhone,
          fields: fieldsList,
        });
        setBrandData(brandData.map(instructor =>
          instructor.id === selectedInstructor.id ? { ...instructor, name: instructorName, email: instructorEmail, phone: instructorPhone, fields: fieldsList } : instructor
        ));
        setSelectedInstructor(null);
      } catch (error) {
        alert("Error updating instructor: ", error);
      }
    }
  };

  const handleAddField = () => {
    if (instructorFields.trim()) {
      setFieldsList([...fieldsList, instructorFields]);
      setInstructorFields("");
    }
  };

  const handleDeleteItem = (index) => {
    setFieldsList(fieldsList.filter((_, i) => i !== index));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex items-center justify-between">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Instructors
        </h4>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="search about name..."
            className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-72 mr-5 bg-transparent text-black  dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-1/3 transform-translate-y-1/2 text-gray-500" />
        </div>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="search about field..."
            className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-72 mr-5 bg-transparent text-black  dark:text-white"
            value={searchFieldTerm}
            onChange={(e) => setSearchFieldTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-1/3 transform-translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-6 gap-2 p-2.5 bg-gray-2 dark:bg-meta-4 text-black dark:text-white">
          <h5 className="text-sm text-center font-medium uppercase xsm:text-base">
            Name
          </h5>
          <h5 className="text-sm font-medium text-center uppercase xsm:text-base">
            Phone
          </h5>
          <h5 className="text-sm font-medium text-center uppercase xsm:text-base">
            Email
          </h5>
          <h5 className="hidden sm:block text-sm text-center font-medium uppercase xsm:text-base">
            Field
          </h5>
          <h5 className="hidden sm:block text-sm text-center font-medium uppercase xsm:text-base">
            Delete
          </h5>
          <h5 className="hidden sm:block text-sm text-center font-medium uppercase xsm:text-base">
            Update
          </h5>
        </div>
        {filteredData.map((instructor, key) => (
          <div
            className={`grid grid-cols-6 gap-2 ${
              key === filteredData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            } p-2.5`}
            key={instructor.id}
          >
            <p className="text-black dark:text-white">{instructor.name}</p>
            <p className="text-meta-3 text-center">{instructor.phone}</p>
            <p className="text-meta-3 text-center">
              {instructor.email ? instructor.email.split("@")[0] + "@" : "No Email"}
            </p>
            <p className="hidden sm:block text-black dark:text-white text-center">
              <select name="field" className="bg-transparent">
                {instructor.fields
                  .sort((a, b) => b.length - a.length)
                  .map((field, index) => (
                    <option
                      key={index}
                      value={field}
                      className="bg-transparent text-black"
                    >
                      {field}
                    </option>
                  ))}
              </select>
            </p>
            <button
              className="hidden sm:block text-center bg-rose-800 w-fit mx-auto p-2 rounded-md text-white"
              onClick={() => handleDelete(instructor.id)}
            >
              Delete
            </button>
            <button
              className="hidden sm:block text-center bg-green-800 w-fit mx-auto p-2 rounded-md text-white"
              onClick={() => handleUpdate(instructor)}
            >
              Update
            </button>
          </div>
        ))}
      </div>

      {selectedInstructor && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-md">
            <h3 className="text-xl font-semibold mb-4">Update Instructor</h3>
            <form className="max-w-sm" onSubmit={handleSubmitUpdate}>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Instructor Name
                </label>
                <input
                  type="text"
                  placeholder="Instructor Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={instructorName}
                  onChange={(e) => setInstructorName(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Instructor Email
                </label>
                <input
                  type="email"
                  placeholder="Instructor Email"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={instructorEmail}
                  onChange={(e) => setInstructorEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Instructor Phone
                </label>
                <input
                  type="text"
                  placeholder="Instructor Phone"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={instructorPhone}
                  onChange={(e) => setInstructorPhone(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Instructor Fields
                </label>
                <input
                  type="text"
                  placeholder="Instructor Fields"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={instructorFields}
                  onChange={(e) => setInstructorFields(e.target.value)}
                />
                <button
                  className="inline-flex items-center justify-center w-full mt-4 text-sm font-medium rounded-lg h-10 text-white hover:shadow-1 bg-primary border-stroke transition"
                  onClick={handleAddField}
                  type="button"
                >
                  Add Field
                </button>
                {fieldsList.length > 0 && (
                  <ul className="mt-3 list-disc pl-5">
                    {fieldsList.map((field, index) => (
                      <li key={index} className="flex justify-between items-center">
                        {field}
                        <button
                          type="button"
                          className="ml-2 text-white p-1 rounded-md mb-1 bg-rose-600 hover:bg-rose-900"
                          onClick={() => handleDeleteItem(index)}
                        >
                         <IoMdClose />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className=" flex items-center justify-between mt-3">
              <button
                className=" w-fit text-sm font-medium rounded-lg p-2 text-white hover:shadow-1 bg-primary border-stroke transition"
                type="submit"
              >
                Update
              </button>
              <button  onClick={() => setSelectedInstructor(null)}
               className=" w-fit text-sm font-medium rounded-lg p-2 text-white hover:shadow-1 bg-primary border-stroke transition">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instructor;
