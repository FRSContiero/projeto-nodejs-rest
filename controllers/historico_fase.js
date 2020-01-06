const Historico_Fase = require('../models/historicos_fase')

module.exports = app => {
    app.get('/historicos-fase', (req, res) => {
        Historico_Fase.lista(res)
    })

    app.get('/historicos-fase/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Historico_Fase.buscaPorId(id, res)
    })

    app.post('/historicos-fase', (req, res) => {
        const historico_fase = req.body

        Historico_Fase.adiciona(historico_fase, res)
    })

    app.patch('/historicos-fase/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Historico_Fase.altera(id, valores, res)
    })

    app.delete('/historicos-fase/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Historico_Fase.deleta(id, res)
    })
}