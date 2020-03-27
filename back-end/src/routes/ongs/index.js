const { Router } = require('express')
const { create, list, login } = require('../../services/ongs')

module.exports = (app) => {
    const routes = Router()

    app.use('/ongs', routes)

    routes.post('/', async (req, res) => {
        const id = await create(req.body)

        res.json({ id })
    })

    routes.get('/', async (req, res) => {
        const ongs = await list()

        res.json(ongs)
    })

    routes.post('/session', async (req, res) => {
        const ongName = await login(req.body.id)

        if (!ongName) {
            return res.status(400).send('No ong found with this ID')
        }
        return res.json(ongName)
    })
}
