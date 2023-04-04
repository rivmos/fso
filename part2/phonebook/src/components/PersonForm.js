import React from 'react'

const PersonForm = ({ newPerson, setNewPerson, handleNewRecord }) => {
    return (
        <>
            <form>
                <label>Name:</label>
                <input value={newPerson.name.trim()} onChange={(event) => setNewPerson({ ...newPerson, name: event.target.value })} />
                <br />
                <label>Number:</label>
                <input value={newPerson.number} onChange={event => setNewPerson({ ...newPerson, number: event.target.value })} />
                <button onClick={handleNewRecord}>add</button>
            </form>
        </>
    )
}

export default PersonForm