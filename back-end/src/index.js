const express = require('express')
const routes = require('./routes')
const cors = require('cors')

const app = express()
const port = 8080

app.use(cors())
app.use(express.json())
app.use(routes())

app.listen(port, (req, res) => {
    console.log(`Server listening on port ${port}`)
})
