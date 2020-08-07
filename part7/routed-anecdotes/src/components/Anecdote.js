import React from 'react'

const Anecdote = ({ anecdote }) => {
    return (
        <>
            <h2>{anecdote.content} by {anecdote.author}</h2>
            <p>has {anecdote.votes} votes</p>
            <p> for more info see <a href={anecdote.url}>{anecdote.url}</a></p>
        </>
    )
}
export default Anecdote