'use client'
// pages/calendar.jsx
import axios from 'axios';
import React, { useEffect, useState } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../app/firebaseConfig";
import Swal from 'sweetalert2';

const Calendar = ({ calendarId }) => {
  const [events, setEvents] = useState({});
  const [editingEvent, setEditingEvent] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);


   async function getInstructors() {
    try {
      const { data } = await axios.get("/api/instructors");
      setInstructors(data);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  }
   async function fetchCourses() {
    try {
      const { data } = await axios.get("/api/courses");
      setCourses(data);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  }
   useEffect(() => {
    getInstructors();
    fetchCourses()
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      const docRef = doc(db, "course_instructor", calendarId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setEvents(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchEvents();
  }, [calendarId]);

  const handleSaveClick = async () => {
    if (editingEvent) {
      const { title, date } = editingEvent.event;
      if (title.trim() || date.trim()) {
        setEvents((prevEvents) => {
          const updatedEvents = {
            ...prevEvents,
            [editingEvent.day]: editingEvent.event,
          };

          const docRef = doc(db, "course_instructor", calendarId);
          setDoc(docRef, updatedEvents)
            .then(() => {
              Swal.fire({
                text: 'Saved successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
                width: "15em",
                timer: "1000"
              });
            })
            .catch((error) => {
              console.error("Error saving event: ", error);
            });

          return updatedEvents; 
        });
      }
      setEditingEvent(null); 
    }
  };

  const handleEditClick = (day) => {
    const event = events[day] || { title: "", date: "" };
    setEditingEvent({ day, event });
  };

  // Handle input change during editing
  const handleInputChange = (e, field) => {
    if (editingEvent) {
      setEditingEvent({
        ...editingEvent,
        event: {
          ...editingEvent.event,
          [field]: e.target.value,
        },
      });
    }
  };
const handleDeleteClick = () => {
  if (editingEvent) {
    setEvents((prevEvents) => {
      const updatedEvents = { ...prevEvents };
      delete updatedEvents[editingEvent.day]; // حذف الحدث من اليوم المختار

      const docRef = doc(db, "course_instructor", calendarId);
      setDoc(docRef, updatedEvents)
        .then(() => {
          Swal.fire({
            text: 'Deleted successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
            width: "15em",
            timer: "1000"
          });
        })
        .catch((error) => {
          console.error("Error deleting event: ", error);
        });

      return updatedEvents;
    });

    setEditingEvent(null); 
  }
};

  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb pageName="Calendar" />

      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white">
              {/* */}
            </tr>
          </thead>
          <tbody>
            <tr className="grid grid-cols-7">
              {Array.from({ length: 31 }, (_, i) => (
                <td
                  key={i + 1}
                  className={`ease relative h-20 border border-stroke p-2  duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31 ${(events[i + 1] != undefined ? `md:bg-white md:dark:bg-boxdark bg-green-600 dark:bg-green-600` : `transition`)}`}
                  onClick={() => handleEditClick((i + 1).toString())}
                >
                  <span className="font-medium text-black dark:text-white">
                    {i + 1}
                  </span>
                  {events[i + 1] && (
                    <div className="group h-fit w-full flex-grow cursor-pointer py-1 md:h-30">
                      <div className="event invisible absolute left-2 z-99 mb-1 flex w-[200%] flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left opacity-0 group-hover:visible group-hover:opacity-100 dark:bg-meta-4 md:visible md:w-[90%] h-[50%] xl:h-[40%] md:opacity-100">
                        <span className="event-name text-xs xl:text-xs font-semibold text-black dark:text-white">
                          {events[i + 1].title}
                        </span>
                        <span className="time text-xs xl:text-xs font-medium text-black dark:text-white">
                          {events[i + 1].date}
                        </span>
                      </div>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        {editingEvent && (
          <div className="bg-gray-800 fixed inset-0 z-99 flex items-center justify-center bg-opacity-50 ">
            <div className="dark:bg-slate-800 dark:text-white bg-white p-5 rounded-lg shadow-lg max-w-md max-h-[80vh] overflow-y-auto border border-primary ">
              <h3 className="text-lg font-bold">Edit Event</h3>
              <div className="mb-4">
                <label className="text-gray-700 block text-sm font-medium">
                 Course
                </label>
               
                <select
                  className=" dark:bg-slate-800 dark:text-white w-full rounded-lg border border-stroke bg-transparent py-2 px-3 text-black text-sm outline-none focus:border-primary"
                  onChange={(e) => handleInputChange(e, "title")}
                  value={editingEvent.event.title}
                >
                  <option value="" disabled selected>
                 Select a course
                  </option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.data.title}>
                      {course.data.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="text-gray-700 block text-sm font-medium">
                  Instructor
                </label>
               
                 <select
                    value={editingEvent.event.date}
                    onChange={(e) => handleInputChange(e, "date")}
                    className=" dark:bg-slate-800 dark:text-white w-full rounded-lg border border-stroke bg-transparent py-2 px-3 text-black text-sm outline-none focus:border-primary"
                  >
                    <option value="">Select Instructor</option>
                    {instructors.map((instructor) => (
                      <option key={instructor.id} value={instructor.name}>
                        {instructor.data.name}
                      </option>
                    ))}
                  </select>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleSaveClick}
                  className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Save
                </button>
                <button
                  onClick={ handleDeleteClick}
                  className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Delete
                </button>
                <button
                  onClick={() => setEditingEvent(null)}
                  className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
