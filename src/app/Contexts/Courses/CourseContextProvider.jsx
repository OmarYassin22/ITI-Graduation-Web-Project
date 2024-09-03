"use client";
import axios from "axios";
import React, { memo, useEffect, useMemo, useState } from "react";
import { createContext } from "react";
export const courseContext = createContext();
const func = () => {
  console.log('func called');
}
const CourseContextProvider = ({ children }) => {
  console.log("course context provider");
  const [localCourse, setLocalCourse] = useState();
  useEffect(() => {
    axios
      .get("/api/courses")
      .then((response) => {
        if (response.data) {
          setLocalCourse(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  const obj = useMemo(
    () => ({
      localCourse,
      setLocalCourse,
    }),
    [localCourse]
  );

  return (
    <courseContext.Provider value={obj}>{children}</courseContext.Provider>
  );
};

export default memo(CourseContextProvider);
