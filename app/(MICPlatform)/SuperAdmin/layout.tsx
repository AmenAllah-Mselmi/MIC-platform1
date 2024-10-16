import React from 'react'
import Navbar from '../_MICcomponents/navbar/navbar'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={
        {
          // backgroundImage: 'url("/images/Member/MemberBackground.png")', // Remplacez par le chemin de votre image
          // backgroundSize: 'cover', // Pour couvrir tout l'espace
          // backgroundPosition: 'center', // Pour centrer l'image
          // height: '100vh' // Pour définir la hauteur du conteneur
        }
      }
    >
      {children}
    </div>
  )
}

export default Layout
