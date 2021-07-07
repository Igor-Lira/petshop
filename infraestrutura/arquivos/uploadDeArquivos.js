const fs = require('fs')
const path = require('path')

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => {
    const tiposValidos = ['jpg', 'png', 'jpeg']
    const tipo = path.extname(caminho)
    const tipoehValido = tiposValidos.indexOf(tipo.substring(1)) !== -1

    if(tipoehValido){
        
        const novoCaminho = `./assets/imagens/${nomeDoArquivo}${tipo}`
        fs.createReadStream(caminho)
        .pipe(fs.createWriteStream(novoCaminho))
        .on('finish', ()=>callbackImagemCriada(false, novoCaminho))

    }else{

        const err = 'Tipo eh invalido'
        callbackImagemCriada(err)
    }
}

