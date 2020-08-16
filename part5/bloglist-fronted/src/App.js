import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'
import { setUser } from './reducers/user'
import blogServices from './services/blog'
import './App.css'
import LoginForm from './components/loginForm'
import BlogForm from './components/blog/blogForm'
import TogglableVisibility from './components/toggleVisibility'
import BlogList from './components/blog/blogList'
import Blog from './components/blog/blog'
import Alert from './components/alert'
import UsersList from './components/user/usersList'
import User from './components/user/user'
import { inizializeBlog } from './reducers/blog'
import NavigationBar from './components/navigationBar'

const App = () => {
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    const user = window.localStorage.getItem('loggedBlogUser')
    if (user) {
      const userObject = JSON.parse(user)
      dispatch(setUser(userObject))
      blogServices.setToken(userObject.token)
    }
  }, [dispatch])

  useEffect(() => {
    blogServices.getAll().then(returnBlogs => {
      returnBlogs.sort((a, b) => b.likes - a.likes)
      dispatch(inizializeBlog(returnBlogs))
    })
  }, [dispatch])

  const match = useRouteMatch('/blogs/:id')
  const blogSelected = match
    ? blogs.find(blog => {
      return blog.id === match.params.id
    })
    : null
  console.log()

  return (
    <div className="hero-body">
      <div className="container">
        <NavigationBar />
        <Alert />
        {
          user !== null
            ? <>
              <h2>blogs</h2>
              <Switch>
                <Route path='/blogs/:id'>
                  <Blog blogSelected={blogSelected} />
                </Route>
                <Route path='/users/:id'>
                  <User />
                </Route>
                <Route path='/users'>
                  <UsersList />
                </Route>
                <Route path='/'>
                  <TogglableVisibility buttonTitle='new note' ref={blogFormRef}>
                    <BlogForm />
                  </TogglableVisibility>
                  <BlogList />
                </Route>
              </Switch>
            </>
            : <LoginForm />
        }
      </div>
    </div>
  )
}

export default App