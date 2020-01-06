const conexao = require('../infraestrutura/conexao')

class Historicos_Fase {
    adiciona(historico_fase, res) {
        const sql = 'INSERT INTO Historico_Fase SET ?'

        conexao.query(sql, historico_fase, (erro) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(201).json(historico_fase)
            }
        })
    }
    
    lista(res) {
        const sql = 'SELECT * FROM Historico_Fase'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Historico_Fase WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                const historico_fase = resultados[0]
                res.status(200).json(historico_fase)
            }
        })
    }

    altera(id, valores, res) {
        const sql = 'UPDATE Historico_Fase SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM Historico_Fase WHERE id=?'

        conexao.query(sql, id, (erro) => {
            if(erro) {
                res.status(400).json(erro) 
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Historicos_Fase