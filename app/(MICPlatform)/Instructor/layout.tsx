import React from 'react'
import Navbar from '../_MICcomponents/navbar/navbar'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage: 'url("/images/Member/MemberBackground.png")'
        }}
        className='z--10 flex min-h-screen w-screen items-center justify-center bg-cover bg-center'
      >
        {children}
      </div>
    </>
  )
}

export default Layout
