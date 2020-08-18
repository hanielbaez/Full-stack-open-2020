import React, { useState } from 'react'
import { useCountry } from './hooks/index'
import Country from './components/Country'

const App = () => {
  const [search, setSearch] = useState('')
  const country = useCountry(search)

  const handleOnChange = (event) => {
    const value = event.target.value
    if (value.length > 3) {
      setSearch(value)
    }
  }

  return (
    <>
      <div>
        <input onChange={handleOnChange}></input>
        <button>find</button>
      </div>
      <Country country={country.value} search={search} />
    </>
  )
}

export default App