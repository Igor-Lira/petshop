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
                res.json(resultados)
            }


        })

        }

    }
}

module.exports = new Atendimento