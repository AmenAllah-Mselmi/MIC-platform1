// app/login/layout.tsx
import React from 'react'
import RootLayout from '../layout'

const LoginLayout: React.FC = ({ children }) => {
  return <RootLayout currentPath='/login'>{children}</RootLayout>
}

export default LoginLayout
