import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebase'
import { useNavigate } from 'react-router-dom'
import { Snackbar } from '@mui/material'
import { useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../Features/userSlice'
const defaultTheme = createTheme()

export default function Signin() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('nitik@nitik.com')
  const [password, setPassword] = useState('nitik')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await axios.post(
        process.env.REACT_APP_SERVER + '/user/signin',
        {
          email,
          password,
        }
      )
      console.log(user.data.user);
      localStorage.setItem('user', JSON.stringify(user.data.user))
      dispatch(setUser(user.data.user))
      navigate('/')
    } 
    catch (err) {
      console.log(err)
    }
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: 'secondary.main',
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 1,
            }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity='error'
                sx={{ width: '100%' }}
              >
                {message}
              </Alert>
            </Snackbar>

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{
                mt: 3,
                mb: 2,
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to='/signup'>Don't have an account? Sign Up</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
