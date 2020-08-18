import axios from 'axios'
import { useState, useEffect } from 'react'

export const useCountry = (search) => {
    const [value, setValue] = useState(null)

    useEffect(() => {
        axios.get(`https://restcountries.eu/rest/v2/name/${search}?fullText=true`)
            .then(response => {
                setValue(response.data[0])
            })
            .catch(e => {
                console.log(e.message)
                setValue(null)
            })
    }, [search])

    return {
        value
    }
}
