import { useSelector } from "react-redux"
import notificationReducer from "../reducers/notificationReducer"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if(notification === null){
    return null
  }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification