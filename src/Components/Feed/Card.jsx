import * as React from 'react'
import { styled } from '@mui/material/styles'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined'
import AddIcon from '@mui/icons-material/Add'
import { TextField } from '@mui/material'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { addDoc, arrayRemove, arrayUnion, collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

export default function Post({ post }) {
  const { id, createdat, imageurl, title, description, comments, likes, user } = post
  const [expanded, setExpanded] = React.useState(false)
  const [comment, setComment] = React.useState('')
  const [likeColor, setLikeColor] = React.useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (likes.includes(auth.currentUser.uid)) {
      setLikeColor(true)
    }
  }, [])
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  const handleSubmit = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, 'posts', id)
        updateDoc(docRef, { comments: arrayUnion(comment) }).then((data) => {})
      } else {
        navigate('/login')
      }
    })
  }
  const likePost = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, 'posts', id)
        if (!likeColor) {
          updateDoc(docRef, { likes: arrayUnion(user.uid) }).then(() => {
            setLikeColor((prev) => !prev)
          })
        } else {
          updateDoc(docRef, { likes: arrayRemove(user.uid) }).then(() => {
            setLikeColor((prev) => !prev)
          })
        }
      } else {
        navigate('/login')
      }
    })
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        onClick={() => {
          navigate(`/profile/${user}`)
        }}
        style={auth.currentUser.uid !== user ? { cursor: 'pointer' } : {}}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
            {user.name[0]}
          </Avatar>
        }
        title={user.name}
        subheader={createdat}
      />
      <Typography variant='body1' color='text.primary'>
        {title}
      </Typography>
      <CardMedia component='img' height='194' image={imageurl} alt='Paella dish' />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label='add to favorites'>
          <FavoriteOutlinedIcon style={likeColor ? { fill: 'red' } : { color: 'black' }} onClick={likePost} />
          {likes.length}
        </IconButton>
        <ExpandMore onClick={handleExpandClick} aria-expanded={expanded} aria-label='show more'>
          <ModeCommentOutlinedIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TextField value={comment} onChange={(e) => setComment(e.target.value)} style={{ marginLeft: '15px' }} id='standard-helperText' placeholder='Add a comment' variant='standard' />
          <AddIcon onClick={handleSubmit} style={{ cursor: 'pointer', border: '2px solid black', borderRadius: '10px' }} />
        </div>
        <CardContent>
          {comments.map((comment) => {
            return <Typography paragraph>{comment}</Typography>
          })}
        </CardContent>
      </Collapse>
    </Card>
  )
}