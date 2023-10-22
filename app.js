const express = require('express');

const bodyParser = require('body-parser');
const routes = require('./routes');

const Sequelize = require('sequelize');

const config = require('./config/config.js').development;

const app = express();


const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

// Testar a conexão
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Não foi possível conectar-se ao banco de dados:', err);
  });


// Middlewares
app.use(bodyParser.json()); // Para analisar o corpo das requisições como JSON

// Use rotas definidas em routes.js
app.use('/', routes);

// Middleware para tratamento de erros (deve ser o último a ser definido)
app.use((err, req, res, next) => {
    if (err) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; 
