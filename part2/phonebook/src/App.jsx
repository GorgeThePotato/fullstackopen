import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import axios from 'axios'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  const deleteUser = (id) =>{
    const user = persons.find(u => u.id === id);

    if(window.confirm(`Do you want to delete ${user.name}?`)){
      personService
      .deletePerson(user.id)

      personService
      .getAllPersons()
      .then(initialPersons =>{
        setPersons(initialPersons)
      })
    }

  }

  const addNumber = (event) => {
    event.preventDefault();
    
    const personNames = persons.map(person =>{
      return person.name;
    });
    
    const containsName = personNames.includes(newName);

    if(containsName === true){

      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){

        const user = persons.find(u => u.name === newName);
        const changedPerson = {...user, number: newNumber}
        personService
          .updatePerson(user.id, changedPerson)
          .then(response =>{
            setPersons(persons.map(person=>person.id !== user.id ? person : response.data))
          })

      }
    }
    else{
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      personService
        .createPerson(personObject)
        .then(newPerson =>{
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) =>{
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value);
  }

  const handleSearchChange = (event) =>{
    setSearchName(event.target.value)
  }

  useEffect(() =>{
    personService
      .getAllPersons()
      .then(initialPersons =>{
        setPersons(initialPersons)
      })
  },[]);

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter value={searchName} onChange={handleSearchChange}/>
      <h2>add a new</h2>
        <Form addNumber={addNumber} newName={newName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newNumber={newNumber}/>
      <h2>Numbers</h2>
        <Persons persons={persons} searchName={searchName} deleteUser={deleteUser}/>
    </div>
  )
}

export default App