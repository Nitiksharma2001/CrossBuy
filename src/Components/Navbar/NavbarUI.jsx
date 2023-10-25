import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../../Features/userSlice'
export default function ButtonAppBar() {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const onSignout = () => {
    localStorage.removeItem('user')
    dispatch(removeUser())
    navigate('/')
  }
  const navigate = useNavigate()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Link style={{ color: 'inherit', textDecoration: 'none' }} to='/'>
              CrossMeet
            </Link>
          </Typography>

          {user ? (
            <div>
              <Link style={{ color: 'inherit', textDecoration: 'none' }} to='/addpost'>
                <Button color='inherit'>add a post</Button>
              </Link>
              <Button color='inherit' onClick={onSignout}>signout</Button>
            </div>
          ) : (
            <div>
              <Button color='inherit'>
                <Link style={{ color: 'inherit', textDecoration: 'none' }} to='/signin'>
                  signin
                </Link>
              </Button>
              <Button color='inherit'>
                <Link style={{ color: 'inherit', textDecoration: 'none' }} to='/signup'>
                  signup
                </Link>
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
