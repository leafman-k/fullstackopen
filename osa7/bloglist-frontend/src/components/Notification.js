import React from 'react'
import {connect} from 'react-redux'

const Notification = (props) => {

  return (
      <div>
      {
        props.notification.content !== '' ?
            <div className={props.notification.type}>
              {props.notification.content}
            </div> : <div></div>
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