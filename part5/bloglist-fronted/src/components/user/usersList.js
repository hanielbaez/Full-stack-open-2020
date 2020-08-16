import React, { useEffect } from 'react'
import userServices from '../../services/user'
import { Link } from 'react-router-dom'
import { initializeUsers } from '../../reducers/users'
import { useDispatch, useSelector } from 'react-redux'

const UsersList = () => {
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        userServices.getAll().then(users => {
            dispatch(initializeUsers(users))
        })
    }, [dispatch])

    return (
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th><b>blogs created</b></th>
                    </tr>
                    {
                        users.map(user => {
                            return <tr key={user.name}>
                                <td>
                                    <Link to={`/users/${user.id}`}>{user.name}  </Link>
                                </td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UsersList