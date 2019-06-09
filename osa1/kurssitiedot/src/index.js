import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <div>
            <h1>{props.course.name}</h1>
        </div>
    )
}
const Part = (props) => {
    return (
        <p>{props.name} {props.exercise}</p>
    )
}
const Content = (props) =>{

    return (
        <div>
            {props.parts.map((part, index)=> <Part key={index} name={part.name} exercise={part.exercises}/>)}
        </div>
    )
}
const Total = (props) => {
    let sum = 0;

    props.parts.forEach(part => {
        sum += part.exercises;
    })

    return (
        <p>Number of exercises {sum} </p>
    )
}

const App = () => {

    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course}/>
            <Content parts={course.parts} />
            <Total parts={course.parts}/>
        </div>
        )

    }


ReactDOM.render(<App />, document.getElementById('root'))
