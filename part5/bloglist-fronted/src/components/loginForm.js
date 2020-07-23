const React = require('react')

const LoginForm = ({ handleLogin, setUsername, setPassword }) => {
    return (
        <>
            < h2 > log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username <input onChange={({ target }) => { setUsername(target.value) }}></input>
                </div>
                <div>
                    password <input type="password" onChange={({ target }) => { setPassword(target.value) }}></input>
                </div>
                <button type="submit">login</button>
            </form>
        </>
    )
}

export default LoginForm