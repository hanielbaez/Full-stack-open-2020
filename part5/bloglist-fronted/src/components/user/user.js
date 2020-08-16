import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
    const users = useSelector(state => state.users)

    const match = useRouteMatch('/users/:id')
    const selectedUser = users.find(user => user.id === match.params.id)

    return selectedUser && (
        <>
            <h2>{selectedUser.name}</h2>
            <h3>added blogs</h3>
            <ul>
                {
                    selectedUser.blogs.map(blog =>
                        <li key={blog.title + Math.random().toString}>{blog.title}</li>
                    )
                }
            </ul>
        </>
    )
}

export default User