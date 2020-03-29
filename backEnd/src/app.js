const express = require('express');
const cors = require('cors')
const routes = require('./routes');
const {errors} = require('celebrate');//Para usar o celebrate é necessario utilizar esse modulo para tratar retorno de erro


const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors()); //Necessario chamar validação de erro

module.exports = app;
