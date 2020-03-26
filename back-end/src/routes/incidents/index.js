const { Router } = require('express')
const { create, list, listByOngId, remove, count } = require('../../services/incidents')

module.exports = (app) => {
    const routes = Router()

    app.use('/incidents', routes)

    routes.get('/', async (req, res) => {
        try {
            const { page = 1 } = req.query

            const [total] = await count()

            const incidents = await list(page)

            res.header('X-Total-Count', total['count(*)'])
            res.json(incidents)
        } catch (error) {
            console.log(error.message)
            res.status(500).send(error)
        }
    })

    routes.get('/byOngId', async (req, res) => {
        try {
            const ongId = req.headers.authorization
            const incidents = await listByOngId(ongId)

            return res.json(incidents)
        } catch (error) {
            console.log(error.message)
            res.status(500).send(error)
        }
    })

    routes.post('/', async (req, res) => {
        try {
            const ongId = req.headers.authorization
            const id = await create(req.body, ongId)

            res.json({ id })
        } catch (error) {
            console.log(error.message)
            res.status(500).send(error)
        }
    })

    routes.delete('/:id', async (req, res) => {
        try {
            const { id } = req.params
            const ongId = req.headers.authorization

            const statusCode = await remove(id, ongId) ? 204 : 401
            res.status(statusCode).send()
        } catch (error) {
            console.log(error.message)
            res.status(500).send(error)
        }
    })
}
