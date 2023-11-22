import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState: [],
  reducers:{
    appendAnecdote(state,action){
      state.push(action.payload)
    },
    setAnecdotes(state,action){
      return action.payload
    }
  }
})

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializedAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = content =>{
  return async dispatch =>{
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = content => {
  return async dispatch => {
    const id = content
    const anecdotes = await anecdoteService.getAll()
    const anecdoteToChange = anecdotes.find(n => n.id === id)
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }
    await anecdoteService.updateAnecdoteVotes(id,changedAnecdote)
    const refreshAnecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(refreshAnecdotes))
  }
}

export default anecdoteSlice.reducer