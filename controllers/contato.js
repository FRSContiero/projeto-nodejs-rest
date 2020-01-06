const Contato = require('../models/contatos')

module.exports = app => {
    app.get('/contatos', (req, res) => {
        Contato.lista(res)
    })

    app.get('/contatos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Contato.buscaPorId(id, res)
    })

    app.post('/contatos', (req, res) => {
        const contato = req.body

        Contato.adiciona(contato, res)
    })

    app.patch('/contatos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Contato.altera(id, valores, res)
    })

    app.delete('/contatos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Contato.deleta(id, res)
    })
}