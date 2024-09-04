"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SidebarItem from "./SidebarItem";
import useLocalStorage from "../../../hooks/useLocalStorage"
import ClickOutside from "../../instructorComponents/ClickOutside";

// interface SidebarProps {
//   sidebarOpen: boolean;
//   setSidebarOpen: (arg: boolean) => void;
// }

const menuGroups = [
    {
      name: "MENU",
      menuItems: [
        {
          icon: (
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6 0 3.31 2.69 6 6 6s6-2.69 6-6c0-3.31-2.69-6-6-6zm1 9h-2v-2h2v2zm0-4h-2V7h2v2z"
                fill="currentColor"
              />
            </svg>
          ),
          label: "About",
          route: "/user/About",
        },
        {
          icon: (
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-11h2v6h-2zm0-4h2v2h-2z"
                fill="currentColor"
              />
            </svg>
          ),
          label: "Contact",
          route: "/user/Contact",
        },
      ],
    },
  ];
const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const pathname = usePathname();
    const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");
    return (
        <ClickOutside onClick={() => setSidebarOpen(false)}>
            <aside
                className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "hidden"
                    }`}
            >
                <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                    <Link href="/">
                    </Link>
                </div>
                <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                    <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
                        {menuGroups.map((group, groupIndex) => (
                            <div key={groupIndex}>
                                <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                                    {group.name}
                                </h3>
                                <ul className="mb-6 flex flex-col gap-1.5">
                                    {group.menuItems.map((menuItem, menuIndex) => (
                                        <SidebarItem
                                            key={menuIndex}
                                            item={menuItem}
                                            pageName={pageName}
                                            setPageName={setPageName}
                                        />
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </div>
            </aside>
        </ClickOutside>
    );
};
export default Sidebar;
