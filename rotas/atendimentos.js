const rotasAtendimento = require ('express').Router()
const atendimentoController = require('../controllers/atendimentos')

rotasAtendimento.get('/', atendimentoController.get)
rotasAtendimento.get('/:id', atendimentoController.getById)
rotasAtendimento.post('/', atendimentoController.post)
rotasAtendimento.patch('/:id', atendimentoController.patch)
rotasAtendimento.delete('/:id', atendimentoController.deletar)

module.exports = rotasAtendimento




