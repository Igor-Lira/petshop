
const customExpress = require ('./config/customExpress')

const app = customExpress()
app.get ('/atendimentos', (req, res) => res.send("Você está na rota de atendimentos, !!"))
app.listen  (3000, () => console.log ("Servidor na porta 3000") )