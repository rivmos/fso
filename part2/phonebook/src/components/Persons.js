import React from 'react'
import axios from 'axios'

const Persons = ({ personsToShow, handleDelete }) => {

    return (
        <>
            {
                personsToShow.map(person => {
                    return( 
                    <div key={person.name}>
                        <span>{person.name} : {person.number}</span>
                        <button onClick={() => handleDelete(person.id)}>delete</button>
                    </div>
                    )
                })
            }
        </>
    )
}

export default Persons