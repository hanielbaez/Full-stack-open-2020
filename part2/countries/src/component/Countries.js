import React from 'react'
import CountryView from './CountryView'
import ShowButton from './ShowButton'

const Countries = ({ countries, setCountry, weather }) => {
    if (countries.length === 1) {
        return <CountryView
            country={countries[0]}
            weather={weather} />
    }
    else if (countries.length < 10) {
        return (
            countries.map(country =>
                (
                    <div key={country.numericCode} >
                        {country.name} <ShowButton country={country} setCountry={setCountry} />

                    </div>
                )
            )
        )
    } else {
        return <p>Too many matches, specify another filter</p>
    }
}

export default Countries