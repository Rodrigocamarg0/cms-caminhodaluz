const express = require('express');
const userController = require('../controllers/userController');  // Ajuste o caminho conforme sua estrutura

const router = express.Router();

// Listar todos os usuários
router.get('/', userController.listAllUsers);

// Obter detalhes de um único usuário
router.get('/:id', userController.getUserDetails);

// Criar um novo usuário
router.post('/', userController.createUser);

// Atualizar um usuário existente
router.put('/:id', userController.updateUser);

// Excluir um usuário
router.delete('/:id', userController.deleteUser);

module.exports = router;
