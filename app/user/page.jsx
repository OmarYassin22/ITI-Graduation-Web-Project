import React from 'react'
import Image from 'next/image'; 

function UserPage() {
  return (
    <div  className="container mx-auto px-4">
          <div className='my-14'>
     <div className="test mt-10 grid grid-cols-1 md:grid-cols-2 container gap-4 md:gap-2 m-auto ">
      <div className="text w-full md:w-auto mt-10 ml-auto">
        <h2 className="">Grow Your Skills In <span className="text-blue-700 font-bold">Few Minutes</span></h2>
        <p className='max-w-96'>
          We are an accredited with the Most Lorem ipsum dolor sit amet consectetur adipisicing elit Illumin
          We are an accredited with the Most Lorem ipsum dolor sit amet consectetur adipisicing elit Illumin
        </p>
      </div>
      <div className="w-full md:w-auto mr-auto">
        <Image src="/images/13.jpg" className="border rounded-xl" alt="User" width={350} height={300} />
      </div>
    </div>
      <div className=' relative h-72 bg-cover bg-center bg-no-repeat my-20 bg-fixed' style={{ backgroundImage: 'url(/images/bg-img.jpg)' }}>
        <div className=' text-white absolute inset-0 flex flex-col items-center justify-center text-center'>
          <h2 className=' text-4xl font-bold'>Your Text Here</h2>
          <p className=' text-lg'>Additional text or description can go here.</p>
        </div>
      </div>
       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container'>
      <div className="cards w-full">
        <Image src="/images/card-1.jpg" className='border rounded-xl w-full' alt="Card" width={300} height={300}/>
        <h2 className='font-bold mt-2'>Static Word</h2>
        <p className='max-w-80'>Lorem ipsum dolor sit, amet site consectetur adipisicing elit. Cumque quo</p>
      </div>
      <div className="cards w-full">
        <Image src="/images/card-2.jpg" className='border rounded-xl w-full' alt="Card" width={300} height={300}/>
        <h2 className='font-bold mt-2'>Static Word</h2>
        <p className='max-w-80'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque quo</p>
      </div>
      <div className="cards w-full">
        <Image src="/images/card-1.jpg" className='border rounded-xl w-full' alt="Card" width={300} height={300}/>
        <h2 className='font-bold mt-2'>Static Word</h2>
        <p className='max-w-80'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque quo</p>
      </div>
    </div>
    </div>
    </div>
  )
}

export default UserPage