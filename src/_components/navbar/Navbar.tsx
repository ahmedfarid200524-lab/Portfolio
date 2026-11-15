import React from 'react'
import "./nav.css"

import Menu from '../menu/menu'

const Navbar = () => {
  return (
    <div className='w-full p-4 fixed z-50'>
      
      <div className='flex justify-between pe-4 ps-4 relative ' >
        <div className='text-2xl text-black dark:text-white'>
          Ahmed
        </div>  
        <Menu/>
      </div>

    </div>
  )
}

export default Navbar