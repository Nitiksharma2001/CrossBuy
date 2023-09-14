import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
export default function ButtonAppBar() {
  const [user, setUser] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true)
      } else {
        navigate('/signin')
      }
    })
  }, [])
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Link style={{color:'inherit', textDecoration:'none'}} to='/'>CrossMeet</Link>
          </Typography>

          {user ? (
            <div>
              <Button color='inherit'>
                <Link style={{color:'inherit', textDecoration:'none'}}to='/addpost'>add a post</Link>
              </Button>
              <Button
                color='inherit'
                onClick={() => {
                  const auth = getAuth()
                  signOut(auth)
                    .then(() => {
                      setUser(false)
                      navigate('/signin')
                    })
                    .catch((error) => {
                      console.log(error)
                    })
                }}
              >
                {' '}
                signout{' '}
              </Button>
            </div>
          ) : (
            <div>
              <Button color='inherit'>
                <Link style={{color:'inherit', textDecoration:'none'}} to='/signin'>
                  signin
                </Link>
              </Button>
              <Button color='inherit'>
                <Link style={{color:'inherit', textDecoration:'none'}} to='/signup'>
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
