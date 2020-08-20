import React from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = () => {
    const { data, loading, error } = useQuery(ALL_BOOKS)

    if (loading) return <p>loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div>
            <h2>books</h2>
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
                        data.allBooks.map(book =>
                            (
                                <tr key={book.id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.published}</td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Books