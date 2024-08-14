"use client";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../../components/Layouts/DefaultLayout";
// import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import Link from "next/link";

// يمكنك إعادة تعريف الـ Metadata إذا كنت تحتاج إلى ذلك
// export const metadata = {
//   title: "Next.js Add Constructors",
//   description: "This is the Add Constructors page",
// };

const FormElements = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add New Constructors" />
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-115 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Input Constructor Info
            </h3>
          </div>
          <div className="flex w-full flex-col gap-5.5 p-6.5">
            <form className="max-w-sm">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Instructor Name
                </label>
                <input
                  type="text"
                  placeholder="Instructor Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 mt-3 block text-sm font-medium text-black dark:text-white">
                  Instructor Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 mt-3 block text-sm font-medium text-black dark:text-white">
                  Instructor Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Instructor Phone Number"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 mt-3 block text-sm font-medium text-black dark:text-white">
                  Instructor Field
                </label>
                <input
                  type="text"
                  placeholder="Instructor Field"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <br />
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 sm:w-auto"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormElements;
