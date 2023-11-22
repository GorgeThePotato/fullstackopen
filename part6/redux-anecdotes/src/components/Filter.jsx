import filterReducer, { filterChange } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
      event.preventDefault()
      dispatch(filterChange(event.target.value))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div>
        <h2>Anecdotes</h2>
        <div style={style}>
          filter <input onChange={handleChange} />
        </div>
      </div>
    )
  }
  
  export default Filter