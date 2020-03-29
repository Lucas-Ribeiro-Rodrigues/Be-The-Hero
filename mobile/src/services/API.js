import axios from 'axios'

const api  = axios.create({
    baseURL: 'http://192.168.0.12:8080'
})

async function getAllIncidents(page) {

    const response = await api.get(`incidents?page=${page}`)

    return {
        incidents: response.data,
        count: response.headers['x-total-count']
    }
}

module.exports = {
    getAllIncidents
}