const conexao = require('../infraestrutura/conexao')
const moment = require('moment')

class Usuarios {
    adiciona(usuario, res) {
        const data_criacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const sql = 'INSERT INTO Usuario SET ?'

        usuario = {...usuario, data_criacao}

        conexao.query(sql, usuario, (erro) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(201).json(usuario)
            }
        })
    }
    
    lista(res) {
        const sql = 'SELECT * FROM Usuario'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Usuario WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                const usuario = resultados[0]
                res.status(200).json(usuario)
            }
        })
    }

    altera(id, valores, res) {
        const sql = 'UPDATE Usuario SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM Usuario WHERE id=?'

        conexao.query(sql, id, (erro) => {
            if(erro) {
                res.status(400).json(erro) 
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Usuarios