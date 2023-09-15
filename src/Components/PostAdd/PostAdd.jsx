import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { auth, db, storage } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc, Timestamp, doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const defaultTheme = createTheme()

export default function Postadd() {
  const navigate = useNavigate()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/')
      }
    })
  }, [])
  async function addPost(event) {
    const data = new FormData(event.currentTarget)
    event.preventDefault()
    const storageRef = ref(storage, '/posts/' + data.get('file').name)
    uploadBytes(storageRef, data.get('file')).then((snapshot) => {
      console.log(snapshot.metadata.fullPath)
      getDownloadURL(ref(storage, snapshot.metadata.fullPath))
        .then(async (url) => {
          const postRef = await addDoc(collection(db, 'posts'), {
            title: data.get('title'),
            description: data.get('description'),
            imageurl: url,
            comments: [],
            likes: [],
            user: auth.currentUser.uid,
            createdat: Timestamp.now(),
          })
          const userRef = doc(db, 'users', auth.currentUser.uid)
          await updateDoc(userRef, {
            posts: arrayUnion(postRef.id)
          })
          navigate('/')
        })
        .catch((error) => {
          console.log(error);
        })
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
          }}
        >
          <Typography component='h1' variant='h2'>
            Add a Post
          </Typography>
          <Box
            component='form'
            onSubmit={addPost}
            noValidate
            sx={{
              mt: 1,
            }}
          >
            <TextField margin='normal' required fullWidth id='title' label='Title' name='title' autoFocus />
            <TextField margin='normal' required fullWidth name='description' label='Description' type='description' id='description' autoComplete='description' />
            <TextField margin='normal' required fullWidth type='file' id='file' name='file' />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{
                mt: 3,
                mb: 2,
              }}
            >
              Add Post
            </Button>
            <Grid container></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
