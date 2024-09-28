'use client'
import Link from 'next/link'
import React from 'react'
const NotFound = () => {
  return (
    <main
      className='h-screen w-screen bg-slate-200 text-center'
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <h1 className='color text-4xl text-primary'>
        Sorry, the page you requested could not be found
      </h1>
      <h4 style={{ fontSize: '24px', color: 'black' }}>Error 404</h4>
      <p style={{ fontSize: '20px', color: 'grey' }}>
        Go back to :{' '}
        <Link className='underline' href={'/'}>
          Home page
        </Link>
      </p>
    </main>
  )
}
export default NotFound
