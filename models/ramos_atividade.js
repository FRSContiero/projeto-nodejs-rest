const conexao = require('../infraestrutura/conexao')

class Ramos_Atividade {
    adiciona(ramo_atividade, res) {
        const sql = 'INSERT INTO Ramo_Atividade SET ?'

        conexao.query(sql, ramo_atividade, (erro) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(201).json(ramo_atividade)
            }
        })
    }
    
    lista(res) {
        const sql = 'SELECT * FROM Ramo_Atividade'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Ramo_Atividade WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                const ramo_atividade = resultados[0]
                res.status(200).json(ramo_atividade)
            }
        })
    }

    altera(id, valores, res) {
        const sql = 'UPDATE Ramo_Atividade SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM Ramo_Atividade WHERE id=?'

        conexao.query(sql, id, (erro) => {
            if(erro) {
                res.status(400).json(erro) 
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Ramos_Atividade