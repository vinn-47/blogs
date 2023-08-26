import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  if (notification === null || notification === undefined) {
    return null;
  }

  if (notification.isError) {
    return <div className="error">{notification.message}</div>;
  } else {
    return <div className="update">{notification.message}</div>;
  }
}

export default Notification
