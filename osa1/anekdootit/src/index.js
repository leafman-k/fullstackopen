import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({anecdote})=>{

    return (
        <p>{anecdote}</p>
    )
}
const BestAnecdote = ({anecdote})=>{

    return (
        <div>
            <h1>Anecdote with most votes</h1>
            <p>{anecdote}</p>
        </div>
    )
}
const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(new Uint8Array(6));
    const [maxVotes, setMaxVotes] = useState(props.anecdotes.length)

    const nextAnecdote = () => {
        let value = Math.floor(Math.random() * props.anecdotes.length)
        while(value === selected){
            value = Math.floor(Math.random() * props.anecdotes.length)
        }
        console.log('next', value)
        setSelected(value)

    }
    const vote = (value) => {
        const copy = [...points]
        copy[value] += 1
        console.log('Copy', copy)
        setPoints(copy)
        let max = copy.indexOf(Math.max(...copy));
        setMaxVotes(max);
    }
    return (
        <div>

            <Anecdote anecdote={props.anecdotes[selected]}/>
            <button onClick={()=>nextAnecdote()}>Next</button>
            <button onClick={()=>vote(selected)}>Vote</button>
            <BestAnecdote anecdote={props.anecdotes[maxVotes]}/>
        </div>
)
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
<App anecdotes={anecdotes} />,
document.getElementById('root')
)
