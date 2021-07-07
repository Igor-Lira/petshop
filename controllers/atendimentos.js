const atendimentos = require('../models/atendimentos')
const Atendimento = require ('../models/atendimentos')

/*
Responsabilidades do Controler: Identificar o que se deve fazer para cada tipo de requisição e chamar funções do modules.
Além de responder ao cliente (e não mais as camadas internas) e validação de segurança (para evitar chegar em camadas internas sem necessidade).
 */
module.exports = app => {
    app.get ('/atendimentos', (req, res) => {
        Atendimento.lista()
            .then(resultados=> res.json(resultados))
            .catch(err => res.status(400).json(err))
    })

    app.get('/atendimentos/:id', (req, res) =>{
        const id = parseInt(req.params.id)
        Atendimento.buscaPorId(id)
            .then(resultdaos=>{
                res.json(resultdaos)
            })
            .catch(err => res.status(400).json(err))

    })
    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        Atendimento.adiciona(atendimento)
        .then(atendimentoCadastro => res.status(201).json(atendimentoCadastro))
        .catch(err => res.status(400).json(err))
    })
    app.patch('/atendimentos/:id', (req, res) =>{
        const id = parseInt(req.params.id)
        const valores = req.body
        Atendimento.altera(id, valores)
            .then(resultados=> res.json(resultados))
            .catch(err => res.status(400).json(err))
    })
    app.delete('/atendimentos/:id', (req, res) =>{
        const id = parseInt(req.params.id)
        Atendimento.deleta(id)
            .then(resultados=> res.json(resultados))
            .catch(err => res.status(400).json(err) )
    })
    
}