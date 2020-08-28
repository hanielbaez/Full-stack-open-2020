import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const GenreButtons = ({ books, updateFilter }) => {
    let genres = []

    books.forEach(book => {
        for (var i in book.genres) {
            if (!genres.includes(book.genres[i])) {
                genres.push(book.genres[i])
            }
        }
    })

    return (<div>
        <button onClick={() => updateFilter(null)}>all genres</button>
        {
            genres.map(genre => <button
                onClick={() => updateFilter(genre)}
                key={genre}>{genre}</button>)
        }
    </div>)
}

const Books = () => {
    const { data, loading, error } = useQuery(ALL_BOOKS)
    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(null)

    useEffect(() => {
        if (!data?.allBooks) return
        switch (filterBy) {
            case null:
                setBooks(data.allBooks)
                break
            default:
                setBooks(applyFilter(filterBy))
        }

    }, [data?.allBooks, filterBy]) //eslint-disable-line

    const applyFilter = (filter) => {
        return data.allBooks.filter(book => {
            return book.genres.includes(filter)
        })
    }

    const updateFilter = (genre) => {
        setFilterBy(genre)
    }

    if (loading) return <p>loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div>
            <h2>books</h2>
            <p>in genre <b>{filterBy || 'all'}</b></p>
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <td><b>author</b></td>
                        <td><b>published</b></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map(book =>
                            (
                                <tr key={book.id}>
                                    <td>{book.title}</td>
                                    <td>{book.author.name}</td>
                                    <td>{book.published}</td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
            <GenreButtons books={data.allBooks} updateFilter={updateFilter} />
        </div>
    )
}

export default Books