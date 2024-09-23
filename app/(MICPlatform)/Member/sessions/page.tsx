import React from 'react'
import SessionCard from "../../_MICcomponents/session_card/session_card"
const page = () => {
  return (
    <div className='container mx-auto flex flex-col justify-around items-center '>
        <SessionCard></SessionCard>
        <SessionCard></SessionCard>
        <SessionCard></SessionCard>
        <SessionCard></SessionCard>
    </div>
  )
}

export default page
