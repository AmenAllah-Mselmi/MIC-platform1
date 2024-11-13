import React, { useState, useEffect } from 'react'
import { Button, Typography, Grid, CardContent, Card } from '@mui/material'
import { useResponseStore } from '@/app/store/MyStore/ResponseStore'
import { useAuthStore } from '@/app/store/MyStore/AuthStore'

const ResponseSearch = ({ Assignment_Id }) => {
  const { fetchResponseByAssignmentAndUser, fetchedResponse } =
    useResponseStore() // Récupération du store
  const user = useAuthStore(state => state.user)
  const [userId, setUserId] = useState(user.id)

  useEffect(() => {
    const fetchData = async () => {
      await fetchResponseByAssignmentAndUser(Assignment_Id, userId)
    }

    fetchData() // Appel de la fonction de fetch lors du montage
  }, [Assignment_Id, userId, fetchResponseByAssignmentAndUser]) // useEffect se déclenche au montage

  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <div className='flex w-full max-w-md flex-col space-y-4'>
        {/* Si tu veux garder le bouton de recherche pour des recherches manuelles */}
        {/* <Button variant='contained' color='primary' onClick={handleSearch}>
          Search
        </Button> */}
      </div>

      {fetchedResponse && (
        <Card elevation={3}>
          <CardContent>
            <Grid
              container
              alignItems='center'
              justifyContent='space-between'
              spacing={2}
            >
              {/* Section de gauche : Your Response, Content et Created At */}
              <Grid item>
                <div className='flex-1 text-start'>
                  <h5 className='text-start text-lg font-extrabold'>
                    {fetchedResponse.Content}
                  </h5>
                  <h6 className='text-sm text-gray-500'>
                    {new Date(fetchedResponse.createdAt).toLocaleString()}
                  </h6>
                </div>
              </Grid>

              {/* Section de droite : Status */}
              <Grid item>
                <Button
                  variant='outlined'
                  color={
                    fetchedResponse.status === 'APPROVED'
                      ? 'success'
                      : fetchedResponse.status == 'AWAITING FOR REVIEW'
                        ? 'error'
                        : 'warning'
                  }
                >
                  {fetchedResponse.status}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {!fetchedResponse && (
        <Typography className='text-red-600'>
          No response found for the given Assignment.
        </Typography>
      )}
    </div>
  )
}

export default ResponseSearch
