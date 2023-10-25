import React, { useState } from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Helper from "./Helper.jsx"
const defaultTheme = createTheme()

export default function Postadd() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
	const {addPost} = Helper()
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
            noValidate
            sx={{
              mt: 1,
            }}
          >
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin='normal'
              required
              fullWidth
              id='title'
              label='Title'
              name='title'
              autoFocus
            />
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin='normal'
              required
              fullWidth
              name='description'
              label='Description'
              type='description'
              id='description'
              autoComplete='description'
            />
            <TextField
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              margin='normal'
              required
              fullWidth
              name='description'
              label='Description'
              type='description'
              id='description'
              autoComplete='description'
            />

            <Button
              type='click'
              onClick={(e) =>{
                e.preventDefault()
                addPost(title, description, imageUrl)
              }}
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
