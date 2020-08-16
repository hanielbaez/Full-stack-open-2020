import React, { useState } from 'react'

const CommentForm = ({ createComment }) => {
    const [comment, setComment] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        createComment(comment).then(_ => {
            setComment('')
        })
    }

    const hanldeChange = (event) => {
        setComment(event.target.value)
    }

    return (
        <>
            <form>
                <input value={comment} onChange={hanldeChange}></input>
                <button onClick={(e) => handleSubmit(e)}>add comment</button>
            </form>
        </>
    )
}

export default CommentForm