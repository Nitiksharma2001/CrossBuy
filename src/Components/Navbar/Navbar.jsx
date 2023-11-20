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
          <button>home</button>
        </Link>
      </div>
      {user !== null ? (
        <div className='navbar-right'>
          <Link to='/addpost'>
            <button>add a post</button>
          </Link>
          <button onClick={signout}>signout</button>
        </div>
      ) : (
        <div className='navbar-right'>
          <Link to='/signin'>
            <button>signin</button>
          </Link>
          <Link to='/signup'>
            <button>signup</button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Navbar
