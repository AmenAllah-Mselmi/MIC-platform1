'use client'

import { useEffect } from 'react'
import About from './components/about/About'
import Departments from './components/departments/Departments'
import Footer from './components/footer/Footer'
import Partners from './components/partners/Partners'
import Team from './components/team/Team'
import Welcome from './components/welcome/Welcome'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Reachus from './components/reachus/Reachus'
import Navbar from './components/navbar/Navbar'

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 200,
      once: true
    })
  }, [])

  return (
    <main>
      <Navbar />
      <Welcome />
      <About />
      <Departments />
      <Team />
      <Partners />
      <Reachus />
      <Footer />
    </main>
  )
}
