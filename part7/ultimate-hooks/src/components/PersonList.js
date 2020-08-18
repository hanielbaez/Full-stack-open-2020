import React from 'react'

const PersonList = ({ persons }) => {
    return (
        <>
            {
                persons.map(person =>
                    <p key={person.id}>{person.name} {person.number}</p>
                )
            }
        </>
    )
}

export default PersonList