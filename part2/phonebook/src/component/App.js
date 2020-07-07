import React, { useState, useEffect } from 'react'
import personService from '../services/person'

import Filter from './Filter'
import Persons from './Persons'
import PersonForm from './PersonForm'
import Notification from './Notification'

const App = () => {
    const [persons, setPersons] = useState([])

    //this state is use for the filter name
    const [filteredPersona, setFiltered] = useState()

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [notification, setNotification] = useState()

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
        if (newName.trim() === '' || newNumber.length < 3) return false

        const findedPerson = persons.find(person => person.name === newName)

        if (findedPerson) {
            const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
            if (result) {
                const newPerson = {
                    id: findedPerson.id,
                    name: newName,
                    number: newNumber
                }
                handleOnUpdate(newPerson)
            }
            return false
        }
        return true
    }

    const cleanForm = () => {
        setNewName('')
        setNewNumber('')
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
                .then((createdPerson) => {
                    setPersons(persons.concat(createdPerson))

                    cleanForm()

                    setNotification({ message: `Added ${newName}`, isSuccess: true })
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000)
                })
                .catch(error => {
                    setNotification({ message: error.response.data, isSuccess: false })
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000)
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
                let newListPersons = persons.map(person => person.name === personData.name ? personData : person)

                setPersons(newListPersons)
                setFiltered(newListPersons)

                cleanForm()
            })
            .catch((error) => {
                setNotification({ message: error.response.data, isSuccess: false })

                setPersons(persons.filter(p => p.id !== updatePersonObj.id))

                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            })
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification notification={notification} />
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