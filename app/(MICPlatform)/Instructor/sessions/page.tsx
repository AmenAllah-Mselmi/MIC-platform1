'use client'
import * as React from 'react'
import {
  Grid,
  Button,
  useTheme,
  useMediaQuery,
  Box,
  Typography
} from '@mui/material'
import EnhancedTable from '../../_MICcomponents/Admin_UI/TableComponent/TableComponent'
import { toast } from 'react-toastify'
import UserForm from '../../_MICcomponents/Admin_UI/Form/UserForm'
import { useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'
import PaginationComponent from '../../_MICcomponents/PaginationComponent/PaginationComponent'
import { useSessionsStore } from '@/app/store/MyStore/SessionsStore'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import SessionCard from '../../_MICcomponents/Instructor_UI/SessionCard/SessionCard'
import { Session } from '@/app/store/Models/Session'

const Page: React.FC = () => {
  const sessions = useSessionsStore(state => state.sessions)
  const fetchSessions = useSessionsStore(state => state.fetchSessions)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5) // Nombre d'éléments par page

  useEffect(() => {
    const loadSessions = async () => {
      await fetchSessions('670792e3ee0e13424434d371')
      console.log('Sessions fetched:', sessions)
    }

    loadSessions()
  }, [fetchSessions])

  // Calculer les éléments pour la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentSessions = sessions
    ? sessions.slice(indexOfFirstItem, indexOfLastItem)
    : []

  const handlePageChange = newPage => {
    setCurrentPage(newPage)
  }
  const [editingSession, setEditingSession] = useState<Session | null>(null)
  const handleEditSession = (id: string | number) => {
    const session = sessions.find(session => session._id === id)
    if (session) {
      setEditingSession(session)
      console.log(session)
      console.log(editingSession)
    }
  }

  const handleDeleteSession = async (id: string) => {
    try {
      await deleteSession(id)
      toast.success('Session supprimée avec succès', {
        position: 'bottom-center'
      })
      await fetchSessions() // Refresh sessions after deletion
    } catch (error) {
      toast.error('Erreur lors de la suppression de la session', {
        position: 'bottom-center'
      })
    }
  }

  // Définition des colonnes pour la table des sessions
  const headCells = [
    { id: '_id', numeric: false, disablePadding: true, label: 'ID' },
    { id: 'Title', numeric: false, disablePadding: true, label: 'Titre' },
    {
      id: 'Description',
      numeric: false,
      disablePadding: true,
      label: 'Description'
    },
    {
      id: 'Instructor',
      numeric: false,
      disablePadding: false,
      label: 'Instructor'
    },
    { id: 'Date', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'Room', numeric: false, disablePadding: false, label: 'Room' }
  ]

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      {isMobile ? (
        <Box className='container mx-auto mt-20 flex flex-col items-center justify-around'>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 1,
              marginLeft: 1,
              marginRight: 1
            }}
          >
            <Button variant='contained'>filter 1</Button>
            <Button variant='contained'>filter 2</Button>
            <Button variant='contained' startIcon={<AddCircleOutlineIcon />}>
              Add new Session
            </Button>
          </Box>

          {currentSessions && currentSessions.length > 0 ? (
            currentSessions.map(session => (
              <SessionCard
                key={session._id}
                session={session}
                onDelete={() => handleDeleteSession(session._id)}
                onEdit={() => handleEditSession(session._id)}
              />
            ))
          ) : (
            <Typography variant='body1'>No sessions available</Typography>
          )}

          {/* Utiliser le composant de pagination */}
          <PaginationComponent
            currentPage={currentPage}
            totalItems={sessions ? sessions.length : 0}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </Box>
      ) : (
        <Grid container spacing={7} sx={{ margin: 0, padding: 0 }}>
          <Grid item xs={12} md={8} sx={{ margin: 0, padding: 0 }}>
            <EnhancedTable
              data={sessions} // Utiliser les sessions au lieu des membres
              headCells={headCells} // Utiliser les colonnes de sessions
              title='List of Sessions' // Titre adapté
              onDelete={handleDeleteSession} // Fonction de suppression de session
              renderRowActions={row => (
                <Button
                  variant='outlined'
                  onClick={() => handleEditSession(row._id)}
                >
                  Éditer
                </Button>
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ marginTop: { xs: 3, md: 0 }, padding: 0 }}
          >
            <p> en attendant le formulaire ici </p>
            {/* Si vous avez un formulaire de session à placer */}
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default Page
