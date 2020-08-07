import React, { useEffect, useState } from 'react'
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import Footer from './components/Footer'
import About from './components/About'
import CreateNew from './components/CreateNew'
import Notification from './components/Notification'

import anecdoteServices from './services/Anecdotes'
import Anecdote from './components/Anecdote'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([])
  const [notification, setNotification] = useState({})

  useEffect(() => {
    anecdoteServices.getAll().then(data => {
      setAnecdotes(data)
    })
  }, [])

  const createAnecdote = async (object) => {
    const anecdoteCreated = await anecdoteServices.create(object)
    setAnecdotes([...anecdotes, anecdoteCreated])
    setNotification({
      content: anecdoteCreated.content,
      visibility: true
    })
    hideNotification()
  }

  const hideNotification = () => {
    setTimeout(() => {
      setNotification({
        content: '',
        visibility: false
      })
    }, 10000)
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anec => anec.id === match.params.id)
    : null

  return (
    <>
      <h1>Software anecdotes</h1>
      {notification.visibility && <Notification notification={notification} />}
      <Menu />
      <Switch>
        <Route path='/anecdotes/:id'>
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/create'>
          <CreateNew createAnecdote={createAnecdote} />
        </Route>
        <Route path='/'>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Footer />
      </Switch>
    </>
  )
}

export default App