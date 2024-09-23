import Image from 'next/image'
import React from 'react'
import person from "../../../../public/images/Member/person.jpg"
const assignement_card = () => {
  return (
    <div className='flex flex-col flex-wrap bg-white rounded-lg mb-4 mt-4  w-11/12 mx-auto h-fit p-5'>
    <div className='flex items-center'>
        <Image src={person}  alt="Person" className='rounded-full mr-4 w-12 h-12'/>
        <div>
            <h5 className='font-extrabold'>Instructor</h5>
            <h6 className='text-gray-500 text-tiny'>20 sep</h6>
        </div>
    </div>
    <p className='font-extrabold text-justify'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam eligendi neque reiciendis sunt laborum nobis.</p>
    <div className='flex justify-end items-center h-11'>
        <button className='flex items-center justify-center rounded-full  bg-MIC text-white cursor-pointer h-full w-32'>See More</button>
    </div>
    </div>
  )
}

export default assignement_card
