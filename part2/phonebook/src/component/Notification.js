import React from 'react'

const Notification = ({ notification }) => {
    if (!notification) { return null }

    return (
        <p
            className={notification.isSuccess
                ? 'successNotification'
                : 'errorNotification'
            }> {notification.message}</p >
    )
}

export default Notification