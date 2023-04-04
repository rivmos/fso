import React from 'react'

const Filter = ({ filterQuery, setFilterQuery }) => {
    return (
        <>
            <label>Filter Shown With:</label>
            <input value={filterQuery} onChange={(event) => setFilterQuery(event.target.value)} />
        </>
    )
}

export default Filter