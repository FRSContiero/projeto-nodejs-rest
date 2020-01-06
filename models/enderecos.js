const conexao = require('../infraestrutura/conexao')

class Enderecos {
    adiciona(endereco, res) {
        const sql = 'INSERT INTO Endereco SET ?'

        conexao.query(sql, endereco, (erro) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(201).json(endereco)
            }
        })
    }
    
    lista(res) {
        const sql = 'SELECT * FROM Endereco'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Endereco WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                const endereco = resultados[0]
                res.status(200).json(endereco)
            }
        })
    }

    altera(id, valores, res) {
        const sql = 'UPDATE Endereco SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM Endereco WHERE id=?'

        conexao.query(sql, id, (erro) => {
            if(erro) {
                res.status(400).json(erro) 
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Enderecos