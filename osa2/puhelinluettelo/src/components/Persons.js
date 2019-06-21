import React from 'react'

const Persons = ({namesToShow, handleRemoval}) => {

    return (
        <div>
            {namesToShow.map((person) =>
                <p key={person.name}>{person.name} {person.number}
                    <button onClick={()=>handleRemoval(person.id)}>Delete</button>
                </p>)}
        </div>
    )
}

export default Persons