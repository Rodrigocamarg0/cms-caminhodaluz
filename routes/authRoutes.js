const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');

router.post('/login', authController.login);

router.get('/someProtectedRoute', authMiddleware, (req, res) => {
    // Suponha que req.user contém informações do usuário após a autenticação
    const user = req.user;

    // Verificando se o usuário está definido após a autenticação
    if (user) {
        // Retornando informações sensíveis ou privadas
        res.json({
            message: 'Esta é uma rota protegida!',
            userDetails: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } else {
        res.status(401).json({ message: 'Erro de autenticação.' });
    }
});


module.exports = router;
