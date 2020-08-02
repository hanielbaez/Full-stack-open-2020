import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch()

    const handleClick = id => {
        dispatch(addVote(id))
    }
    return (
        <div className='anecdote'>
            <p>{anecdote.content}</p>
        has {anecdote.votes} <button onClick={() => handleClick(anecdote.id)}>vote</button>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)

    const anecdoteSortByVote = () => {
        return anecdotes.sort((a, b) => b.votes - a.votes)
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