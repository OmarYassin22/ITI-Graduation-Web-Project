import React, { useState, useEffect } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../app/firebaseConfig';

const Calendar = () => {
  const [events, setEvents] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "courses"));
      const courses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const intructorCourse = courses.filter((course) => (course.instructor === "Emad Elshplangy"));

      const newEvents = {};

      intructorCourse.forEach((course) => {
        const formattedDates = course.days.map((timestamp) => {
          const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
          const options = { day: 'numeric', month: 'short' };
          const formattedDate = date.toLocaleDateString('en-GB', options);
          const day = date.getDate();
          newEvents[day] = { title: course.title, date: formattedDate };
        });
      });
      setEvents(newEvents);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb pageName="Schedule" />
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white">
            </tr>
          </thead>
          <tbody>
            <tr className="grid grid-cols-7">
              {Array.from({ length: 31 }, (_, i) => (
                <td
                  key={i + 1}
                  className="ease relative h-20 border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31"
                >
                  <span className="font-medium text-black dark:text-white">
                    {i + 1}
                  </span>
                  {events[i + 1] && (
                    <div className="group h-16 w-full flex-grow py-1 md:h-30">
                      <div className="event invisible absolute left-2 z-99 mb-1 flex w-[200%] flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left opacity-0 group-hover:visible group-hover:opacity-100 dark:bg-meta-4 md:visible md:w-[90%] md:opacity-100">
                        <span className="event-name text-sm font-semibold text-black dark:text-white">
                          {events[i + 1].title}
                        </span>
                        <span className="time text-sm font-medium text-black dark:text-white">
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
      </div>
    </div>
  );
};

export default Calendar;
