'use client'
import React, { useEffect, useState } from 'react'
import AssignmentCard from '../../_MICcomponents/assignment_UI/AssignmentCard'
import { useAssignmentStore } from './../../../store/MyStore/AssignmentsStore'
import { Grid, Typography } from '@mui/material'
import PaginationComponent from '../../_MICcomponents/PaginationComponent/PaginationComponent'

const Page = () => {
  const assignments = useAssignmentStore(state => state.assignments)
  const fetchAssignments = useAssignmentStore(state => state.fetchAssignments)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5 // Nombre d'éléments par page

  useEffect(() => {
    const loadAssignments = async () => {
      await fetchAssignments('6701e0b0a401fa3076754383') // ID de département
    }

    loadAssignments()
  }, [fetchAssignments])

  // Calculer les assignments à afficher pour la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentAssignments = assignments.slice(
    indexOfFirstItem,
    indexOfLastItem
  )

  const handlePageChange = newPage => {
    setCurrentPage(newPage)
  }

  return (
    <div className='container mx-auto w-11/12
    '>
      <Grid container spacing={2}>
        {currentAssignments.length > 0 ? (
          currentAssignments.map(assignment => (
            <Grid item xs={12} key={assignment._id}>
              <AssignmentCard
                assignment={{
                  _id: assignment._id,
                  Title: assignment.Title,
                  DueDate: assignment.DueDate,
                  description: assignment.Description,
                  Attachments: assignment.Attachments
                }}
              />
            </Grid>
          ))
        ) : (
          <Typography variant='h6' align='center' sx={{ color: '#fff' }}>
            Aucun assignment disponible pour le moment.
          </Typography>
        )}
      </Grid>

      {/* Pagination */}
      <PaginationComponent
        currentPage={currentPage}
        totalItems={assignments.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default Page
