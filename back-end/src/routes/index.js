const express = require('express')
const addOngsRoutes = require('./ongs')
const addIncidentsRoutes = require('./incidents')

module.exports = () => {
    const routes = express.Router()

    addOngsRoutes(routes)
    addIncidentsRoutes(routes)

    return routes
}
