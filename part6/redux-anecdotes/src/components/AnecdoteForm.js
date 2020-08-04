import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleSubmit = event => {
        event.preventDefault()
        dispatch(addAnecdote(event.target.note.value))
        dispatch(setNotification(event.target.note.value, 3))
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