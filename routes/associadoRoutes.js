const express = require('express');
const associadoController = require('../controllers/associadoController');  // Adjust the path based on your structure

const router = express.Router();

// List all 'pessoas'
router.get('/', associadoController.listAllPessoas);

// List all 'pessoas' filtradas por...
router.get('/filterBy', associadoController.getPessoas);

// Get details of a single 'pessoa'
router.get('/:id', associadoController.getPessoaDetails);

// Create a new 'pessoa'
router.post('/', associadoController.createPessoa);

// Update an existing 'pessoa'
router.put('/:id', associadoController.updatePessoa);

// Delete a 'pessoa'
router.delete('/:id', associadoController.deletePessoa);

module.exports = router;
