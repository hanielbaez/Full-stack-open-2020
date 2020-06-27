import axios from 'axios'
const baseUrl = '/persons'

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data)
}

const create = (newPersonObj) => {
    return axios
        .post(baseUrl, newPersonObj)
        .then(response => response.data)
}

const Delete = (id) => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .then(response => response.data)
}

const Update = (updatePersonObj) => {
    return axios
        .put(`${baseUrl}/${updatePersonObj.id}`, updatePersonObj)
        .then(response => response.data)
}

export default { getAll, create, Delete, Update }