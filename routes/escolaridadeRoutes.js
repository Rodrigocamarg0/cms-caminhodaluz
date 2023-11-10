const express = require('express');
const escolaridadeController = require('../controllers/escolaridadeController');  // Adjust the path based on your structure

const router = express.Router();

// List all 'escolaridade'
router.get('/', escolaridadeController.listEscolaridade);

module.exports = router;