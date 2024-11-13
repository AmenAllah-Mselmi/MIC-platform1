'use client'

import React, { useEffect, useState } from 'react'
import { useResponseStore } from '@/app/store/MyStore/ResponseStore'
import type { ResponseForInstructor } from '@/app/store/Models/Response'
import { Box, Typography, Button, Grid, Modal } from '@mui/material'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import { styled } from '@mui/material/styles'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import SendIcon from '@mui/icons-material/Send'
import EmailModal from '../../_MICcomponents/Instructor_UI/EmailModal'

// Styles d'accordéon personnalisés
const Accordion = styled(MuiAccordion)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&::before': {
    display: 'none'
  }
}))

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
  }
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}))

const handleSendEmail = formData => {
  console.log('Sending email with data:', formData)
  // Appelle l'API pour envoyer l'email avec les données de formData
}

const Page: React.FC = () => {
  const [assignmentId, setAssignmentId] = useState(null)
  const { responses, fetchResponses } = useResponseStore()
  const [expanded, setExpanded] = useState<string | false>(false)
  const [open, setOpen] = useState(false)
  const [selectedResponse, setSelectedResponse] =
    useState<ResponseForInstructor | null>(null)

  const handleOpen = (response: ResponseForInstructor) => {
    setSelectedResponse(response)
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  useEffect(() => {
    const selectedId = localStorage.getItem('selectedAssignmentId')
    console.log(selectedId)
    if (selectedId) {
      setAssignmentId(selectedId)
      // Effectue d'autres actions, comme récupérer les détails de l'assignement
    }

    const fetchData = async () => {
      try {
        await fetchResponses(selectedId)
      } catch (error) {
        console.error('Erreur lors de la récupération des réponses', error)
      }
    }
    fetchData()
  }, [fetchResponses])

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
    }

  const handleUpdateStatus = async (responseId: string) => {
    try {
      //await updateResponseStatus(responseId)
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut', error)
    }
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {responses.map((response: ResponseForInstructor, index: number) => (
          <Grid item xs={12} sm={6} md={2} key={response._id}>
            <Accordion
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
            >
              <AccordionSummary
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography>{response.Member.NomPrenom}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <strong>Content:</strong> {response.Content}
                  <br />
                  <strong>Status:</strong>
                  <br />
                  {response.status === 'AWAITING FOR REVIEW' ? (
                    <Button variant='outlined' color='error'>
                      Awaiting for Review
                    </Button>
                  ) : (
                    <Box display='flex' justifyContent='center'>
                      <Button variant='outlined' color='success'>
                        Success
                      </Button>
                    </Box>
                  )}
                  <strong>Created At:</strong>
                  {new Date(response.createdAt).toLocaleString()}
                  <br />
                  <Box display='flex' justifyContent='center' mt={2}>
                    <Button
                      variant='contained'
                      onClick={() => handleOpen(response)}
                    >
                      Send comment
                    </Button>
                  </Box>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>

      {/* Modal Component */}
      <EmailModal
        emailMember={selectedResponse?.Member?.Email || null}
        open={open}
        handleClose={handleClose}
        handleSendEmail={handleSendEmail}
      />
    </Box>
  )
}

export default Page
