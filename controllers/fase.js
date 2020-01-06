const Fase = require('../models/fases')

module.exports = app => {
    app.get('/fases', (req, res) => {
        Fase.lista(res)
    })

    app.get('/fases/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Fase.buscaPorId(id, res)
    })

    app.post('/fases', (req, res) => {
        const fase = req.body

        Fase.adiciona(fase, res)
    })

    app.patch('/fases/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Fase.altera(id, valores, res)
    })

    app.delete('/fases/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Fase.deleta(id, res)
    })
}