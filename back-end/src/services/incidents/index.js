const connection = require('../../database/connection')

async function create (incident, ongId) {
    const { title, description, value } = incident

    const [id] = await connection('incidents').insert({
        title,
        description,
        value,
        ong_id: ongId
    })

    return id
}

async function list (page) {
    return connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ])
}

async function count () {
    return connection('incidents').count()
}

async function remove (id, ongId) {
    const removedIncidents = await connection('incidents').where('id', id).and.where('ong_id', ongId).delete()

    return removedIncidents > 0
}

async function listByOngId (ongId) {
    const incidents = await connection('incidents').where('ong_id', ongId).select('*')

    return incidents
}

module.exports = {
    create,
    list,
    listByOngId,
    remove,
    count
}
