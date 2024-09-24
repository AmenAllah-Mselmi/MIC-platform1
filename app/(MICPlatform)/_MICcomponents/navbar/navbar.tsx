'use client'

import Image from 'next/image'
import '../../../components/navbar/navbar.scss'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { FaBars } from 'react-icons/fa'
import { useEffect, useRef, useState } from 'react'
import SearchBar from '../searchBar/searchBar'

const inter = Inter({ subsets: ['latin-ext'], weight: '400' })

export default function Navbar() {
  const [showlinks, setShowlinks] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLUListElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (linksRef.current && navRef.current) {
      let linksHeight = linksRef.current.getBoundingClientRect().height
      navRef.current.style.height = showlinks ? `${linksHeight}px` : '0'
    }
  }, [showlinks])

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return

      if (window.scrollY > 550) {
        headerRef.current.classList.add('fixed')
      } else {
        headerRef.current.classList.remove('fixed')
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      ref={headerRef}
      id='navbar'
      className='navbar transition-all duration-300'
    >
      <nav>
        <div className='logo'>
          <Link href='/#welcome'>
            <Image
              onClick={() => setShowlinks(false)}
              src='/images/main-logo.png'
              alt='microsoft issatso logo'
              width={37}
              height={37}
              className='cursor-pointer'
            />
          </Link>
          <div
            onClick={() => setShowlinks(prev => !prev)}
            className='burger cursor-pointer text-2xl'
          >
            <FaBars />
          </div>
        </div>
        <div className="">
          <SearchBar />
        </div>
        <div ref={navRef} className='links-container'>
          <ul
            onClick={() => setShowlinks(prev => !prev)}
            ref={linksRef}
            className={`${inter.className} links`}
          >
            <li>
              <Link href='/#departments'>Departments</Link>
            </li>
            <li>
              <Link href='/Member/sessions'>Sessions</Link>
            </li>
            <li>
              <Link href='/Member/assignments'>Assignments</Link>
            </li>
            <li className='z-40'>
              <div className='dropdown dropdown-end'>
                <div
                  tabIndex={0}
                  role='button'
                  className='avatar btn btn-circle btn-ghost'
                >
                  <div className='w-10 rounded-full'>
                    <img
                      alt='Tailwind CSS Navbar component'
                      src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className='menu dropdown-content menu-sm mt-3 w-52 rounded-box bg-base-100 p-2 shadow'
                >
                  <li>
                    <a className='justify-between'>
                      Profile
                      <span className='badge'>New</span>
                    </a>
                  </li>
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
