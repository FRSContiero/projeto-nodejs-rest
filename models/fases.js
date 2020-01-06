const conexao = require('../infraestrutura/conexao')

class Fases {
    adiciona(fase, res) {
        const sql = 'INSERT INTO Fase SET ?'

        conexao.query(sql, fase, (erro) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(201).json(fase)
            }
        })
    }
    
    lista(res) {
        const sql = 'SELECT * FROM Fase'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Fase WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                const fase = resultados[0]
                res.status(200).json(fase)
            }
        })
    }

    altera(id, valores, res) {
        const sql = 'UPDATE Fase SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM Fase WHERE id=?'

        conexao.query(sql, id, (erro) => {
            if(erro) {
                res.status(400).json(erro) 
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Fases