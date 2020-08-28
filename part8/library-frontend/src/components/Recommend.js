import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommend = ({ favoriteGenre = 'n/a' }) => {
    const { data, loading, error } = useQuery(ALL_BOOKS, {
        variables: { filterBy: favoriteGenre }
    })
    const [books, setBooks] = useState([])

    useEffect(() => {
        setBooks(data?.allBooks || [])
    }, [data?.allBooks]) //eslint-disable-line

    if (loading) return <p>loading...</p>
    if (error) return <p>{error.message}</p>

    return (
        <div>
            <h2>recommendation</h2>
            <p>books in your favorite genre <b>{favoriteGenre}</b> </p>
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
        </div>
    )
}

export default Recommend