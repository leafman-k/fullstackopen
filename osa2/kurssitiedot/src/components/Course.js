import React from 'react'

const Header = ({name}) => {
    return (
        <div>
            <h1>{name}</h1>
        </div>
    )
}
const Part = ({name, exercise}) => {
    return (
        <p>{name} {exercise}</p>
    )
}
const Content = ({parts}) =>{

    return (
        <div>
            {parts.map(part=> <Part key={part.id} name={part.name} exercise={part.exercises}/>)}
        </div>
    )
}
const Total = ({parts}) => {

    const total = parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <p>Total of exercises {total} </p>
    )
}


const Course = ({course}) =>{

    return (
        <div>
            <Header name={course.name}/>
            <Content parts={course.parts} />
            <Total parts={course.parts}/>
        </div>
    )


}

export default Course