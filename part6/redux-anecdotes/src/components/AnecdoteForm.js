import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { notificationAdd } from '../reducers/notificationReducer'
import anecdoteServices from '../services/anecdote'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleSubmit = event => {
        event.preventDefault()
        anecdoteServices.create(event.target.note.value)
            .then(newAnecdote => {
                dispatch(addAnecdote(newAnecdote))
                dispatch(notificationAdd())
            })
            event.target.note.value = ''
    }

    return (
        <div>
            <b>Add new note</b>
            <form onSubmit={handleSubmit}>
                <input name='note'></input>
                <button type='submit'>add</button>
            </form>
        </div>
    )
}

export default AnecdoteForm