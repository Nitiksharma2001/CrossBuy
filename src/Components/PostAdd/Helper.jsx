import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { addPost } from '../../Features/postSlice'

export default function Helper() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  const baseUrl = process.env.REACT_APP_SERVER
  const [data, setData] = useState({
    title: '',
    description: '',
    imageUrl: ''
  })

  const changeVal = (e) => {
    const name = e.target.name, val = e.target.value
    setData(prev => {
      return {...prev, [name]: val}
    })
  }

  const submitData = async () => {
    const { title, description, imageUrl } = data
    const resp = await fetch(`${baseUrl}/post/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `bearer ${user.token}`,
      },
      body:JSON.stringify({
        title, description, imageUrl
      })
    })
    const res = await resp.json()
    dispatch(addPost({post: res.post}))
    navigate('/')
  }
  return {data, changeVal, submitData}
}
