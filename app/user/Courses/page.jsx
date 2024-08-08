"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function Courses() {
  const [name, setName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [period, setPeriod] = useState("");
  const [img, setImg] = useState("");
  //post course with images
  const handleSumbit = async (e) => {
    e.preventDefault();
    const res = axios.post("../../api/course", {
      name,
      instructor,
      period,
      img,
    });
  };
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("/api/course")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
      });
  }, []);

  return (
    <div style={{ height: "1000px" }}>
      <h1>sadasdas</h1>

      <form action="" method="POST" onSubmit={handleSumbit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        />
        <input
          type="text"
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
          placeholder="instructor"
        />
        <input
          type="period"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          placeholder="period"
        />
        <input
          type="file"
          onChange={(e) => setImg(e.target.files[0])}
          placeholder="name"
        />
        <input
          type="file"
          name=""
          id=""
          onChange={(e) => setImg(e.target.files[0])}
        />
        <button type="submit">add</button>
      </form>
      {courses.data?.forEach((course) => (
        <div> {course.data}</div>
      ))}
      {courses.forEach((course) => (
        <Image
          src={course.data.imgPath}
          className="border rounded-xl w-full"
          alt="Card"
          width={300}
          height={300}
        />
      ))}
    </div>
  );
}

export default Courses;
