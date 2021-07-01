
const customExpress = require ('./config/customExpress')
const conexao = require ('./infraestrutura/conexao')
const Tabelas = require ('./infraestrutura/tabelas')

conexao.connect(err => {
    if(err){
        console.log(err)
    }else{
        console.log ('conectado com sucesso')
        Tabelas.init(conexao)
        const app = customExpress()
        app.get ('/atendimentos', (req, res) => res.send("Você está na rota de atendimentos, !!"))
        app.listen  (3000, () => console.log ("Servidor na porta 3000") )
    }
})
