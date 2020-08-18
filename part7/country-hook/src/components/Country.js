import React from 'react'

const Country = ({ country, search }) => {
    if (search.length > 3 && !country) {
        return <p>not found...</p>
    }

    if (!country) {
        return null
    }

    return (
        <div>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population  {country.population}</p>
            <img src={country.flag} alt={`${country.name}'s flag`} height='100px' />
        </div>
    )
}

export default Country