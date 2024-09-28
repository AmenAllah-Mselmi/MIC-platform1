'use client'

import Image from 'next/image'
import React from 'react'
<<<<<<< HEAD:app/(MICPlatform)/_MICcomponents/assignement_card/assignement_card.tsx
import person from "../../../../public/images/Member/person.jpg"
const assignement_card = () => {
  return (
    <div className='flex flex-col flex-wrap bg-white rounded-lg mb-4 mt-4  w-11/12 mx-auto h-fit p-5'>
    <div className='flex items-center'>
        <Image src={person}  alt="Person" className='rounded-full mr-4 w-12 h-12'/>
=======
import { useDisclosure, Button } from '@nextui-org/react'
import AssignmentModal from './AssignmentModal'
export default function AssignmentCard() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <div className='mx-auto mb-4 mt-4 flex h-fit w-1/2 flex-col flex-wrap rounded-lg bg-white p-5'>
      <div className='flex items-center'>
        <Image
          src={'/images/Member/MemberBackground.png'}
          alt='Person'
          className='mr-4 h-12 w-12 rounded-full'
          width={48}
          height={48}
        />
>>>>>>> 6e4941267db4a7cee61c218f24a6c92698bdc7f3:app/(MICPlatform)/_MICcomponents/assignment_UI/AssignmentCard.tsx
        <div>
            <h5 className='font-extrabold'>Instructor</h5>
            <h6 className='text-gray-500 text-tiny'>20 sep</h6>
        </div>
<<<<<<< HEAD:app/(MICPlatform)/_MICcomponents/assignement_card/assignement_card.tsx
    </div>
    <p className='font-extrabold text-justify'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam eligendi neque reiciendis sunt laborum nobis.</p>
    <div className='flex justify-end items-center h-11'>
        <button className='flex items-center justify-center rounded-full  bg-MIC text-white cursor-pointer h-full w-32'>See More</button>
    </div>
    </div>
  )
}
export default assignement_card
=======
      </div>
      <p className='text-justify font-extrabold'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam
        eligendi neque reiciendis sunt laborum nobis.
      </p>
      <div className='flex h-11 items-center justify-end'>
        <Button
          onPress={onOpen}
          className='flex h-full w-32 cursor-pointer items-center justify-center rounded-full bg-MIC text-white'
        >
          See More
        </Button>
      </div>
      <AssignmentModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  )
}
>>>>>>> 6e4941267db4a7cee61c218f24a6c92698bdc7f3:app/(MICPlatform)/_MICcomponents/assignment_UI/AssignmentCard.tsx
