import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
    const [ persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')
    const [message, setMessage] = useState({text: null, type: null})

    useEffect(() => {

        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])
    const namesToShow = newFilter === ''
        ? persons
        : persons.filter(person => person.name.toLowerCase().startsWith(newFilter.toLowerCase()))

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }
    const handleFilterChange = (event) => {
        console.log(event.target.value)
        setNewFilter(event.target.value)
    }
    const addName = (event) => {
        event.preventDefault()

        const personObject = {
            name: newName,
            number: newNumber
        }
        const personToBeChanged = persons.find(person=> person.name === newName)

        if(personToBeChanged){
            if(window.confirm(`${personToBeChanged.name} is already added to phonebook, repalce the old number with new one`)) {
                personService
                    .update(personToBeChanged.id, personObject)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== personToBeChanged.id ? person : returnedPerson))
                        setMessage(
                            {text: `Person '${returnedPerson.name}' phone number was updated`, type: 'info'}
                        )
                        setTimeout(() => {
                            setMessage({text: null, type: null})
                        }, 2000)
                    })
            }

            setNewName('')
            setNewNumber('')
            return
        }

        personService
            .create(personObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                return returnedPerson

            })
            .then( (returnedPerson) =>{
                setMessage(
                    {text: `Person '${returnedPerson.name}' was added`, type: 'info'}
                )
                setTimeout(() => {
                    setMessage({text: null, type: null})
                }, 2000)
                setNewName('')
                setNewNumber('')
        })


    }
    const removePerson = (id) =>{

        const personToBeRemoved = persons.find((person)=> person.id === id)

        if(!window.confirm(`Remove ${personToBeRemoved.name}`)){
            return false
        }

        personService
            .remove(id)
            .then((response) =>{
                setPersons(persons.filter(person => person.id !== id))

            })
            .then(()=>{
                setMessage(
                    {text: `Person '${personToBeRemoved.name}' was removed`, type: 'info'}
                )
                setTimeout(() => {
                    setMessage({text: null, type: null})
                }, 2000)
            })
            .catch(error => {
                setMessage(
                    {text: `Person '${personToBeRemoved.name}' was already removed from server`, type: 'error'}
                )
                setPersons(persons.filter(person => person.id !== personToBeRemoved.id))
                setTimeout(() => {
                    setMessage({text: null, type: null})
                }, 2000)
            })
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message}/>
            <Filter filter={newFilter} handleChange={handleFilterChange}/>

            <h2>Add new</h2>
            <PersonForm add={addName}
                        name={newName}
                        number={newNumber}
                        handleNameChange={handleNameChange}
                        handleNumberChange={handleNumberChange}/>
            <h2>Numbers</h2>
            <Persons namesToShow={namesToShow} handleRemoval={removePerson}/>
        </div>
    )

}

export default App