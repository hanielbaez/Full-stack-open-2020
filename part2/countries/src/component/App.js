import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './Countries'

const api_key = process.env.REACT_APP_API_KEY

const App = () => {
  const [countries, setCountries] = useState();
  const [searchResult, setSearchResult] = useState([])
  const [weather, setWeather] = useState()

  useEffect(() => {
    countries
      ?
      axios.get(`https://restcountries.eu/rest/v2/name/${countries}`)
        .then(response => {
          setSearchResult(response.data)
        }).catch(e => console.log('Error handle: ', e)
        )
      : console.log('There is not enough data for Restcountries API')
  }, [countries])

  useEffect(() => {
    searchResult.length !== 0
      ?
      axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${searchResult[0]?.capital}`)
        .then(response => {
          setWeather(response.data)
        })
        .catch(e => console.log('Weather api error: ', e))
      : console.log('There is not data for the weather API', searchResult)
  }, [searchResult])

  const hanldleInputChange = (event) => {
    const search = event.target.value
    setCountries(search)
  }

  return (
    <>
      <form>
        find countries <input
          type="text"
          onChange={hanldleInputChange} />
      </form>
      <Countries countries={searchResult}
        setCountry={setCountries}
        weather={weather} />
    </>
  )
}

export default App