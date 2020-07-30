const React = require('react')

const LoginForm = ({ handleLogin, setUsername, setPassword }) => {
    return (
        <>
            < h2 > log in to application</h2>
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