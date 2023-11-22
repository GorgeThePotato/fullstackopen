import { useDispatch } from "react-redux";
import anecdoteReducer, { addAnecdote } from "../reducers/anecdoteReducer";
import notificationReducer, { setNotification, hideNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = async (event) =>{
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(content))
        dispatch(setNotification(`You've added ${content}`,5))
    }
    return(
        <form onSubmit={createAnecdote}>
            <div><input name='anecdote' /></div>
            <button type='submit'>create</button>
        </form>
    )
}
export default AnecdoteForm