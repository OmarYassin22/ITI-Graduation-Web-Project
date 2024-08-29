"use client";
import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { useSidebar } from "../../SidebarContext";

export default function DefaultLayout({ children }) {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  console.log("=========================================");
  console.log(localStorage.setItem("type"));
  console.log(location.href);
  console.log("=========================================");

  return (
    <>
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-1 flex-col lg:ml-72.5">
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
