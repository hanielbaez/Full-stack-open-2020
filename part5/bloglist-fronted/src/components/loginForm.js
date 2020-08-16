import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/user'
import loginServices from '../services/login'
import blogServices from '../services/blog'
import { successAlert, errorAlert } from '../reducers/alert'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const userObject = await loginServices.login({ name: username, password, username })
            if (userObject) {
                window.localStorage.setItem('loggedBlogUser', JSON.stringify(userObject))
                blogServices.setToken(userObject.token)
                dispatch(setUser(userObject))
                dispatch(successAlert('Logged successfully'))
            }
        } catch (error) {
            dispatch(errorAlert('Invalid username or password'))
            console.log(error)
        }
    }

    return (
        <>
            <h2> log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username <input
                        onChange={({ target }) => { setUsername(target.value) }}
                        id='input-username'></input>
                </div>
                <div>
                    password <input type="password"
                        onChange={({ target }) => { setPassword(target.value) }}
                        id='input-password'></input>
                </div>
                <button type="submit">login</button>
            </form>
        </>
    )
}

export default LoginForm