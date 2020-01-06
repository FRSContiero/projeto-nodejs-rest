const Endereco = require('../models/enderecos')

module.exports = app => {
    app.get('/enderecos', (req, res) => {
        Endereco.lista(res)
    })

    app.get('/enderecos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Endereco.buscaPorId(id, res)
    })

    app.post('/enderecos', (req, res) => {
        const endereco = req.body

        Endereco.adiciona(endereco, res)
    })

    app.patch('/enderecos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Endereco.altera(id, valores, res)
    })

    app.delete('/enderecos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Endereco.deleta(id, res)
    })
}