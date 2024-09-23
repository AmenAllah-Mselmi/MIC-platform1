'use client'

import Image from 'next/image'
import './navbar.scss'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { FaBars } from 'react-icons/fa'
import { useEffect, useRef, useState } from 'react'
import Login from '../../(MICPlatform)/login/page'

const inter = Inter({ subsets: ['latin-ext'], weights: 400 })

export default function Navbar() {
  const [showlinks, setShowlinks] = useState(false)
  const navRef = useRef(null)
  const linksRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    let linksHeight = linksRef.current.getBoundingClientRect().height
    navRef.current.style.height = showlinks ? `${linksHeight}px` : '0'
  }, [showlinks])

  useEffect(() => {
    const handleScroll = () => {
      // Check if headerRef.current exists before trying to access classList
      if (!headerRef.current) return

      if (window.scrollY > 550) {
        headerRef.current.classList.add('fixed')
      } else {
        headerRef.current.classList.remove('fixed')
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header ref={headerRef} id='navbar'>
      <nav>
        <div className='logo'>
          <Link href='/#welcome'>
            <Image
              onClick={() => setShowlinks(false)}
              src='/images/main-logo.png'
              alt='microsoft issatso logo'
              width={37}
              height={37}
            />
          </Link>
          <div onClick={() => setShowlinks((prev) => !prev)} className='burger'>
            <FaBars />
          </div>
        </div>
        <div ref={navRef} className='links-container'>
          <ul
            onClick={() => setShowlinks((prev) => !prev)}
            ref={linksRef}
            className={`${inter.className} links`}
          >
            <li>
              <Link href='/#welcome'>Home</Link>
            </li>
            <li>
              <Link href='/#about'>About</Link>
            </li>
            <li>
              <Link href='/#departments'>Departments</Link>
            </li>
            <li>
              <Link href='/#team'>Team</Link>
            </li>
            <li>
              <Link href='/portfolio'>Portfolio</Link>
            </li>
            <li>
              <Link href='/contact'>Contact</Link>
            </li>
            <li>
              <Link
                className='bg-primary px-4 py-1 border rounded-lg hover:bg-secondary transition'
                href='/login'
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
