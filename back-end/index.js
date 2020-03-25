const express = require('express')
const app = express()
const port = 3000

app.listen(port, (req, res) => {
    console.log(`Server listening on port ${port}`)
})

app.get("/", (req, res) => {
    return res.json({
        event: "Omnistack Week 11.0",
        student: "Lucas Ribeiro Rodrigues"
    })
})
