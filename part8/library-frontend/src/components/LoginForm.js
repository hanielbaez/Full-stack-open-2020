import React, { useEffect } from 'react'
import { useField } from '../hooks'

import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setToken }) => {
    const username = useField('text')
    const password = useField('password')

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            // setError(error.graphQLErrors[0].message)
        }
    })
    
    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('book-user-token', token)
        }
    }, [result.data]) //eslint-disable-line

    const submitHandler = (event) => {
        event.preventDefault()
        login({
            variables: {
                username: username.value,
                password: password.value
            }
        })
    }

    return (
        <div style={{ margin: '25px' }}>
            <form onSubmit={submitHandler}>
                <div>
                    name<input {...username} reset='' ></input>
                </div>
                <div>
                    password<input {...password} reset=''></input>
                </div>
                <div>
                    <button>login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm