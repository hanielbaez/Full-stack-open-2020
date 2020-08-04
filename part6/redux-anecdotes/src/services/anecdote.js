import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

const create = async content => {
    const object = { content: content, votes: 0, }
    const response = await axios.post(baseURL, object)
    return response.data
}

const update = async anecdote => {
    const response = await axios.put(`${baseURL}/${anecdote.id}`, anecdote)
    return response.data
}

export default { getAll, create, update }