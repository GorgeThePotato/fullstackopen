import { useContext } from "react"
import { useNotificationValue } from "../NotificationContext"

const Notification = () => {

  const notification = useNotificationValue()
  if(notification === undefined || notification === null){
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
