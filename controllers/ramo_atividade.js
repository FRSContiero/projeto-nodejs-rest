const Ramo_Atividade = require('../models/ramos_atividade')

module.exports = app => {
    app.get('/ramos-atividade', (req, res) => {
        Ramo_Atividade.lista(res)
    })

    app.get('/ramos-atividade/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Ramo_Atividade.buscaPorId(id, res)
    })

    app.post('/ramos-atividade', (req, res) => {
        const ramo_atividade = req.body

        Ramo_Atividade.adiciona(ramo_atividade, res)
    })

    app.patch('/ramos-atividade/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Ramo_Atividade.altera(id, valores, res)
    })

    app.delete('/ramos-atividade/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Ramo_Atividade.deleta(id, res)
    })
}