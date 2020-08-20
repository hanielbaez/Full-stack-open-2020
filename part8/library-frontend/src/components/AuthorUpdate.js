import React, { useState } from 'react';
import { useField } from '../hooks';

import { useMutation } from '@apollo/client'

import { AUTHOR_BORN } from '../queries'

const AuthorUpdate = ({ authors }) => {
    const born = useField('number')
    const [nameSelecte, setName] = useState(authors[0] && authors[0].name)

    const [setBorn] = useMutation(AUTHOR_BORN)

    const handleSubmit = (event) => {
        event.preventDefault()
        const authorObj = {
            name: nameSelecte,
            born: Number(born.value)
        }

        setBorn({ variables: authorObj })
        born.reset()
    }

    const handleChange = (event) => {
        setName(event.target.value)
    }

    return (
        <div>
            <h3>Set birthyear</h3>
            <form onSubmit={handleSubmit}>
                <div>
                   name <select value={nameSelecte}
                        onChange={handleChange}>
                        {authors.map(author =>
                            <option key={author.id} value={author.name}>
                                {author.name}
                            </option>)}
                    </select>
                </div>
                <div>
                    born <input {...born} reset='' />
                </div>
                <button>update author</button>
            </form>
        </div>
    )
}

export default AuthorUpdate