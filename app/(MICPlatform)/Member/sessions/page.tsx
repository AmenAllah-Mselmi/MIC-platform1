'use client'
import React, { useEffect, useState } from 'react'
import EventCard from '../../_MICcomponents/session_card/session_card'
import { useSessionsStore } from '../../../store/MyStore/SessionsStore'

const Page = () => {
  const sessions = useSessionsStore(state => state.sessions)
  const fetchSessions = useSessionsStore(state => state.fetchSessions)

  useEffect(() => {
    const loadSessions = async () => {
      // id departement donné en paramètre ici
      await fetchSessions('66fd5e20eac555ee63ec2d9d')
      console.log('Members fetched:', sessions)
    }

    loadSessions()
  }, [fetchSessions])
  return (
    <div className='container mx-auto flex flex-col items-center justify-around'>
      {sessions && sessions.length > 0 ? (
        sessions.map((session, index) => (
          <EventCard session={session} key={index} />
        ))
      ) : (
        <p>No sessions available</p>
      )}
    </div>
  )
}

export default Page
