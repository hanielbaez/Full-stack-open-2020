import React from 'react'

const ShowButton = ({ country, setCountry }) => {
    return <button onClick={() => setCountry(country.name)} >show</button>
}

export default ShowButton