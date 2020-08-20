import React from 'react'
import { useQuery } from '@apollo/client'

import { ALL_USERS } from '../queries'

import AuthorUpdate from './AuthorUpdate'

const Authors = () => {
    const { loading, data, error } = useQuery(ALL_USERS)

    if (loading) return <p>loading...</p>

    if (error) return <p>Error {error.message}</p>

    return (
        <div>
            <h2>authors</h2>
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <td><b>born</b></td>
                        <td><b>books</b></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.allAuthors.map(author =>
                            (
                                <tr key={author.id}>
                                    <td>{author.name}</td>
                                    <td>{author.born}</td>
                                    <td>{author.bookCount}</td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
            <AuthorUpdate authors={data.allAuthors} />
        </div>
    )
}

export default Authors