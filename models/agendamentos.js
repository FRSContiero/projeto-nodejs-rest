const conexao = require('../infraestrutura/conexao')

class Agendamentos {
    adiciona(agendamento, res) {
        const sql = 'INSERT INTO Agendamento SET ?'

        conexao.query(sql, agendamento, (erro) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(201).json(agendamento)
            }
        })
    }
    
    lista(res) {
        const sql = 'SELECT * FROM Agendamento'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Agendamento WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                const agendamento = resultados[0]
                res.status(200).json(agendamento)
            }
        })
    }

    altera(id, valores, res) {
        const sql = 'UPDATE Agendamento SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM Agendamento WHERE id=?'

        conexao.query(sql, id, (erro) => {
            if(erro) {
                res.status(400).json(erro) 
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Agendamentos