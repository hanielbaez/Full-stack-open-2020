import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const handleSubmit = event => {
        event.preventDefault()
        props.addAnecdote(event.target.note.value)
        props.setNotification(event.target.note.value, 3)
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

const mapDispatchToProps = {
    addAnecdote,
    setNotification
}

const ConnectedForm = connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)

export default ConnectedForm