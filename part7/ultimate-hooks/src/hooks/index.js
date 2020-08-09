import { useEffect, useState } from 'react'
import axios from 'axios'

export const useResource = (resource) => {
    const baseURL = `http://localhost:3005/${resource}`
    const [value, setValue] = useState([])

    useEffect(() => {
        axios.get(baseURL).then(response => {
            setValue(response.data)
        })
    }, [baseURL])

    const createResource = async (object) => {
        const response = await axios.post(baseURL, object)
        setValue([...value, response.data])
        return response.data
    }

    return {
        value,
        createResource
    }

}

export const useField = (type) => {
    const [value, setValues] = useState('')

    const onChange = (event) => {
        setValues(event.target.value)
    }

    const reset = () => {
        setValues('')
    }

    return {
        value,
        onChange,
        type,
        reset
    }
}   