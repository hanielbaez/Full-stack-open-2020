import React from 'react'

const Weather = ({ weather }) => {
    return (
        <>
            <h3>Weather in {weather.location?.name ?? 'N/A'}</h3>
            <p><span>temperature:</span> {weather.current?.temperature ?? 'N/A'} Celcius</p>
            <img src={weather.current?.weather_icons ?? '#'} alt="weather icon" />
            <p><span>wind:</span> {weather.current?.wind_speed ?? 'N/A'} mph direction SSW</p>
        </>
    )
}

export default Weather