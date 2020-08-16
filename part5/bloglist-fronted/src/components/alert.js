import React from 'react'
import { useSelector } from 'react-redux'

const Alert = () => {
    const alert = useSelector(state => state.alert)
    return (
        alert && <div className={`notification ${alert.state ? 'is-success' : 'is-warning'}`}>
            {alert.text}
        </div>
    )
}

export default Alert