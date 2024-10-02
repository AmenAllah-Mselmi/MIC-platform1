'use client'
import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography, TextField, Button } from '@mui/material'
import Member_card from '../../_MICcomponents/Member_card/Member_card'
import { useMemberStore } from '../../../store/members'

const Page = () => {
  const members = useMemberStore(state => state.members)
  const fetchMembers = useMemberStore(state => state.fetchMembers)
 
  useEffect(() => {
    const loadMembers = async () => {
      await fetchMembers() 
      console.log('Members fetched:', members)
    }

    loadMembers()
  }, [fetchMembers]) 

  return (
    <Container>
      <Typography
        variant='h4'
        component='h1'
        align='center'
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#fff' }}
      >
        Membres du Département
      </Typography>

      {/* Liste des membres */}
      <Grid container spacing={2}>
        {members.length > 0 ? ( // S'assurer qu'il y a des membres avant de les afficher
          members.map((member, index) => (
            <Grid item xs={12} sm={4} md={2} key={index}>
              <Member_card member={member} />
            </Grid>
          ))
        ) : (
          <Typography variant='h6' align='center' sx={{ color: '#fff' }}>
            Aucun membre disponible pour le moment.
          </Typography>
        )}
      </Grid>
    </Container>
  )
}

export default Page