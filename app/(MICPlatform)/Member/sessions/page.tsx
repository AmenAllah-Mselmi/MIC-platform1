'use client'
import React, { useEffect, useState } from 'react'
import EventCard from '../../_MICcomponents/session_card/session_card'
import { useSessionsStore } from '../../../store/MyStore/SessionsStore'

import { Box, Typography } from '@mui/material'
import PaginationComponent from '../../_MICcomponents/PaginationComponent/PaginationComponent'

const Page = () => {
  const sessions = useSessionsStore(state => state.sessions)
  const fetchSessions = useSessionsStore(state => state.fetchSessions)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5) // Nombre d'éléments par page

  useEffect(() => {
    const loadSessions = async () => {
      await fetchSessions('6701e0b0a401fa3076754383')
      console.log('Members fetched:', sessions)
    }

    loadSessions()
  }, [fetchSessions])

  // Calculer les éléments pour la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentSessions = sessions.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = newPage => {
    setCurrentPage(newPage)
  }

  return (
    <Box className='container mx-auto flex flex-col items-center justify-around'>
      {currentSessions && currentSessions.length > 0 ? (
        currentSessions.map((session, index) => (
          <EventCard session={session} key={index} />
        ))
      ) : (
        <Typography variant='body1'>No sessions available</Typography>
      )}

      {/* Utiliser le composant de pagination */}
      <PaginationComponent
        currentPage={currentPage}
        totalItems={sessions.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </Box>
  )
}

export default Page
