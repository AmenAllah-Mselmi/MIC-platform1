'use client'
import React, { useEffect } from 'react'
import AssignmentCard from '../../_MICcomponents/assignment_UI/AssignmentCard'
import { useAssignmentStore } from '@/app/store/MyStore/AssignmentsStore'
import { Grid, Typography } from '@mui/material'
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
      <Grid container spacing={2}>
        {assignments.length > 0 ? ( // S'assurer qu'il y a des membres avant de les afficher
          assignments.map((assignment, index) => (
            <AssignmentCard
              key={assignment._id}
              assignment={{
                _id: assignment._id,
                Title: assignment.Title,
                DueDate: assignment.DueDate,
                description: assignment.Description,
                Attachments: assignment.Attachments
              }}
            />
          ))
        ) : (
          <Typography variant='h6' align='center' sx={{ color: '#fff' }}>
            Aucun assignment disponible pour le moment.
          </Typography>
        )}
      </Grid>
    </div>
  )
}

export default Page
