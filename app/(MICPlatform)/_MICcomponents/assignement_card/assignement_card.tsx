import Image from 'next/image'
import React from 'react'
import person from '../../../../public/images/Member/person.jpg'
const assignement_card = () => {
  return (
    <div className='mx-auto mb-4 mt-4 flex h-fit w-1/2 flex-col flex-wrap rounded-lg bg-white p-5'>
      <div className='flex items-center'>
        <Image
          src={person}
          alt='Person'
          className='mr-4 h-12 w-12 rounded-full'
        />
        <div>
          <h5 className='font-extrabold'>Instructor</h5>
          <h6 className='text-tiny text-gray-500'>20 sep</h6>
        </div>
      </div>
      <p className='text-justify font-extrabold'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam
        eligendi neque reiciendis sunt laborum nobis.
      </p>
      <div className='flex h-11 items-center justify-end'>
        <button className='flex h-full w-32 cursor-pointer items-center justify-center rounded-full bg-MIC text-white'>
          See More
        </button>
      </div>
    </div>
  )
}

export default assignement_card
