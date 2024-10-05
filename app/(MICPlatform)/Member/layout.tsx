import React from 'react'
import Navbar from '../_MICcomponents/navbar/navbar'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>

    <div
      style={{ backgroundImage: 'url("/images/Member/MemberBackground.png")' }}
      className='w-screen min-h-screen bg-cover bg-center z--10 flex justify-center items-center flex-col'
    >
      <Navbar/>
      {children}
    </div>

    </>
  )
}

export default Layout
