import React from 'react'

const Notification = ({ message, messageColor }) => {
    if (message === null) {
        return null
    }
    return (
        <div style={{color:messageColor}}>{message}</div>
    )
}

export default Notification