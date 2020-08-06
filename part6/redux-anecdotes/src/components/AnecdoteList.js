import React from 'react'
import { useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch()

    const handleClick = anecdote => {
        dispatch(addVote(anecdote))
        dispatch(setNotification(anecdote.content, 5))
    }
    return (
        <div className='anecdote'>
            <p>{anecdote.content}</p>
        has {anecdote.votes} <button onClick={() => handleClick(anecdote)}>vote</button>
        </div>
    )
}

const AnecdoteList = (props) => {
    const anecdotes = props.anecdotes
    const filter = props.filter

    // console.log(props)

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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
    }
}

const ConnectedAnecdotes = connect(mapStateToProps)(AnecdoteList)
export default ConnectedAnecdotes