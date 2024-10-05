'use client'

import Image from 'next/image'
import React from 'react'
import { useDisclosure, Button } from '@nextui-org/react'
import AssignmentModal from './AssignmentModal'

// Component: AssignmentCard
export default function AssignmentCard() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  
  return (
    <div className='mx-auto mb-4 mt-4 flex h-fit w-11/12  flex-col flex-wrap rounded-lg bg-white p-5'>
      <div className='flex items-center'>
        <Image
          src={'/images/Member/MemberBackground.png'}
          alt='Person'
          className='mr-4 h-12 w-12 rounded-full'
          width={48}
          height={48}
        />
        <div>
          <h5 className='font-extrabold'>Instructor</h5>
          <h6 className='text-gray-500 text-sm'>20 Sep</h6>
        </div>
      </div>

      <p className='text-justify font-extrabold mt-2'>
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
