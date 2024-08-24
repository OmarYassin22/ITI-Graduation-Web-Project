import React, { useState } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";

const initialEvents = {
  "1": { title: "JavaScript", date: "1 Dec - 4 Dec" },
  "5": { title: "Git", date: "5 Dec" },
  "7": { title: "Git", date: "7 Dec" },
  "8": { title: "React-js", date: "8 Dec - 12 Dec" },
  "14": { title: "Next-js", date: "14 Dec -" },
  "15": { title: "Next-js", date: "16 Dec" },
  "17": { title: "Angular-js", date: "17 Dec -" },
  "21": { title: "Angular-js", date: "21 Dec" },
  "22": { title: "TypeScript", date: "22 Dec - 24 Dec" },
  "25": { title: "App Design", date: "25 Dec - 27 Dec" },
};

const Calendar = () => {
  const [events, setEvents] = useState(initialEvents);

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
                    <div className="group h-16 w-full flex-grow cursor-pointer py-1 md:h-30">
                      <div className="event invisible absolute left-2 z-99 mb-1 flex w-[200%] flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left opacity-0 group-hover:visible group-hover:opacity-100 dark:bg-meta-4 md:visible md:w-[90%] h-[50%] xl:h-[40%] md:opacity-100">
                        <span className="event-name text-xs xl:text-sm font-semibold text-black dark:text-white">
                          {events[i + 1].title}
                        </span>
                        <span className="time text-xs xl:text-sm font-medium text-black dark:text-white">
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
