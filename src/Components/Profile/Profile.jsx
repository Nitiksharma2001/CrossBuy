import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebase'
import { doc, getDoc } from 'firebase/firestore'
import ProfileUI from './ProfileUI'
import { useParams } from 'react-router-dom'
export default function Post() {
  return <>{<ProfileUI />}</>
}
