const conexao = require('../infraestrutura/conexao')
const moment = require('moment')

class Prospect {
    adiciona(prospect, res) {
        const data_criacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const sql = 'INSERT INTO Prospects SET ?'
        prospect = {...prospect, data_criacao}

        const razaoSocialValido = prospect.razao_social.length >= 5

        const validacoes = [
            {
                nome: 'razao_social',
                valido: razaoSocialValido,
                mensagem: 'Razão Social deve possuir pelo menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length
 
        if (existemErros) {
            res.status(400).json(erros)
        } else {
            conexao.query(sql, prospect, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(prospect)
                }
            })
        }   
    }
    
    lista(res) {
        const sql = 'SELECT * FROM Prospects'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM Prospects WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                const prospect = resultados[0]
                res.status(200).json(prospect)
            }
        })
    }

    altera(id, valores, res) {
        const sql = 'UPDATE Prospects SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM Prospects WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro) 
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Prospect