const conexao = require ('../infraestrutura/conexao')
const moment = require ('moment')

class Atendimento {

    adiciona (atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data =  moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')

        const dataEValida = moment (data).isSameOrAfter(dataCriacao)
        const clienteEValido = atendimento.cliente.length >=5

        const validacoes = [
            {nome: 'data', valido:dataEValida, messagem: 'Data deve ser maior ou igual a data atual'},
            {nome: 'client', valido:clienteEValido, messagem: 'Cliente deve ter pelo menos cinco caracteres'}
        ]
        const errors = validacoes.filter(campo => !campo.valido)
        const existemErros = errors.length
        if (existemErros){
            res.status(400).json(errors)
        } else{

            const atendimentoDatado = {...atendimento, dataCriacao, data}

        const sql = 'INSERT INTO Atendimentos SET ?'

        conexao.query(sql, atendimentoDatado, (err, resultados) =>{
            if (err){
                res.status(400).json(err)
            }else{
                res.json(atendimento)
            }


        })

        }

    }

    lista (res) {
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query (sql, (err,resultados) =>{
            if (err){
                res.status(400).json(err)
            }else{
                res.status(200).json(resultados)
            }

        })

    }
    buscaPorId(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id =${id}`

        conexao.query(sql, (err, resultados) => {
            const atendimento = resultados[0]
            if(err) {
                res.status(400).json(err)
            }else{
                res.status(200).json(atendimento)
            }
        })
    }

    altera(id, valores, res){
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }
        conexao.query(sql, [valores, id], (err, resultados) =>{

            if(err){
                res.status(400).json(err)
            } else{
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res){

        const sql = `DELETE FROM Atendimentos WHERE id = ?`

        conexao.query (sql, id,  (err, resultados) => {
            if (err){
                res.status(400).json(err)
            }else{
                res.status(200).json({id})
            }
        })
    }

}

module.exports = new Atendimento