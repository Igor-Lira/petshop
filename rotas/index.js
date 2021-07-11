const rotas = require ('express').Router()

rotas.use ('/atendimentos', require('./atendimentos'))


module.exports = rotas