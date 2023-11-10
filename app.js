const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const routes = require('./routes');

const Sequelize = require('sequelize');
const cors = require('cors');

const config = require('./config/config.js').development;


const session = require('express-session');

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

  
app.use(session({
    secret: 'your_secret_key', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

// Use this to allow all origins
app.use(cors());

app.use(bodyParser.json()); 


app.use((err, req, res, next) => {
    if (err) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }
});


app.use('/', routes);


const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; 
