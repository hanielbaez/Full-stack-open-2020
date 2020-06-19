import React, { useState } from 'react'
import Filter from './Filter'
import Persons from './Persons'
import PersonForm from './PersonForm'

const App = (props) => {
    const [persons, setPersons] = useState(props.persons)

    //this state is use for the filter name
    const [filteredPersona, setFiltered] = useState(persons)

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameChange = (event) => setNewName(event.target.value)

    const handleNumberChange = (event) => setNewNumber(event.target.value)

    //helper function
    const isValidData = () => {
        const isAlready = persons.some(person =>
            person.name === newName || person.name === '')
        if (isAlready) {
            window.alert(`${newName} is already added to phonebook`)
            return false
        }
        return true
    }

    const handleOnSubmit = (event) => {
        event.preventDefault()
        if (isValidData()) {
            const personObj = {
                name: newName,
                number: newNumber
            }
            setPersons(persons.concat(personObj))
            setFiltered(persons.concat(personObj))
        }
    }

    const handleFilterChange = (event) => {
        const value = event.target.value.toLowerCase()
        const filtered = persons.filter(person =>
            person.name
                .toLowerCase()
                .trim()
                .includes(value)
        )
        setFiltered(filtered)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter onChange={handleFilterChange} />
            <h3>add a new number</h3>
            <PersonForm
                newName={newName}
                newNumber={newNumber}
                handleOnSubmit={handleOnSubmit}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
            />
            <h3>Numbers</h3>
            <Persons persons={filteredPersona} />
        </div>
    )
}
export default App