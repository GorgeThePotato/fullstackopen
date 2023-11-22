import { useDispatch, useSelector } from "react-redux";
import anecdoteReducer,{ voteAnecdote } from "../reducers/anecdoteReducer";
import notificationReducer, {setNotification,hideNotification} from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick}) => {
    return (
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () =>{
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ filter, anecdotes }) =>{
        if(filter === 'ALL'){
            return anecdotes
        }
        else {
            return anecdotes.filter(anecdote => anecdote.content.match(filter))
        }
    })
    const compareByVotes = (a,b) =>{
        return b.votes - a.votes
    }
    const anecdotesToSort = [...anecdotes]
    const sortedAnecdotes = anecdotesToSort.sort(compareByVotes)

    const addVote = (anecdote) =>{
        dispatch(voteAnecdote(anecdote.id))
        dispatch(setNotification(`You've voted ${anecdote.content}`,5))
    }

    return(
        <div>
            {sortedAnecdotes.map(anecdote =>
                <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => addVote(anecdote)}
                />
            )}
        </div>
    )
}

export default AnecdoteList