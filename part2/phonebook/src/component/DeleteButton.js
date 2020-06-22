import React from 'react'

const DeleteButton = ({ person, handleOnDelete }) => {
    return <button
        onClick={() => handleOnDelete(person)}>
        delete
            </button>
}

export default DeleteButton