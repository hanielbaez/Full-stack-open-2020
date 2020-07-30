import React, { useState, useEffect, useRef } from 'react'
import loginServices from './services/login'
import blogServices from './services/blog'
import './App.css'
import LoginForm from './components/loginForm'
import BlogForm from './components/blogForm'
import TogglableVisibility from './components/toggleVisibility'
import BlogList from './components/blogList'
import Alert from './components/alert'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [alert, setAlert] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogServices.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
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

  const addBlog = async (blogObject) => {
    const response = await blogServices.create(blogObject)
    blogFormRef.current.toggleVisibility()

    if (response) {
      setBlogs(blogs.concat(response))
      timeOutAlert({
        state: true,
        text: `${JSON.stringify(blogObject.title)} created successfully`
      })
    }
  }

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

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    timeOutAlert({
      state: true,
      text: 'logout successfully'
    })
  }

  const timeOutAlert = (alert) => {
    setAlert(alert)
    setTimeout(() => {
      setAlert(null)
    }, 5000)
  }

  const removeBlogFromList = blogToRemove => {
    const newListBlogs = blogs.filter(blog => blog.id !== blogToRemove.id)
    console.log(newListBlogs)
    setBlogs(newListBlogs)
  }

  return (
    <>
      <Alert alert={alert} />
      {
        user !== null
          ?
          <>
            <h2>blogs</h2>
            {user?.username} logged in
            <button id='logout-button' onClick={handleLogOut}>logout</button>
            <TogglableVisibility buttonTitle='new note' ref={blogFormRef}>
              <BlogForm createBlog={addBlog} timeOutAlert={timeOutAlert} />
            </TogglableVisibility>
            <BlogList blogs={blogs} removeBlogList={removeBlogFromList} />
          </>
          : <LoginForm
            handleLogin={handleLogin}
            setUsername={setUsername}
            setPassword={setPassword}
          />
      }
    </>
  )
}

export default App