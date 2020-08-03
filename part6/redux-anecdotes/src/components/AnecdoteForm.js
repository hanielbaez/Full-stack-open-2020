import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { notificationAdd } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const handleSubmit = event => {
        dispatch(addAnecdote(event))
        dispatch(notificationAdd())
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