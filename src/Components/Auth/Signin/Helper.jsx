import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { setUser } from '../../../Features/userSlice'

const Helper = () => {
  const baseUrl = process.env.REACT_APP_SERVER
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const changeVal = (e) => {
    const name = e.target.name,
      val = e.target.value
    setData((prev) => {
      return { ...prev, [name]: val }
    })
  }
  const submitData = async () => {
    const { name, email, password } = data
    const resp = await fetch(`${baseUrl}/auth/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    const res = await resp.json()
    if (res.message === 'user verified') {
      console.log(res)
      dispatch(setUser(res.user))
      localStorage.setItem('user', JSON.stringify(res.user))
      navigate('/')
    }
  }
  return { data, changeVal, submitData }
}

export default Helper
