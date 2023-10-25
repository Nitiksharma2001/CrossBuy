import React, { useState } from 'react'
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
import DeleteIcon from '@mui/icons-material/Delete'
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Helper from './Helper'
import { auth } from '../../../firebase'
import ReplyIcon from '@mui/icons-material/Reply'
import { useSelector } from 'react-redux'
import Comment from '../Comment/Comment'
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
const startWithCapitalLetter = (text) => {
  const str =
    text[0].toUpperCase() + text.substring(1, Math.min(100, text.length))
  return str
}
export default function Post({ post }) {
  const [expanded, setExpanded] = useState(false)
  const { name } = post.user
  const user = useSelector(state => state.user.user)
  const { title, description, imageUrl } = post
  const {
    likePost,
    disLikePost,
    addComment,
    addReply,
    replyUpdate,
    deleteComment,
    liked,
    comment,
    comments,
    setComment,
    fetchComments,
    fetchReplies
  } = Helper({ post })
  const navigate = useNavigate()
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  return (
    <Card sx={{ width: 345 }}>
      <CardHeader
        onClick={() => {
          navigate(`/profile/${post.user.id}`)
        }}
        style={{ cursor: 'pointer' }}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
            {name[0]}
          </Avatar>
        }
        title={name}
        subheader={post.createdat}
      />
      <Typography variant='body4' color='text.secondary'>
        {title}
      </Typography>
      <CardMedia
        component='img'
        sx={{ width: '345' }}
        image={imageUrl}
        alt='Paella dish'
      />
      <CardContent>
        <Typography variant='body3' color='text.first'>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        {liked === false ? (
          <IconButton aria-label='add to favorites' onClick={likePost}>
            <FavoriteOutlinedIcon style={{ color: 'black' }} />
          </IconButton>
        ) : (
          <IconButton aria-label='add to favorites' onClick={disLikePost}>
            <FavoriteOutlinedIcon style={{ color: 'red' }} />
          </IconButton>
        )}
        <ExpandMore
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ModeCommentOutlinedIcon />
        </ExpandMore>
      </CardActions>
      <button onClick={() => {
        fetchComments(post._id)
        setExpanded(true)
      }}>
        view all comments
      </button>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TextField
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ marginLeft: '15px' }}
            id='standard-helperText'
            placeholder='Add a comment'
            variant='standard'
          />
          <AddCircleOutlineIcon
            onClick={() => addComment(comment, post._id)}
            style={{ cursor: 'pointer', marginRight: '10px' }}
          />
        </div>
        <CardContent>
          {comments.map(commented => {
            return <div key={commented._id}><Comment deleteComment={deleteComment} comment={comment} commented={commented}/></div>
          })}
        </CardContent>
      </Collapse>
    </Card>
  )
}
