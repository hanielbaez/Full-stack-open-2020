import React from 'react'
import Weather from './Weather'
import Languages from './Languages'

const CountryView = ({ country, weather }) => {
    return (
        <>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>languages</h3>
            <ul>
                <Languages languages={country.languages} />
            </ul>
            <img src={country.flag}
                alt="Country Flag"
                width="30%"
                height="30%" />
            <Weather weather={weather} />
        </>
    )
}

export default CountryView