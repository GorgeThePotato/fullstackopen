import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotificationMessage(state,action){
            const content = action.payload
            return content
        },
        hideNotification(state,action){
            const content = action.payload
            return content
        }
    }
})

export const { setNotificationMessage, hideNotification } = notificationSlice.actions

export const setNotification = (content,timeout) => {
    return async dispatch => {
        const notifiationMessage = content
        const timeoutInSeconds = timeout
        dispatch(setNotificationMessage(notifiationMessage))
        setTimeout(() => {
            dispatch(hideNotification(null))
        },timeoutInSeconds * 1000)
    }
}

export default notificationSlice.reducer