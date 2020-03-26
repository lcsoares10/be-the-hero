const express = require('express');
const cors = require('cors')
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(8000,()=>{
    try {
        console.log('Seu servidor foi iniciado na porta 8000 !!!')        
    } catch (error) {
        console.log('Erro ao tentar startar o servido')
    }
});