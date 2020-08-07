import React from 'react'

const Notification = ({ notification}) => {
    return (
        <p>a new anecdote {notification.content} created!</p>
    )
}

export default Notification