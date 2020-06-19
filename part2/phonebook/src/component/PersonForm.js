import React from 'react'

const PersonForm = ({ newName, newNumber, handleOnSubmit, handleNameChange, handleNumberChange }) => {
    return (
        <form onSubmit={handleOnSubmit}>
            <div>
                name: <input
                    value={newName}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                number: <input
                    value={newNumber}
                    onChange={handleNumberChange}
                />
            </div>
            <button type="submit">add</button>
        </form>
    )
}

export default PersonForm