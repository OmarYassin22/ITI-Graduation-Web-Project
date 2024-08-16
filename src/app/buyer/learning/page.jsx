import React from 'react'
import BuyerNavbar from '../Components/BuyerNavbar/BuyerNavbar'
import BuyerNavbar2 from '../Components/BuyerNavbar2/BuyerNavbar2'

const Learning = () => {
  return (
    <>
      <BuyerNavbar></BuyerNavbar>
      <BuyerNavbar2></BuyerNavbar2>
      <div className="px-20 py-12 mb-60">
        <h1 className='text-4xl text-black dark:text-white mt-4'>You Don&apos;t have any courses!!</h1>
      </div>
    </>
  )
}

export default Learning