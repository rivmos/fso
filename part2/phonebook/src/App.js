import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import personServices from './services/persons'
import Heading from './components/Heading'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [filterQuery, setFilterQuery] = useState('')
  const [error, setError] = useState({message:'', color:'black'})

  const handleNewRecord = (event) => {
    event.preventDefault()

    const isAlreadyAdded = persons.find(person => person.name === newPerson.name.toLowerCase().trim())

    if (!isAlreadyAdded) {
      personServices
        .create(newPerson)
        .then(personAdded => {
          setPersons(persons.concat(personAdded))
          setNewPerson({ name: '', number: '' })
          setError({message:`${personAdded.name} Added`,color:'green'})
          setTimeout(() => {
            setError({message:'', color:'black'})
          }, 2000)
        })
    }
    else {
      const shouldUpdate = window.confirm(`${newPerson.name} name already exists!, do you want to change the number?`)
      if (shouldUpdate) {
        personServices
          .update(isAlreadyAdded.id, newPerson)
          .then(updatedRecord => setPersons(persons.map(person => person.id === isAlreadyAdded.id ? updatedRecord : person)))
          .catch(err => {
            setError({message:`${err.message}, ${isAlreadyAdded.name} is already removed from the server`, color:'red'})
            setTimeout(()=>{
              setError({message:'', color:'black'})
            },2000)
          })
      }

      setNewPerson({ name: '', number: '' })
    }
  }


  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/persons/${id}`)
      .then(() => setPersons(persons.filter(person => person.id !== id)))
      .catch(err => {
        setError({message:err.message, color:'red'})
        setTimeout(()=>{
          setError({message:'', color:'black'})
        },2000)
      })

  }


  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterQuery.toLowerCase()))

  return (
    <>
      <Heading text="Phonebook" />
      <Notification message={error.message} messageColor={error.color} />
      <Filter filterQuery={filterQuery} setFilterQuery={setFilterQuery} />

      <Heading text="Add New" />
      <PersonForm newPerson={newPerson} setNewPerson={setNewPerson} handleNewRecord={handleNewRecord} />

      <Heading text="Numbers" />
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </>
  )
}

export default App