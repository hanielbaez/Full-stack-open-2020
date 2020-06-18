import React from 'react'

const Total = ({ parts }) => {
    const total = parts.reduce((total, current) => {
        return total + current.exercises
    }, 0)
    return <b>Number of exercises {total}</b>
}

export default Total