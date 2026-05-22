import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoHome, IoHomeOutline } from 'react-icons/io5'
import { FiUser, FiPlusSquare } from 'react-icons/fi'
import { FaUserCircle } from 'react-icons/fa'
import { RiAddBoxFill } from 'react-icons/ri'



function Navbar() {
  return (
    <div className='main-navbar'>

      <NavLink to='/home' className='nav-link'>
      {({ isActive })=> 
        isActive ? <IoHome size={23} className='nav-icons active' /> : <IoHomeOutline size={23} className='nav-icons' />
      }
      </NavLink>

      <NavLink to='/add_file' className='nav-link'>
      {({ isActive })=> 
        isActive ? <RiAddBoxFill size={23} className='nav-icons active' /> : <FiPlusSquare size={23} className='nav-icons' />
      }
      </NavLink>

      <NavLink to='/profile' className='nav-link'>
      {({ isActive })=> 
        isActive ? <FaUserCircle size={23} className='nav-icons active'  /> : <FiUser size={23} className='nav-icons'  />
      }
      </NavLink>

    </div>
  )
}

export default Navbar
