import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const CreateNew = ({ createAnecdote }) => {
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setURL] = useState('')
    const history = useHistory()

    const handleSubmit = () => {
        const anecdoteObj = {
            content: content,
            author: author,
            info: url,
            votes: 0
        }
        createAnecdote(anecdoteObj)
        history.push('/')
    }

    return (
        <>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content <input value={content} onChange={(event) => setContent(event.target.value)} />
                </div>
                <div>
                    author <input value={author} onChange={(event) => setAuthor(event.target.value)} />
                </div>
                <div>
                    url for more info <input value={url} onChange={(event) => setURL(event.target.value)} />
                </div>
                <div>
                    <button type='submit'>create</button>
                </div>
            </form>
        </>
    )
}

export default CreateNew