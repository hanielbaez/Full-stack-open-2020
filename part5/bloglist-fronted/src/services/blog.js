import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const create = async blog => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, blog, config)
    return response.data
}

const updateLikes = async blog => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
    return response.data
}

const remove = async id => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response
}

export default {
    getAll,
    create,
    setToken,
    updateLikes,
    remove
}