import React, { useEffect, useState } from 'react'
import { Box, Button, Modal, Typography, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useAuthStore } from '@/app/store/MyStore/AuthStore'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

const EmailModal = ({ open, handleClose, handleSendEmail, emailMember }) => {
  // Pre-fill member's email when the modal opens
  useEffect(() => {
    if (emailMember) {
      setMemberEmail(emailMember) // Fill member's email
    }
  }, [emailMember])

  // State to hold form input values
  const [instructorEmail, setInstructorEmail] = useState('')
  const [memberEmail, setMemberEmail] = useState('')
  const [emailSubject, setEmailSubject] = useState('')
  const [emailContent, setEmailContent] = useState('')
  const user = useAuthStore(state => state.user)
  const handleSubmit = () => {
    // Call the handleSendEmail function with the form data
    handleSendEmail({
      instructorEmail,
      memberEmail,
      emailSubject,
      emailContent
    })
    handleClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Send an Email
        </Typography>

        <TextField
          label="Instructor's Email"
          fullWidth
          margin='normal'
          value={instructorEmail}
          onChange={e => setInstructorEmail(e.target.value)}
        />

        <TextField
          label="Member's Email"
          fullWidth
          margin='normal'
          value={memberEmail}
          onChange={e => setMemberEmail(e.target.value)}
        />

        <TextField
          label='Email Subject'
          fullWidth
          margin='normal'
          value={emailSubject}
          onChange={e => setEmailSubject(e.target.value)}
        />

        <TextField
          label='Email Content'
          multiline
          rows={4}
          fullWidth
          margin='normal'
          value={emailContent}
          onChange={e => setEmailContent(e.target.value)}
        />

        <Button
          className='rounded-md bg-gradient-to-r from-secondary to-primary text-white'
          variant='contained'
          onClick={handleSubmit}
          endIcon={<SendIcon />}
          fullWidth
          sx={{ mt: 2 }}
        >
          Send
        </Button>
      </Box>
    </Modal>
  )
}

export default EmailModal
