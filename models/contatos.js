const conexao = require('../infraestrutura/conexao')

class Contatos {
    adiciona(contato, res) {
        const sql = 'INSERT INTO Contato SET ?'

        conexao.query(sql, contato, (erro) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(201).json(contato)
            }
        })
    }
    
    lista(res) {
        const sql = 'SELECT * FROM Contato'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Contato WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                const contato = resultados[0]
                res.status(200).json(contato)
            }
        })
    }

    altera(id, valores, res) {
        const sql = 'UPDATE Contato SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM Contato WHERE id=?'

        conexao.query(sql, id, (erro) => {
            if(erro) {
                res.status(400).json(erro) 
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Contatos