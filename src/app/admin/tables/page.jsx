'use client'
import Breadcrumb from "../../../components/adminComponents/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../../components/adminComponents/Layouts/DefaultLayout";
import Student from "../../../components/adminComponents/Tables/Student";
import Instractor from "../../../components/adminComponents/Tables/Instractor";
import { useState } from "react";

const TablesPage = () => {
const [active,setActive]=useState("Student")
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />
      <div className=" mb-3">
      <button onClick={()=> setActive("Instractor")} className="bg-slate-200 text-black p-2 mr-5 dark:text-slate-400 duration-300 dark:bg-slate-800 dark:hover:text-white hover:bg-slate-300 ">instractor</button>
      <button onClick={()=> setActive("Student")} className="p-2 dark:bg-slate-800 dark:text-slate-400 duration-300 dark:hover:text-white hover:bg-slate-300 bg-slate-200 text-black ">student</button>
      </div>
      <div className="flex flex-col gap-10">
        {active === "Instractor" && <Instractor/>}
        {active === "Student" && <Student />}
        
        
        {/* <TableTwo /> */} 
        {/* <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
