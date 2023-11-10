// routes/grupoEstudoRoutes.js

const express = require('express');
const grupoEstudoController = require('../controllers/grupoEstudoController');

const router = express.Router();

router.post('/', grupoEstudoController.create);
router.get('/', grupoEstudoController.getAll);
router.get('/:id', grupoEstudoController.getById);
router.put('/:id', grupoEstudoController.update);
router.delete('/:id', grupoEstudoController.delete);

module.exports = router;
