import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {setNotification} from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {

  const createNew = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification(`You created anecdote '${content}'`, 3)
  }
  return (
      <div>
        <h2>create new</h2>
        <form
            onSubmit={createNew}>
          <div><input
              name="anecdote" />
            </div>
            <button type="submit">create</button>
        </form>
      </div>
  )
}

export default connect(
    null,
    { setNotification, createAnecdote }
)(AnecdoteForm)