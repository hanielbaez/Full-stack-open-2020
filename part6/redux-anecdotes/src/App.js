import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteServices from './services/anecdote'
import { useDispatch } from 'react-redux'
import { initializeAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteServices.getAll().then(anecdoteList => {
      dispatch(initializeAnecdote(anecdoteList))
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps  

  return (
    <>
      <h1>Anecdotes</h1>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </>
  )
}

export default App
