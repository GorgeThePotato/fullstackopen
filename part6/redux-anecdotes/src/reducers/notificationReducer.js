import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notifyVote(state,action){
            const content = action.payload
            return `You voted ${content}`
        },
        notifyAnecdote(state,action){
            const content = action.payload
            return `You added ${content}`
        },
        hideNotification(state,action){
            const content = action.payload
            return content
        }
    }
})

export const { notifyVote, notifyAnecdote, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer