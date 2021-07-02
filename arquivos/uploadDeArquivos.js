const fs = require('fs')

    fs.createReadStream('./assets/radu.jpg').pipe(fs.createWriteStream('./assets/radu3.jpg')).on('finish', ()=>{

        console.log('Imagem escrita co sucesso!')
    })
