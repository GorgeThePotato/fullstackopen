const Persons = ({persons, searchName, deleteUser}) =>{
    return(
        <ul>
        {persons
          .filter(person => person.name.match(searchName))
          .map(person =>{
            return <li key={person.name}>{person.name} {person.number} <button onClick={() => deleteUser(person.id)}>delete</button></li>
          })}
      </ul>
    )
}

export default Persons;