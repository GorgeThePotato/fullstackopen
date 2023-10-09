import Input from "./Input";

const Form = ({addNumber,newName,handleNameChange,newNumber,handleNumberChange}) =>{
    return(
        <form onSubmit={addNumber}>
          <div>name:
            <Input value={newName} onChange={handleNameChange}/>
          </div>
          <div>number:
            <Input value={newNumber} onChange={handleNumberChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
}

export default Form;