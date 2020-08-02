import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const handleSubmit = event => {
        dispatch(addAnecdote(event))
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