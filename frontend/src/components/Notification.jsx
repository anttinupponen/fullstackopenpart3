import PropTypes from 'prop-types'

// Styling for notifications
const notificationStyle = {
  background: 'lightgrey',
  fontSize: 16,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}


// message string, error bool
const Notification = ({ message, error }) => {

  if (message === '') {
    return null
  }

  const style = {
    ...notificationStyle,
    color: error ? 'red' : 'green'
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired
}


export default Notification