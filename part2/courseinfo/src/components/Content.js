import React from 'react'
import Part from './Part'
import Total from './Total'

const Content = ({ parts }) => {
    const totalExercises = parts.reduce((sum, acc) => sum+=acc.exercises , 0)

    return (
        <>
            {parts.map(part => {
                return (
                    <Part key={part.id} name={part.name} exercises={part.exercises} />
                )
            })}
            <Total totalExercises={totalExercises}/>
        </>
    )
}

export default Content