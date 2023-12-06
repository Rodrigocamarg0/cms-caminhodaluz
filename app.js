const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const session = require('express-session');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// Database configuration from environment variables
const sequelize = new Sequelize(
  process.env.DB_DATABASE, // DB name
  process.env.DB_USERNAME, // DB username
  process.env.DB_PASSWORD, // DB password
  {
    host: process.env.DB_HOST, // DB host
    dialect: 'postgres',
    port: process.env.DB_PORT // DB port
  }
);

// Test database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET, // Session secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using https
}));

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// Routes
app.use('/', routes);

// Error handling middleware should be after route definitions
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Server configuration
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
