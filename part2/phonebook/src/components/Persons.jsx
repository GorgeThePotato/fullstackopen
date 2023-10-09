const Persons = ({persons, searchName}) =>{
    return(
        <ul>
        {persons
          .filter(person => person.name.match(searchName))
          .map(person =>{
            return <li key={person.name}>{person.name} {person.number}</li>
          })}
      </ul>
    )
}

export default Persons;