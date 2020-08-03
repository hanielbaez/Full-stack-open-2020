import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { notificationVote } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch()

    const handleClick = ({ id, content }) => {
        dispatch(addVote(id))
        dispatch(notificationVote(content))
    }
    return (
        <div className='anecdote'>
            <p>{anecdote.content}</p>
        has {anecdote.votes} <button onClick={() => handleClick(anecdote)}>vote</button>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const toShow = filter ? filter : anecdotes

    const anecdoteSortByVote = () => {
        return toShow.sort((a, b) => b.votes - a.votes)
    }

    return (
        <>
            {anecdoteSortByVote().map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote} />
            )}
        </>
    )
}

export default AnecdoteList