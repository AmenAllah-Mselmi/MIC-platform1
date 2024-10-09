'use client'

import Image from 'next/image'
import React from 'react'
import { useDisclosure, Button } from '@nextui-org/react'
import AssignmentModal from './AssignmentModal'

// Component: AssignmentCard
interface AssignmentCardProps {
  assignment: {
    _id: string
    Title: string
    DueDate: string
    description: string
    Attachments: string[]
  }
}

export default function AssignmentCard({ assignment }: AssignmentCardProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <div className='mx-auto mb-4 mt-4 flex h-fit w-11/12 flex-col flex-wrap rounded-lg bg-white p-5'>
      <div className='flex items-center'>
        <Image
          src={'/images/Member/MemberBackground.png'}
          alt='Person'
          className='mr-4 h-12 w-12 rounded-full'
          width={48}
          height={48}
        />
        <div>
          <h5 className='font-extrabold'>{assignment.Title}</h5>
          <h6 className='text-sm text-gray-500'>{assignment.DueDate}</h6>
        </div>
      </div>

      <p className='mt-2 text-justify font-extrabold'>
        {assignment.description}
      </p>

      <div className='flex h-11 items-center justify-end'>
        <Button
          onPress={onOpen}
          className='flex h-full w-32 cursor-pointer items-center justify-center rounded-full bg-MIC text-white'
        >
          See More
        </Button>
      </div>

      <AssignmentModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        instructor={assignment.Title}
        date={assignment.DueDate}
        content={assignment.description}
        resources={assignment.Attachments}
        imageUrl='/images/Member/JohnDoe.png'
        placeholder='Submit your github repo link here'
      />
    </div>
  )
}
