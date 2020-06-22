import React from 'react'
import DeleteButton from './DeleteButton'

const Persons = ({ persons, handleOnDelete }) => {
    return persons.map(person =>
        <div key={person.name}>
            {person.name} {person.number}
            <DeleteButton
                person={person}
                handleOnDelete={handleOnDelete}
            />
        </div>
    )
}
export default Persons