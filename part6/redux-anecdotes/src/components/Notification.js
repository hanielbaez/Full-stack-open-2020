import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { notificationHide } from '../reducers/notificationReducer'

const Notification = () => {
    const notification = useSelector(state => state.notification)
    const dispatch = useDispatch()

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        margin: 5,
        visibility: notification.visibility && 'hidden'
    }

    const timeOutHideNotification = () => {
        if (notification.visibility !== 'hidden') {
            setTimeout(() => {
                dispatch(notificationHide())
            }, 5000)
        }
    }

    timeOutHideNotification()

    return (
        <div style={style}>
            {notification.msg}
        </div>
    )
}

export default Notification