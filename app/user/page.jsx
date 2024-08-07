import React from 'react';
import { FaStar } from 'react-icons/fa';
import Image from 'next/image'; 
import img1 from '/public/images/cu-1.webp';
import img2 from '/public/images/cu-2.webp';
import img3 from '/public/images/cu-3.webp';
import img4 from '/public/images/cu-4.webp';
import img5 from '/public/images/cu-5.webp';
import img6 from '/public/images/cu-6.webp';

function UserPage() {
  return (
    <div className="container mx-auto px-4">
      {/* Introduction Section */}
      <div className='my-14'>
        <div className="test mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2 m-auto">
          <div className="text w-full md:w-auto mt-10 ml-auto">
            <h2 className=" text-xl">Grow Your Skills In <span className="text-blue-700 font-bold">Few Minutes</span></h2>
            <p className='max-w-96'>
              We are accredited with the Most Lorem ipsum dolor sit amet consectetur adipisicing elit Illumin
              We are accredited with the Most Lorem ipsum dolor sit amet consectetur adipisicing elit Illumin
            </p>
          </div>
          <div className="w-full md:w-auto mr-auto">
            <Image src="/images/13.jpg" className="border rounded-xl" alt="User" width={350} height={300} />
          </div>
        </div>
      </div>

      {/* Background Image Section */}
      <div className='relative h-72 bg-cover bg-center bg-no-repeat my-20 bg-fixed' style={{ backgroundImage: 'url(/images/bg-img.jpg)' }}>
          <div className=" overlay rounded-xl absolute top-0 left-0 opacity-60 h-full w-full bg-blue-900"></div>
        <div className='text-white absolute inset-0 flex flex-col items-center justify-center text-center'>
          <h2 className='text-4xl font-bold'>Your Text Here</h2>
          <p className='text-lg'>Additional text or description can go here.</p>
        </div>
      </div>

      {/* Popular Courses Section */}
      <div className="Popular my-20">
        <h2 className='font-bold text-4xl mb-5'>Most Popular Courses</h2>
        <div className="cards-course text-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          <div className="relative w-full h-80 flex items-end p-5 bg-cover bg-center bg-no-repeat  rounded-xl hover:scale-105 duration-500" style={{ backgroundImage: `url(${img1.src})` }}>
          <div className=" overlay rounded-xl absolute top-0 left-0 opacity-50 h-full w-full bg-slate-900"></div>
            <div className="relative z-10 text-white">
              <div className="card-content">
                <h3 className='font-bold mb-2'>Business Analytics</h3>
 <span className=' flex'>
          <FaStar className="text-yellow-400" /> <span>4.7</span>
        </span>              </div>
            </div>
          </div>
          <div className="relative rounded-xl w-full h-80 flex items-end p-5 bg-cover bg-center bg-no-repeat hover:scale-105 duration-500" style={{ backgroundImage: `url(${img2.src})` }}>
          <div className="overlay rounded-xl absolute top-0 left-0 opacity-50 h-full w-full bg-slate-900"></div>
            <div className="relative z-10 text-white">
              <div className="card-content">
                <h3 className='font-bold mb-2'>AI Product Manager</h3>
                 <span className=' flex'>
          <FaStar className="text-yellow-400" /> <span>4.7</span>
        </span>             </div>
            </div>
          </div>
          <div className="relative rounded-xl hover:scale-105 duration-500 w-full h-80 flex items-end p-5 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${img3.src})` }}>
          <div className="overlay rounded-xl absolute top-0 left-0 opacity-50 h-full w-full bg-slate-900"></div>
            <div className="relative z-10 text-white">
              <div className="card-content">
                <h3 className='font-bold mb-2'>Data Engineering With AWS</h3>
                <span className=' flex'>
          <FaStar className="text-yellow-400" /> <span>4.7</span>
        </span>             </div>
            </div>
          </div>
          <div className="relative rounded-xl hover:scale-105 duration-500 w-full h-80 flex items-end p-5 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${img4.src})` }}>
          <div className="overlay rounded-xl absolute top-0 left-0 opacity-50 h-full w-full bg-slate-900"></div>
            <div className="relative z-10 text-white">
              <div className="card-content">
                <h3 className='font-bold mb-2'>Digital Marketing</h3>
             <span className=' flex'>
          <FaStar className="text-yellow-400" /> <span>4.7</span>
        </span>       
             </div>
            </div>
          </div>
          <div className="relative rounded-xl hover:scale-105 duration-500 w-full h-80 flex items-end p-5 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${img5.src})` }}>
          <div className="overlay rounded-xl absolute top-0 left-0 opacity-50 h-full w-full bg-slate-900"></div>
            <div className="relative z-10 text-white">
              <div className="card-content">
                <h3 className='font-bold mb-2'>AI Programming with Python</h3>
                <span className=' flex'>
          <FaStar className="text-yellow-400" /> <span>4.7</span>
        </span>
              </div>
            </div>
          </div>
          <div className="relative rounded-xl hover:scale-105 duration-500 w-full h-80 flex items-end p-5 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${img6.src})` }}>
          <div className="overlay rounded-xl absolute top-0 left-0 opacity-50 h-full w-full bg-slate-900"></div>
            <div className="relative z-10 text-white">
              <div className="card-content">
                <h3 className='font-bold mb-2'>Product Manager</h3>
                <span className=' flex'>
          <FaStar className="text-yellow-400" /> <span>4.7</span>
        </span>
              </div>
            </div>
          </div>
        </div>
</div>
        {/* Card Grid Section */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container'>
          <div className="cards w-full">
            <Image src="/images/card-1.jpg" className='border rounded-xl w-full' alt="Card" width={300} height={300} />
            <h2 className='font-bold mt-2'>Static Word</h2>
            <p className='max-w-80'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque quo</p>
          </div>
          <div className="cards w-full">
            <Image src="/images/card-2.jpg" className='border rounded-xl w-full' alt="Card" width={300} height={300} />
            <h2 className='font-bold mt-2'>Static Word</h2>
            <p className='max-w-80'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque quo</p>
          </div>
           <div className="cards w-full">
            <Image src="/images/card-1.jpg" className='border rounded-xl w-full' alt="Card" width={300} height={300} />
            <h2 className='font-bold mt-2'>Static Word</h2>
            <p className='max-w-80'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque quo</p>
          </div>
        </div>
      
    </div>
  );
}

export default UserPage;
