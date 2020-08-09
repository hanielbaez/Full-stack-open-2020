import React from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks/index'

const CreateNew = ({ createAnecdote }) => {
    const content = useField('text')
    const author = useField('text')
    const url = useField('url')
    const history = useHistory()

    const handleSubmit = (event) => {
        event.preventDefault()
        const anecdoteObj = {
            content: content.value,
            author: author.value,
            info: url.value,
            votes: 0
        }
        createAnecdote(anecdoteObj)
        history.push('/')
    }

    const resetFields = () => {
        content.reset()
        author.reset()
        url.reset()
    }

    return (
        <>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit} onReset={resetFields}>
                <div>
                    content <input {...content} reset='' />
                </div>
                <div>
                    author <input {...author} reset='' />
                </div>
                <div>
                    url for more info <input {...url} reset='' />
                </div>
                <div>
                    <button type='submit'>create</button>
                    <button type='reset'>reset</button>
                </div>
            </form>
        </>
    )
}

export default CreateNew