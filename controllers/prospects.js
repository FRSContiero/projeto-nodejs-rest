const Prospect = require('../models/prospect')

module.exports = app => {
    app.get('/prospects', (req, res) => {
        Prospect.lista(res)
    })

    app.get('/prospects/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Prospect.buscaPorId(id, res)
    })

    app.post('/prospects', (req, res) => {
        const prospect = req.body

        Prospect.adiciona(prospect, res)
    })

    app.patch('/prospects/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Prospect.altera(id, valores, res)
    })

    app.delete('/prospects/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Prospect.deleta(id, res)
    })
}