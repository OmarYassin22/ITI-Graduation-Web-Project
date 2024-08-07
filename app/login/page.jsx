"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

function Page() {
  let router = useRouter();
  let [loading, setLoading] = useState(false);

  async function login(values) {
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        values
      );
      console.log(res);
      router.push("/user");
    } catch (error) {
      console.error(error);
      setLoading(false);
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
    onSubmit: login,
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center p-4">
      <div className="bg-white text-gray-900 rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          {/* <img className='w-16 mx-auto' src="src/logo.jpeg" alt="logo" /> */}
          <h2 className="text-3xl font-extrabold text-gray-800">Hello!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome to Courses, Please log in.
          </p>
        </div>
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-sm text-red-600">{formik.errors.email}</div>
            ) : null}
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-sm text-red-600">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div>
            <button
              disabled={loading}
              type="submit"
              className="flex justify-center py-2 px-4 border border-transparent w-full text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
