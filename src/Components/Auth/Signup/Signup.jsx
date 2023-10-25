import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { auth, db } from '../../../firebase'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { collection, doc, setDoc } from 'firebase/firestore'

const defaultTheme = createTheme()

export default function Signup() {
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    createUserWithEmailAndPassword(
      auth,
      data.get('email'),
      data.get('password')
    )
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: data.get('name'),
        })
        const colRef = collection(db, 'users')
        setDoc(doc(colRef, userCredential.user.uid), {
          name: data.get('name'),
          comments: [],
          followers: [],
          followings: [],
          posts: [],
        })
          .then(() => {
            console.log(userCredential.user)
          })
          .catch((error) => {
            console.log(error)
          })
        navigate('/signin')
      })
      .catch((error) => {
        console.log(error.message)
      })
  }
  const googleSignup = () => {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        const user = result.user
        console.log(token, user)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
      })
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='Name'
                  label='Name'
                  name='name'
                  autoComplete='name'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                />
              </Grid>
            </Grid>
            <Button
              onClick={googleSignup}
              fullWidth 
              variant='contained'
              sx={{
                mt: 3,
              }}
            >
              Sign Up with Google
            </Button>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid justifyContent='flex-end'>
              <Link to='/signin'>Already have an account? Sign in</Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
