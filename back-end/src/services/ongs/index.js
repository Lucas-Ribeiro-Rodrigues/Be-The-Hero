const crypto = require('crypto')

const connection = require('../../database/connection')

async function create (ong) {
    const { name, email, whatsapp, city, uf } = ong

    const id = crypto.randomBytes(4).toString('HEX')

    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
    })

    return id
}

async function list () {
    return connection('ongs').select('*')
}

async function login (id) {
    return connection('ongs')
        .where('id', id)
        .select('name')
        .first()
}

module.exports = {
    create,
    list,
    login
}
