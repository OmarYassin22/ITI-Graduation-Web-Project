"use client";
import React, { useState } from 'react'
import Image from 'next/image';
import Contact from "../Contact/page";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


function About() {
  const [location, setLocation] = useState({
    lat: 30.475815373448597,
    lng: 31.197868152742487
  });
  const containerStyle = {
    width: '50vw',
    height: '50vh'
  };
  let center = location;
  const handleLocation = (eventData) => {
    if (eventData.target.value == "Benha") {
      setLocation({
        lat: 30.475815373448597,
        lng: 31.197868152742487
      });
    } else if (eventData.target.value == "Alex") {
      setLocation({
        lat: 31.19278681868581,
        lng: 29.90618575462181
      });
    } else if (eventData.target.value == "smart") {
      setLocation({
        lat: 30.07126053127538,
        lng: 31.020813403005693
      });
    } else if (eventData.target.value == "Menoufia") {
      setLocation({
        lat: 30.558084283809457,
        lng: 31.0189111305105
      });
    }
  }
  return (
    <>
      <div className="text-blue-700 text-5xl mt-5 text-center">
        About Us
      </div>
      <div className="grid grid-cols-4 gap-2 mt-5 mb-5 place-items-center pl-20">
        <div className="col-span-2 text-2xl container">
          At E-learning, we believe that learning should be accessible, engaging, and empowering for everyone, no matter where they are in the world. Our e-learning platform is designed to provide you with high-quality educational content that fits into your life, helping you achieve your goals at your own pace.
        </div>
        <div className="col-span-2">
          <Image
            src="/images/About-Image2.jpg"
            width={500}
            height={500}
            alt="About-Page image2"
            className="border rounded-xl items-center"
          />
        </div>
      </div>
      <div className="text-blue-700 text-5xl mt-5 text-center">
        Our Mission
      </div>
      <div className="grid grid-cols-4 gap-2 mt-10 place-items-center pr-20">
        <div className="col-span-2">
          <Image
            src="/images/About-Image.jpg"
            width={500}
            height={500}
            alt="About-Page image"
            className="border rounded-xl items-center"
          />
        </div>
        <div className="col-span-2 text-2xl container">
          Our mission is simple: to democratize education by providing affordable and flexible learning opportunities to people everywhere. Whether you're looking to develop new skills, advance in your career, or simply learn something new, we are here to support you on your journey.
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-20">
        <label htmlFor="countries" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white ">Select a branch</label>
        <select id="countries" onChange={(e) => { handleLocation(e) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-96 flex justify-center items-center">
          <option value="choose" disabled>Choose a branch</option>
          <option value="Benha">Benha</option>
          <option value="Alex">Alex</option>
          <option value="smart">Smart Village</option>
          <option value="Menoufia">Menoufia</option>
        </select>
      </div>
      <div className="mt-10 text-center flex justify-center items-center">
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  )
}

export default About;