/* Caso mude de banco de dados, esse é o arquivo que vai ser afetado. Desaclopar o código */

const conexao = require ('./conexao')

const executarQuery = (query, parametros = '') =>{

    return new Promise((resolve, reject) =>{

        conexao.query (query, parametros, (err, resultados, campos) =>{
            if(err){
                reject(err)
    
            }else{
                resolve(resultados)
            }
        })
    })

}

module.exports = executarQuery