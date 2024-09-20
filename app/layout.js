import { Inter } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css'
import ScrollTop from './components/scrolltop/ScrollTop'
import { Analytics } from '@vercel/analytics/react'
import { NextUIProvider } from '@nextui-org/react'

const inter = Inter({ subsets: ['latin'] })

const metadata = {
  title: 'Microsoft Issatso Club',
  description: 'Microsoft Issatso Club'
}

export default function RootLayout({ children }) {
  return (
    <html
      style={{
        scrollBehavior: 'smooth'
      }}
      lang='en'
    >
      <body className={inter.className}>
        <NextUIProvider>{children}</NextUIProvider>
        <ScrollTop />
        <Analytics />
      </body>
    </html>
  )
}
