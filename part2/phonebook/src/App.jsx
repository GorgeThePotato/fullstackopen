import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  const addNumber = (event) => {
    event.preventDefault();
    
    const personNames = persons.map(person =>{
      return person.name;
    });
    
    const containsName = personNames.includes(newName);

    if(containsName === true){

      window.alert(`${newName} is already added to the phonebook`)

    }
    else{
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
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
    axios
      .get('http://localhost:3001/persons')
      .then(response =>{
        setPersons(response.data)
      })
  },[])

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter value={searchName} onChange={handleSearchChange}/>
      <h2>add a new</h2>
        <Form addNumber={addNumber} newName={newName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newNumber={newNumber}/>
      <h2>Numbers</h2>
        <Persons persons={persons} searchName={searchName}/>
    </div>
  )
}

export default App