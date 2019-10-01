import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import {voteAnecdote} from '../reducers/anecdoteReducer'
const AnecdoteList = (props) => {

  const vote = (id) => {
    console.log('vote', id)

    const anecdote = props.visibleAnecdotes.find(anecdote => anecdote.id === id)

    props.voteAnecdote(id, {...anecdote, votes: anecdote.votes + 1})
    console.log('Anecdote:', anecdote.content)
    props.setNotification(`You voted '${anecdote.content}'`, 3)

  }

  return (
      <div>
        {props.visibleAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
        )}
      </div>
  )
}
const anecdotesToShow = ({filter, anecdotes}) => {
  console.log("Filter: ", filter)
  if(filter !==''){
    return anecdotes.filter((anecdote) =>{
      return anecdote.content.toUpperCase().includes(filter.toUpperCase())
    })
  }
  return anecdotes

}
const mapDispatchToProps = {
  setNotification, voteAnecdote
}
const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList