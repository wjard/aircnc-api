const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

//permitir acesso com cross-orgin (yarn add cors)
const cors = require('cors');
//Read the .env File
const dotenv = require('dotenv');
dotenv.config();

//suportar json no retorno das requisições
app.use(express.json());

//diponibiliar uma url válida que aponta para a imagem salva na pasta upload
const pathfile = path.resolve(__dirname, '..', 'uploads');
app.use('/files', express.static(pathfile));

//definição das rotas dos serivços expostos pela api
app.use(routes);

const mongo_uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_URL}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
console.log(mongo_uri);
mongoose.connect(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const serverStatus = () => {
    return [{
        mongoose: {
            state: 'up',
            dbState: mongoose.STATES[mongoose.connection.readyState]
        }
    }]
};
//  Plug into middleware.
app.use('/healthcheck', require('express-healthcheck')({
    healthy: serverStatus
}));

const port = process.env.PORT || 3333;
app.listen(port, err => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`Server listening on port: ${port}`);
    }
});