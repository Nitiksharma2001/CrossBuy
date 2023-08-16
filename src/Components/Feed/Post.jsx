import React, { useEffect, useState } from 'react'
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
import DeleteIcon from '@mui/icons-material/Delete';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined'
import AddIcon from '@mui/icons-material/Add'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { TextField } from '@mui/material'
import { auth, db } from '../../firebase'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  likeThePost,
  disLikeThePost,
  addTheComment,
  deleteTheComment,
} from '../../Features/Post/postSlice'
import { onAuthStateChanged } from 'firebase/auth'
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
  const { id, createdat, imageurl, title, description, likes, comments } = post
  const [expanded, setExpanded] = useState(false)
  const [comment, setComment] = useState('')
  const [liked, setLiked] = useState(post.likes.includes(auth.currentUser.uid) ? true : false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/signin')
      } 
    })
  }, [])
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  const documentUpdate = async (updateQuery) => {
    const postRef = doc(db, 'posts', id)
    await updateDoc(postRef, updateQuery)
  }
  const addComment = async () => {
    await documentUpdate({ comments: arrayUnion(comment) })
    dispatch(addTheComment({ id, comment }))
    setComment('')
  }
  const likePost = async () => {
    await documentUpdate({ likes: arrayUnion(auth.currentUser.uid) })
    dispatch(likeThePost({ id: id }))
    setLiked(true)
  }
  const disLikePost = async () => {
    await documentUpdate({ likes: arrayRemove(auth.currentUser.uid) })
    dispatch(disLikeThePost({ id: id }))
    setLiked(false)
  }
  const deleteComment = async (commented) => {
    await documentUpdate({ comments: arrayRemove(commented) })
    dispatch(deleteTheComment({ id, comment: commented }))
  }
  return (
    <Card sx={{ minWidth: 345 }}>
      <CardHeader
        onClick={() => {
          navigate(`/profile/${post.user.id}`)
        }}
        style={{ cursor: 'pointer' } }
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
            {post.user.name[0]}
          </Avatar>
        }
        title={post.user.name}
        subheader={createdat}
      />
      <Typography variant='body4' color='text.secondary'>
        {title}
      </Typography>
      <CardMedia component='img' width='156'  image={imageurl} alt='Paella dish' />
      <CardContent>
        <Typography variant='body3' color='text.first'>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label='add to favorites'>
          {liked === false ? (
            <FavoriteOutlinedIcon style={{ color: 'black' }} onClick={likePost} />
        ) : (
          <FavoriteOutlinedIcon style={{ color: 'red' }} onClick={disLikePost} />
        )}
          {likes.length}
        </IconButton>
        <ExpandMore onClick={handleExpandClick} aria-expanded={expanded} aria-label='show more'>
          <ModeCommentOutlinedIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
          <TextField value={comment} onChange={(e) => setComment(e.target.value)} style={{ marginLeft: '15px' }} id='standard-helperText' placeholder='Add a comment' variant='standard' />
          <AddCircleOutlineIcon onClick={addComment} style={{ cursor: 'pointer', marginRight:'10px' }} />
        </div>
        <CardContent>
          {comments.map((comment) => {
            return <div style={{display:'flex', justifyContent:'space-between'}}>
               <Typography paragraph>{comment} </Typography>
               <DeleteIcon style={{cursor:'pointer'}} onClick={() => deleteComment(comment)}/>
            </div>
          })}
        </CardContent>
      </Collapse>
    </Card>
  )
}

