import { useDispatch } from "react-redux";
import anecdoteReducer, { addAnecdote } from "../reducers/anecdoteReducer";
import notificationReducer, { notifyAnecdote, hideNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = (event) =>{
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(content))
        dispatch(notifyAnecdote(content))
        setTimeout(() => {
            dispatch(hideNotification(null))
        },5000)
    }
    return(
        <form onSubmit={createAnecdote}>
            <div><input name='anecdote' /></div>
            <button type='submit'>create</button>
        </form>
    )
}
export default AnecdoteForm