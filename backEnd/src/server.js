const app = require('./app');


app.listen(8000,()=>{
    try {
        console.log('Seu servidor foi iniciado na porta 8000 !!!')        
    } catch (error) {
        console.log('Erro ao tentar startar o servido')
    }
});