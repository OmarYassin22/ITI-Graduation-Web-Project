// pages/calendar.jsx
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
  const [editingEvent, setEditingEvent] = useState(null);
  const [recentlyAddedDay, setRecentlyAddedDay] = useState(null);

  const handleEditClick = (day) => {
    const event = events[day] || { title: "", date: "" };
    setEditingEvent({ day, event });
  };

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

  const handleSaveClick = () => {
    console.log('================')
    if (editingEvent) {
      const { title, date } = editingEvent.event;
      if (title.trim() || date.trim()) {
        setEvents((prevEvents) => {
          const updatedEvents = {
            ...prevEvents,
            [editingEvent.day]: editingEvent.event,
          };
          setRecentlyAddedDay(editingEvent.day); // Track the day with the new event
          return updatedEvents;
        });
      }
      setEditingEvent(null);
    }
  };

  const handleDeleteNewClick = () => {
    if (recentlyAddedDay) {
      setEvents((prevEvents) => {
        const { [recentlyAddedDay]: _, ...rest } = prevEvents;
        return rest;
      });
      setRecentlyAddedDay(null);
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
              {/* أيام الأسبوع */}
            </tr>
          </thead>
          <tbody>
            <tr className="grid grid-cols-7">
              {Array.from({ length: 31 }, (_, i) => (
                <td
                  key={i + 1}
                  className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31"
                  onClick={() => handleEditClick((i + 1).toString())}
                >
                  <span className="font-medium text-black dark:text-white">
                    {i + 1}
                  </span>
                  {events[i + 1] && (
                    <div className="group h-16 w-full flex-grow cursor-pointer py-1 md:h-30">
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

        {editingEvent && (
          <div className="bg-gray-800 fixed inset-0 z-99 flex items-center justify-center bg-opacity-50">
            <div className="z-60 relative rounded bg-white p-6 shadow-lg">
              <h3 className="text-lg font-bold">Edit Event</h3>
              <div className="mb-4">
                <label className="text-gray-700 block text-sm font-medium">
                  Event Title
                </label>
                <input
                  type="text"
                  value={editingEvent.event.title}
                  onChange={(e) => handleInputChange(e, "title")}
                  className="border-gray-300 mt-1 block w-full rounded border px-3 py-2 shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-700 block text-sm font-medium">
                  Event Date
                </label>
                <input
                  type="text"
                  value={editingEvent.event.date}
                  onChange={(e) => handleInputChange(e, "date")}
                  className="border-gray-300 mt-1 block w-full rounded border px-3 py-2 shadow-sm"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleSaveClick}
                  className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Save
                </button>
                <button
                  onClick={handleDeleteNewClick}
                  className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Delete New
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
