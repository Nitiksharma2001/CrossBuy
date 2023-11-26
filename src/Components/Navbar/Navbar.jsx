import React from 'react'
import './Navbar.css'
import Helper from './Helper'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const user = useSelector((state) => state.user.user)
  const { signout } = Helper()
  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <Link to='/'>
          <button className='btnCSS'>Home</button>
        </Link>
      </div>
      {user !== null ? (
        <div className='navbar-right'>
          <Link to='/addpost'>
            <button className='btnCSS'>Add A Post</button>
          </Link>
          <button className='btnCSS' onClick={signout}>Signout</button>
        </div>
      ) : (
        <div className='navbar-right'>
          <Link to='/signin'>
            <button className='btnCSS'>Signin</button>
          </Link>
          <Link to='/signup'>
            <button className='btnCSS' >Signup</button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Navbar
