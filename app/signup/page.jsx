"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axios from "axios";

function Page() {
  let router = useRouter();

  async function register(values) {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/signup",
        values
      );
      console.log(res.data);
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("email is required and  writen  as moh.eha@gmail.com")
        .matches(
          /^\w{3,}.?\w{3,}?@(\w{3,}).(\w{3,})$/i,
          "email is required and  writen  as moh.eha@gmail.com"
        ),
      password: Yup.string()
        .required(
          "password is required and sould have from 6-10 number and capital &small liter"
        )
        .matches(
          /^\d{6,10}[A-Z]{1}[a-z]{1}$/i,
          "password sould have from 6-10 number and capital &small liter"
        ),
    }),
    onSubmit: register,
  });

  return (
    <div className="flex h-1/2 m-auto items-center justify-center">
      <div className="w-1/2 max-w-md flex flex-col h-full m-auto bg-slate-200 p-10 mx-auto shadow-lg shadow-indigo-500/50 space-y-4">
        <h3 className="mx-auto text-4xl my-3">Register</h3>
        <form onSubmit={formik.handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 my-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
               
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
               
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </label>
          {formik.touched.email && formik.errors.email ? (
            <div role="alert" className="alert alert-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 shrink-0 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>{formik.errors.email}</span>
            </div>
          ) : null}

          <label className="input input-bordered flex items-center gap-2 my-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </label>
          {formik.touched.password && formik.errors.password ? (
            <div role="alert" className="alert alert-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 shrink-0 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>{formik.errors.password}</span>
            </div>
          ) : null}
          <button className="btn btn-active btn-secondary my-5">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
