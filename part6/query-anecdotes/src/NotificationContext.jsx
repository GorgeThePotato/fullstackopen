import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state,action) => {
    switch (action.type) {
      case 'VOTE':
        return `${action.content} voted`  
      case 'NEW_ANECDOTE':
        return `New anecdote ${action.content} added`;
      case 'HIDE':
        return null
      case 'ERROR':
        return `too short anecdote, must have lenght 5 or more`
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)
    return (
        <NotificationContext.Provider value={[notification,notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>    
    )
}

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () =>{
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export default NotificationContext