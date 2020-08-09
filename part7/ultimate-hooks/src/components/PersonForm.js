import React from 'react'
import { useField, useResource } from '../hooks/index'
import PersonList from '../components/PersonList'

const PersonForm = () => {
    const name = useField('text')
    const number = useField('number')
    const personResource = useResource('persons')

    const handleClick = (event) => {
        event.preventDefault()
        const personObj = {
            name: name.value,
            number: number.value
        }

        personResource.createResource(personObj)
        name.reset()
        number.reset()
    }

    return (
        <div>
            <h2>persons</h2>
            <div>
                name <input {...name} reset='' />
            </div>
            <div>
                number <input {...number} reset='' />
                <button onClick={(e) => handleClick(e)}>create</button>
            </div>
            <PersonList persons={personResource.value} />
        </div>
    )
}

export default PersonForm