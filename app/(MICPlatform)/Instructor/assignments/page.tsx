'use client'
import React, { useEffect } from 'react'
import AssignmentCard from '../../_MICcomponents/assignment_UI/AssignmentCard'
import { useAssignmentStore } from '@/app/store/MyStore/AssignmentsStore'
const Page = () => {
  const assignments = useAssignmentStore(state => state.assignments)

  const fetchAssignments = useAssignmentStore(state => state.fetchAssignments)

  useEffect(() => {
    const loadAssignments = async () => {
      await fetchAssignments('6701e0b0a401fa3076754383') // ID de département
    }

    loadAssignments()
  }, [fetchAssignments])
  return (
    <div className=''>
      <AssignmentCard />
      <AssignmentCard />
    </div>
  )
}

export default Page
