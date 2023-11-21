import { useDispatch, useSelector } from "react-redux";
import anecdoteReducer,{ voteAnecdote } from "../reducers/anecdoteReducer";

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

    return(
        <div>
            {sortedAnecdotes.map(anecdote =>
                <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => dispatch(voteAnecdote(anecdote.id))}
                />
            )}
        </div>
    )
}

export default AnecdoteList