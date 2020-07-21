import React, { useState, useEffect } from 'react'
import loginServices from './services/login'
import blogServices from './services/blog'
import Blog from './components/blog'
import './App.css'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState(null)
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    blogServices.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const user = window.localStorage.getItem('loggedBlogUser')
    if (user) {
      const userObject = JSON.parse(user)
      setUser(userObject)
      blogServices.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginServices.login({ username, password })
      if (user) {
        window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
        blogServices.setToken(user.token)
        setUser(user)

        timeOutAlert({
          state: true,
          text: 'Logged successfully'
        })
      }
    } catch (error) {
      timeOutAlert({
        state: false,
        text: 'Invalid username or password'
      })
      console.log(error)
    }
  }

  const createBlogHandle = async (event) => {
    event.preventDefault()
    if (!newBlog || !newBlog.title || !newBlog.author || !newBlog.url) {
      timeOutAlert({
        state: false,
        text: 'Missing blog\'s atributes'
      })
      return
    }
    const response = await blogServices.create(newBlog)
    if (response) {
      setBlogs(blogs.concat(response))
      setNewBlog(null)
      timeOutAlert({
        state: true,
        text: `${JSON.stringify(newBlog.title)} created successfully`
      })
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    timeOutAlert({
      state: true,
      text: 'logout successfully'
    })
  }

  const loginForm = (
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

  const showBlogs = (
    <>
      <h2>blogs</h2>
      {user?.username} logged in
      <button onClick={handleLogOut}>logout</button>
      {
        blogs.map(blog =>
          <div key={blog.id}>
            <Blog blog={blog} />
          </div>
        )
      }
    </>
  )

  const createBlogForm = (
    <>
      <form onSubmit={createBlogHandle}>
        <div>
          title: <input
            value={newBlog?.title ?? ''}
            onChange={({ target }) => {
              setNewBlog({ ...newBlog, title: target.value })
            }}>

          </input>
        </div>
        <div>
          author: <input
            value={newBlog?.author ?? ''}
            onChange={({ target }) => { setNewBlog({ ...newBlog, author: target.value }) }}>

          </input>
        </div>
        <div>
          url: <input
            value={newBlog?.url ?? ''}
            onChange={({ target }) => { setNewBlog({ ...newBlog, url: target.value }) }}>

          </input>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )

  const timeOutAlert = (alert) => {
    setAlert(alert)
    setTimeout(() => {
      setAlert(null)
    }, 5000)
  }

  return (
    <>
      {
        alert && <p className={alert.state ? 'alertGood' : 'alertBad'}>{alert.text}</p>
      }
      {
        user !== null
          ?
          <>
            {showBlogs}
            {createBlogForm}
          </>
          : loginForm
      }
    </>
  )
}

export default App