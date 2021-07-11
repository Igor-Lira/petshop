const conexao = require ('../infraestrutura/database/conexao')
const moment = require ('moment')
const axios = require ('axios')
const repositorio = require ('../repositorios/atendimentos')

/* Responsabilidades dos Models: Regras de negocios */

class Atendimento {
    constructor(){
        this.dataEhValida = ({ data, dataCriacao }) =>
            moment(data).isSameOrAfter(dataCriacao)
        this.clienteEhValido = tamanho => tamanho >= 5

        this.valida = parametros =>
            this.validacoes.filter(campo => {
                const { nome } = campo
                const parametro = parametros[nome]
                return !campo.valido(parametro)
            })

        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

    }

    adiciona (atendimento){

        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data =  moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        
       /* 
       parametros para a validação
       A data que o cliente marcou o serviço deve ser maior que a data atual de cadastro: atendimento.data, datacriação
       O nome do cliente deve ter no mínimo 5 caracteres: tamanho da string
       */
        const parametros = {
            data: {data, dataCriacao},
            cliente: {tamanho: atendimento.cliente.length}
        }
      
        const erros = this.valida(parametros)
        const existemErros = erros.length
        
      //  console.log(errors)

       // existemErros = errors.length

        if (existemErros){
            /*criar nova promessa para enviar o erro ao controler*/
            return new Promise((resolve, reject) => reject(erros))
        } else{

            const atendimentoDatado = {...atendimento, dataCriacao, data}
        
        // Chama o repositório que fica encarregado de acidionar na base de dados. Desaclopar código de banco de dados com regras de negócio.
        return repositorio.adiciona(atendimentoDatado)
              .then(resultados=>{
                const id = resultados.insertId
                return {...atendimento, id}
        })
        }

    }

    lista () {
        return repositorio.lista()
    }

    buscaPorId(id){
       
        return repositorio.buscaPorId(id)
            .then(async resultados =>{
                var atendimento = resultados[0]
                const cpf = resultados.cliente
                const {data} = await axios.get(`http://localhost:8082/${cpf}`)
                atendimento.cliente = data
                return {atendimento}
            })
    }

    altera(id, valores){

        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }
        return repositorio.altera(id, valores)
            .then(resultados =>{
                return {...valores, id} 
            })
    }

    deleta(id){

        return repositorio.deleta(id)
                 .then(resultados =>{
                    return id
                })

    }

}

module.exports = new Atendimento