const express = require('express');
const mongoose = require('mongoose');
const routes = require('../../backend/src/routes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

// Criando a aplicação Express
const app = express();

// Conectando ao MongoDB
mongoose.connect(`mongodb+srv://adb:${process.env.SENHA_MONGODB}@timesapi.xbxat.mongodb.net/?retryWrites=true&w=majority&appName=TimesAPI`)
    .then(() => {
        console.log('Conectado ao MongoDB');
    }).catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err.message);
    });

// Configuração do Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TimesAPI',
            version: '1.0.0',
            description: 'Documentação da API TimesAPI'
        },
        servers: [
            {
                url: 'http://localhost:5005',
                description: 'Servidor local'
            }
        ],
    },
    apis: ['./backend/src/routes.js'], // Caminho correto para o arquivo de rotas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-times', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware para permitir JSON nas requisições
app.use(express.json());

// Usando as rotas definidas em routes.js
app.use('/api', routes);

// Iniciando o servidor
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Documentação disponível em http://localhost:${PORT}/api-times`);
});