import React from 'react';
import { CiMobile1 } from 'react-icons/ci';
import { SlEnvolopeLetter } from 'react-icons/sl';
import { BsTelephone } from 'react-icons/bs';
import { CiLocationOn } from "react-icons/ci";
function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full p-4">
        {/* Box 1 */}
        <div className="box-1 flex flex-col justify-center p-6">
          <h4 className="text-lg font-semibold mb-2 text-blue-700">Contact Us</h4>
          <h2 className="text-2xl font-bold mb-4 text-blue-700">How Can I Help You?</h2>
          <p className="mb-4">Fill in the form or drop an email</p>
          <div className="tele space-y-2 grid grid-cols-2 md:grid-cols-1 ">
            <h3 className="flex items-center text-lg">
              <CiMobile1 className="mr-2" /> <span>+1282185755</span>
            </h3>
            <h3 className="flex items-center text-lg">
              <SlEnvolopeLetter className="mr-2" /> <span>exm@gmail.com</span>
            </h3>
            <h3 className="flex items-center text-lg">
              <BsTelephone className="mr-2" /> <span>0483643317</span>
            </h3>
            <h3 className="flex items-center text-lg">
              <CiLocationOn className="mr-2" /> <span>banha.ITI</span>
            </h3>
          </div>
        </div>

        {/* Box 2 */}
        <div className="box-2 flex flex-col justify-center p-6 bg-gray-100 rounded-md shadow-md">
          <form className="space-y-4">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full p-2 border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full p-2 border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="mt-1 block w-full p-2 border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows="4"
                className="mt-1 block w-full p-2 border rounded-md"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-600 duration-300 w-full text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default ContactPage;
