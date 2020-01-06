class Tabelas {
    init(conexao) {
        this.conexao = conexao

        this.criarProspects()
        this.criarContato()
        this.criarCidade()
        this.criarEndereco()
        this.criarFase()
        this.criarHistoricoFase()
        this.criarUsuario()
        this.criarAgendamento()
        this.criarRamoAtividade()
        this.criarForeignKeys()
    }

    criarProspects() {
        const sql = 'CREATE TABLE IF NOT EXISTS Prospects (id int NOT NULL AUTO_INCREMENT, razao_social varchar(50) NOT NULL, nome_fantasia varchar(50) NOT NULL, status varchar(20) NOT NULL, observacao varchar(200), data_criacao datetime NOT NULL, porte varchar(50), contato_principal int, data_venda datetime, website varchar(50), cnpj varchar(18), ativo boolean, endereco_id int, ramoatividade_id int, fase_id int, PRIMARY KEY(id))'
        
        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Prospects criada com sucesso!')
            }
        })
    }

    criarContato() {
        const sql = 'CREATE TABLE IF NOT EXISTS Contato(id int NOT NULL AUTO_INCREMENT, cargo varchar(50), email varchar(50), celular varchar(20) NOT NULL, observacao varchar(200), prospects_id int, PRIMARY KEY(id))'
        
        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Contato criada com sucesso!')
            }
        })
    }

    criarCidade() {
        const sql = 'CREATE TABLE IF NOT EXISTS Cidade(id int NOT NULL AUTO_INCREMENT, nome varchar(50), estado varchar(2), PRIMARY KEY(id))'

        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Cidade criada com sucesso!')
            }
        })
    }

    criarEndereco() {
        const sql = 'CREATE TABLE IF NOT EXISTS Endereco(id int NOT NULL AUTO_INCREMENT, cep varchar(9), logradouro varchar(50), bairro varchar(50), numero varchar(10), cidade_id int, PRIMARY KEY(id))'

        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Endereço criada com sucesso!')
            }
        })
    }

    criarFase() {
        const sql = 'CREATE TABLE IF NOT EXISTS Fase(id int NOT NULL AUTO_INCREMENT, descricao varchar(50), PRIMARY KEY(id))'

        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Fase criada com sucesso!')
            }
        })
    }

    criarHistoricoFase() {
        const sql = 'CREATE TABLE IF NOT EXISTS Historico_Fase(id int NOT NULL AUTO_INCREMENT, data datetime, fase_id int, prospects_id int, usuario_id int, PRIMARY KEY(id))'

        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Historico_Fase criada com sucesso!')
            }
        })
    }

    criarUsuario() {
        const sql = 'CREATE TABLE IF NOT EXISTS Usuario(id int NOT NULL AUTO_INCREMENT, nome varchar(50), apelido varchar(20), funcao varchar(20), ativo boolean, senha varchar(50), data_criacao datetime, PRIMARY KEY(id))'

        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Usuario criada com sucesso!')
            }
        })
    }

    criarAgendamento() {
        const sql = 'CREATE TABLE IF NOT EXISTS Agendamento(id int NOT NULL AUTO_INCREMENT, assunto varchar(50), descricao varchar(100), data_hora datetime, status boolean, tipo varchar(50), usuario_id int, prospects_id int, PRIMARY KEY(id))'

        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Agendamento criada com sucesso!')
            }
        })
    }

    criarRamoAtividade() {
        const sql = 'CREATE TABLE IF NOT EXISTS Ramo_Atividade(id int NOT NULL AUTO_INCREMENT, descricao varchar(50), PRIMARY KEY(id))'

        this.conexao.query(sql, (erro) => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Ramo_Atividade criada com sucesso!')
            }
        })
    }

    criarForeignKeys() {
        const sqlVerificaExistencia = "SELECT * FROM information_schema.TABLE_CONSTRAINTS WHERE CONSTRAINT_NAME = 'fk_prospects_fase'"

        this.conexao.query(sqlVerificaExistencia, (erro, resultados) => {
            if(erro) {
                console.log(erro)
            } else {
                if (resultados.length == 0) {
                    const sqlForeignKeys = []

                    sqlForeignKeys[0] = 'ALTER TABLE `Contato` ADD CONSTRAINT `fk_contato_prospects` FOREIGN KEY ( `prospects_id` ) REFERENCES `Prospects` ( `id` )' 
                    sqlForeignKeys[1] = 'ALTER TABLE `Endereco` ADD CONSTRAINT `fk_endereco_cidade` FOREIGN KEY ( `cidade_id` ) REFERENCES `Cidade` ( `id` )'
                    sqlForeignKeys[2] = 'ALTER TABLE `Historico_Fase` ADD CONSTRAINT `fk_historicofase_prospects` FOREIGN KEY ( `prospects_id` ) REFERENCES `Prospects` ( `id` )'
                    sqlForeignKeys[3] = 'ALTER TABLE `Historico_Fase` ADD CONSTRAINT `fk_historicofase_fase` FOREIGN KEY ( `fase_id` ) REFERENCES `Fase` ( `id` )'
                    sqlForeignKeys[4] = 'ALTER TABLE `Historico_Fase` ADD CONSTRAINT `fk_historicofase_usuario` FOREIGN KEY ( `usuario_id` ) REFERENCES `Usuario` ( `id` )'
                    sqlForeignKeys[5] = 'ALTER TABLE `Agendamento` ADD CONSTRAINT `fk_agendamento_usuario` FOREIGN KEY ( `usuario_id` ) REFERENCES `Usuario` ( `id` )'
                    sqlForeignKeys[6] = 'ALTER TABLE `Agendamento` ADD CONSTRAINT `fk_agendamento_prospects` FOREIGN KEY ( `prospects_id` ) REFERENCES `Prospects` ( `id` )'
                    sqlForeignKeys[7] = 'ALTER TABLE `Prospects` ADD CONSTRAINT `fk_prospects_contatoprincipal` FOREIGN KEY ( `contato_principal` ) REFERENCES `Contato` ( `id` )'
                    sqlForeignKeys[8] = 'ALTER TABLE `Prospects` ADD CONSTRAINT `fk_prospects_endereco` FOREIGN KEY ( `endereco_id` ) REFERENCES `Endereco` ( `id` )'
                    sqlForeignKeys[9] = 'ALTER TABLE `Prospects` ADD CONSTRAINT `fk_prospects_ramoatividade` FOREIGN KEY ( `ramoatividade_id` ) REFERENCES `Ramo_Atividade` ( `id` )'
                    sqlForeignKeys[10] = 'ALTER TABLE `Prospects` ADD CONSTRAINT `fk_prospects_fase` FOREIGN KEY ( `fase_id` ) REFERENCES `Fase` ( `id` )'
            
                    var i;
                    for (i = 0; i < sqlForeignKeys.length; i++) {
                        this.conexao.query(sqlForeignKeys[i], (erro) => {
                            if(erro) {
                                console.log(erro)
                            } else {
                                console.log('Foreign key criada com sucesso!')
                            }
                        })
                    }
                }
            }
        })
    }
}


module.exports = new Tabelas