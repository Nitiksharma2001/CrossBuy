import React, { useEffect } from 'react'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import PostAddUI from './PostAddUI'
export default function Postadd() {
  const navigate = useNavigate()
  useEffect(() => {
    
  }, [])

  return <PostAddUI />
}
