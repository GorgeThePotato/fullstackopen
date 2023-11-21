import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notifyVote(state,action){
        },
        notifyAnecdote(state,action){
        }
    }
})

export const { notifyVote, notifyAnecdote } = notificationSlice.actions
export default notificationSlice.reducer