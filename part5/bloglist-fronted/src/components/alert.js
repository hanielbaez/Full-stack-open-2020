import React from 'react'

const Alert = ({ alert }) => {
    return (
        alert && <p className={alert.state ? 'alertGood' : 'alertBad'}>{alert.text}</p>
    )
}

export default Alert