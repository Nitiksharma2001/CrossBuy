import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

const Helper = () => {
  const baseUrl = process.env.REACT_APP_SERVER
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.user)
  const [data, setData] = useState({
    name: '',
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
    const resp = await fetch(`${baseUrl}/auth/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
    const res = await resp.json()
    if (res.message === 'user created') {
      navigate('/signin')
    }
  }
  return { data, changeVal, submitData }
}

export default Helper
