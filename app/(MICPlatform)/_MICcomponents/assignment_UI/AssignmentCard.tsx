'use client'

import Image from 'next/image'
import React, { useEffect } from 'react'
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
  onEdit: (id: string) => void; // Prop for edit handler
  onDelete: (id: string) => void; // Prop for delete handler
}

export default function AssignmentCard({ assignment, onEdit, onDelete }: AssignmentCardProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const HandleNavigate = (id: string, event: React.MouseEvent) => {
    console.log('test id ', id)
    event.preventDefault() // Empêche la navigation par défaut

    localStorage.setItem('selectedAssignmentId', id)
    window.location.href = '/Instructor/responses'
  }
  useEffect(() => {
    // Récupère l'ID de l'assignement du localStorage dans la page de destination
    const selectedId = localStorage.getItem('selectedAssignmentId')
    console.log('Updated selectedAssignmentId:', selectedId)
  }, [])

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
        assignmentId={assignment._id}
        date={assignment.DueDate}
        content={assignment.description}
        resources={assignment.Attachments}
        imageUrl='/images/Member/JohnDoe.png'
        placeholder='Submit your github repo link here'
      />
    </div>
  )
}
