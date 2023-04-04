import React from 'react'

const Filter = ({ searchQuery, onChange }) => {
    return (
        <div>
            <span>find countries</span>
            <input value={searchQuery} onChange={onChange} />
        </div>
    )
}

export default Filter