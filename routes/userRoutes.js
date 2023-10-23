const express = require('express');
const userController = require('../controllers/userController');  // Ajuste o caminho conforme sua estrutura
const UserService = require('../services/userService');

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

router.post('/authenticate', async (req, res) => {
    try {
        const { email, senha } = req.body;
        const result = await UserService.authenticateUser(email, senha);
        req.session.user = result.user;  // Agora você pode armazenar o usuário na sessão
        res.send(result);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;
