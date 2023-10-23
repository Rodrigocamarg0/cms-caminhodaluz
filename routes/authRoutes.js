const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const authConfig = require('../config/config');

const router = express.Router();

router.post('/authenticate', async (req, res) => {
    const { email, senha } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(400).send({ error: 'User not found' });
    }

    if (!await bcrypt.compare(senha, user.senha)) {
        return res.status(400).send({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
    });

    req.session.user = user;

    return res.send({ user, token });
});

module.exports = router;
