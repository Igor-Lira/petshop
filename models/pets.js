const conexao = require ('../infraestrutura/database/conexao')
const uploadDeArquivos = require ('../infraestrutura/arquivos/uploadDeArquivos')
class Pet {

    adiciona (pet,res){
        const query = 'INSERT INTO Pets SET ?'

        uploadDeArquivos(pet.imagem, pet.nome, (err, novoCaminho) =>{
            if (err){
                res.status(400).json({err})

            }else{

                const novoPet = {nome: pet.nome, imagem: novoCaminho}

                conexao.query(query, pet, err =>{
                    if (err){
                        console.log(err)
                        res.status(400).json(err)
                    }else{
        
                        res.status(200).json(novoPet)
                    }
                    
                })
    
            
            }
        })
    }
}

module.exports = new Pet()