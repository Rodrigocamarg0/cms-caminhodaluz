const express = require('express');
const router = express.Router();

const roleController = require('../controllers/roleController');

// Criar uma nova função
router.post('/roles', roleController.createRole);

// Obter uma função específica por ID
router.get('/roles/:id', roleController.getRole);

// Atualizar uma função por ID
router.put('/roles/:id', roleController.updateRole);

// Deletar uma função por ID
router.delete('/roles/:id', roleController.deleteRole);

// Atribuir uma permissão a uma função
router.post('/roles/:id/permissions', roleController.assignPermissionToRole);

// Obter permissões de uma função específica
router.get('/roles/:id/permissions', roleController.getPermissionsOfRole);

module.exports = router;
