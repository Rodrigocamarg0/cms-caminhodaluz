const express = require('express');


const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const associadoRoutes = require('./routes/associadoRoutes');
const grupoEstudoRoutes = require('./routes/grupoEstudoRoutes');
const escolaridadeRoutes = require('./routes/escolaridadeRoutes');
const profissaoRoutes = require('./routes/profissaoRoutes');


const router = express.Router();

// Montando as rotas
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/associado', associadoRoutes);
router.use('/grupoEstudo', grupoEstudoRoutes);
router.use('/escolaridade', escolaridadeRoutes);
router.use('/profissao', profissaoRoutes);

module.exports = router;
