'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import "./../navbar/nav.css"

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '/#contact' },
]
const Menu = () => {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)

  // read saved theme (or the OS setting) on first load
  useEffect(() => {
    let saved: string | null = null
    try {
      saved = localStorage.getItem('theme')
    } catch {}
    const isDark = saved
      ? saved === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {}
  }

  return (
    <>
      {/* Toggle button (stays above the panel so it can also close it) */}
     <button
  onClick={() => setOpen((prev) => !prev)}
  aria-label={open ? 'Close menu' : 'Open menu'}
  aria-expanded={open}
  className="fixed right-4 top-4 z-[60] cursor-pointer"
>
  <div className={`grid grid-cols-3 gap-1 btn-container ${open ? 'open' : ''}`}>
    {Array.from({ length: 9 }).map((_, i) => (
      <div
        key={i}
        className={`dot-btn border-2 border-black bg-white dark:border-white dark:bg-black ${
          i % 2 === 1 ? 'remove' : ''
        }`}
      />
    ))}
  </div>
</button>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50  transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Sliding panel from the right */}
      <nav
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-50 flex h-screen w-72 flex-col bg-neutral-900 px-8 pb-10 pt-24 dark:bg-white dark:text-black text-white shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <ul className="flex flex-col gap-8 text-4xl">
          {links.map((link, i) => (
            <li
              key={link.href}
              style={{ transitionDelay: open ? `${150 + i * 60}ms` : '0ms' }}
              className={`transition-all duration-300 ${
                open ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
              }`}
            >
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="group inline-flex items-start gap-2 hover:text-neutral-400"
              >
                {link.label}
                <span className="mt-1 text-xs tabular-nums text-neutral-500 group-hover:text-neutral-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Theme toggle (pushed to the bottom with mt-auto) */}
        <button
          onClick={toggleTheme}
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="relative mt-auto h-11 w-11 cursor-pointer rounded-full border border-neutral-700 hover:border-neutral-400"
        >
          {/* Sun (shown in light mode) */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`absolute inset-0 m-auto h-6 w-6 transition-all duration-500 ${
              dark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
            }`}
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>

          {/* Moon (shown in dark mode) */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`absolute inset-0 m-auto h-6 w-6 transition-all duration-500 ${
              dark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
            }`}
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </button>
      </nav>
    </>
  )
}

export default Menu