import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import Member_card from '../../_MICcomponents/Member_card/Member_card';

const Page = () => {
  const members = [
    {
      firstName: 'John',
      lastName: 'Doe',
      className: '3ème année Informatique',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      className: '2ème année Génie Logiciel',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      firstName: 'Alice',
      lastName: 'Johnson',
      className: '1ère année Réseaux',
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      firstName: 'John',
      lastName: 'Doe',
      className: '3ème année Informatique',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      className: '2ème année Génie Logiciel',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      firstName: 'Alice',
      lastName: 'Johnson',
      className: '1ère année Réseaux',
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      firstName: 'John',
      lastName: 'Doe',
      className: '3ème année Informatique',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      className: '2ème année Génie Logiciel',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      firstName: 'Alice',
      lastName: 'Johnson',
      className: '1ère année Réseaux',
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
  ];

  return (
    <Container>
      <Typography
        variant='h4'
        component='h1'
        align='center'
        gutterBottom
        sx={{
          marginTop: { xs: '180px', md: '120px', lg: '100px' },
          fontWeight: 'bold',
          color: '#fff',
        }}
      >
        Membres du Département
      </Typography>
      <Grid container spacing={2}>
        {members.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Member_card member={member} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Page;
