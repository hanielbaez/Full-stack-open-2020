import React, { useState } from 'react'
import { useField } from '../hooks'

import { useMutation } from '@apollo/client'

import { ADD_BOOK, ALL_BOOKS } from '../queries'

const BookForm = ({ updateCacheWith }) => {
    const title = useField('text')
    const author = useField('text')
    const published = useField('number')
    const genre = useField('text')
    const [genres, setGenres] = useState([])

    const [addBook] = useMutation(ADD_BOOK,
        {
            refetchQueries: [{ query: ALL_BOOKS }],
        })

    const handleClick = (event) => {
        event.preventDefault()
        setGenres([...genres, genre.value])
        genre.reset()
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const bookObj = {
            title: title.value,
            author: author.value,
            published: Number(published.value),
            genres
        }

        addBook({ variables: bookObj })

        title.reset()
        author.reset()
        published.reset()
        genre.reset()
        setGenres([])
    }

    return (
        <div>
            <h2>add book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    tittle <input {...title} reset='' />
                </div>
                <div>
                    author <input {...author} reset='' />
                </div>
                <div>
                    published <input {...published} reset='' />
                </div>
                <div>
                    <input {...genre} reset='' />
                    <button onClick={handleClick}>add genre</button>
                </div>
                <div>
                    <p>genres: {genres.join(', ')}</p>
                </div>
                <button type='submit'>create book</button>
            </form>
        </div>
    )
}

export default BookForm