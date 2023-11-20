import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { removeUser } from "../../Features/userSlice"

const Helper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const signout = () => {
        localStorage.removeItem('user')
        dispatch(removeUser())
        navigate('/')
    }
    return {signout}
    
}

export default Helper