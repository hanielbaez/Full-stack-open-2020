import React, { useState, useEffect } from 'react'
import personService from '../services/person'

import Filter from './Filter'
import Persons from './Persons'
import PersonForm from './PersonForm'

const App = () => {
    const [persons, setPersons] = useState([])

    //this state is use for the filter name
    const [filteredPersona, setFiltered] = useState()

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameChange = (event) => setNewName(event.target.value)

    const handleNumberChange = (event) => setNewNumber(event.target.value)

    //effect callback
    const hook = () => {
        personService
            .getAll()
            .then(personsData => {
                setPersons(personsData)
            })
    }

    useEffect(hook, [])

    //helper function
    const isValidData = () => {
        if (newName.trim() === '' || newNumber.length < 3) return

        const findedPerson = persons.find(person => person.name === newName)

        if (findedPerson) {
            const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
            console.log()
            if (result) {
                const newPerson = {
                    id: findedPerson.id,
                    name: newName,
                    number: newNumber
                }
                handleOnUpdate(newPerson)
            }
        }
    }

    const handleOnSubmit = (event) => {
        event.preventDefault()
        if (isValidData()) {
            const personObj = {
                name: newName,
                number: newNumber
            }
            personService
                .create(personObj)
                .then(() => {
                    setPersons(persons.concat(personObj))
                })
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

    const handleOnDelete = (person) => {
        const result = window.confirm(`Delete ${person.name}`)
        if (result) {
            personService
                .Delete(person.id)
            setPersons(persons.filter(p => p.id !== person.id))
        }
    }

    const handleOnUpdate = (updatePersonObj) => {
        personService
            .Update(updatePersonObj)
            .then(personData => {
                setPersons(persons.map(person => person.id === personData.id ? personData : person))
            })
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
            <Persons
                persons={filteredPersona ? filteredPersona : persons}
                handleOnDelete={handleOnDelete}
            />
        </div>
    )
}
export default App