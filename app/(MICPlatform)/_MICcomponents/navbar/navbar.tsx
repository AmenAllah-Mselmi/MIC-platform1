'use client'

import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'

// Import the Inter font from Google Fonts
const inter = Inter({ subsets: ['latin-ext'], weight: '400' })

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false) // State to manage dropdown visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false) // State to manage mobile menu visibility

  return (
    <nav className='bg-navbar text-white fixed w-full z-10 top-0'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        {/* Logo Section with custom logo */}
        <Link href='/' className='flex items-center space-x-3 rtl:space-x-reverse'>
          <Image
            src='/images/main-logo.png' // Updated logo source
            width={39}
            height={39}
            className='h-8 cursor-pointer'
            alt='Microsoft Issatso Logo' // Alt text for accessibility
          />
          <span className={`${inter.className} self-center text-2xl font-semibold whitespace-nowrap hidden md:block`}>
            Microsoft Issatso
          </span>
        </Link>

        {/* Right Section with Profile Dropdown */}
        <div className='flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
          {/* Profile Dropdown Toggle */}
          <button
            type='button'
            className='flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
            aria-expanded={isDropdownOpen ? 'true' : 'false'}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown on click
          >
            <span className='sr-only'>Open user menu</span>
            <Image
              src='/images/big-logo.png' // Updated user image source
              alt='user photo'
              width={32}
              height={32}
              className='w-8 h-8 rounded-full'
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              className='z-50 absolute top-16 right-10 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600'
              id='user-dropdown'
            >
              <div className='px-4 py-3'>
                <span className='block text-sm text-gray-900'>Student Name</span>
                <span className='block text-sm text-gray-500 truncate'>email@example.com</span>
              </div>
              <ul className='py-2' aria-labelledby='user-menu-button'>
                <li>
                  <Link
                    href='/profile'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href='/logout'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            type='button'
            className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            aria-controls='navbar-user'
            aria-expanded={isMenuOpen ? 'true' : 'false'}
            onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle mobile menu
          >
            <span className='sr-only'>Open main menu</span>
            <svg className='w-5 h-5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 17 14'>
              <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 1h15M1 7h15M1 13h15' />
            </svg>
          </button>
        </div>

        {/* Main Navigation Links for Desktop and Mobile */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id='navbar-user'
        >
          <ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-navbar dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
            <li>
              <Link href='/' className='block py-2 px-3 text-black md:text-gray-300  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500'>
                Home
              </Link>
            </li>
            <li>
              <Link href='/#departments' className='block py-2 px-3   text-black md:text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500'>
                Departments
              </Link>
            </li>
            <li>
              <Link href='/Member/sessions' className='block py-2 px-3  text-black md:text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500'>
                Sessions
              </Link>
            </li>
            <li>
              <Link href='/Member/assignments' className='block py-2 px-3  text-black md:text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500'>
                Assignments
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
