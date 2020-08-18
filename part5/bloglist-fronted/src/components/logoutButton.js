import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../reducers/user'
import { successAlert, removeAlert } from '../reducers/alert'


const LogoutButton = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleLogOut = () => {
        window.localStorage.removeItem('loggedBlogUser')
        dispatch(logOut())
        dispatch(successAlert('logout sueccessfully'))
        dispatch(removeAlert())
    }

    return (
        <>
            {user?.username} logged in
            <button id='logout-button' onClick={handleLogOut}>logout</button>
        </>
    )
}

export default LogoutButton