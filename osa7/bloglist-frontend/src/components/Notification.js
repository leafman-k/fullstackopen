import React from 'react'
import { connect } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = (props) => {

  return (
    <div>
      {
        props.notification.content &&
            <Alert variant={props.notification.type}>
              {props.notification.content}
            </Alert>

      }
    </div>
  )
}
const mapStateToProps = (state) => {
  console.log(state)
  return {
    notification: state.notification,
  }
}
export default connect(mapStateToProps)(Notification)