const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Supondo que você tenha uma função para buscar o usuário por e-mail.
const { findUserByEmail } = require('../services/userService');

exports.login = async (req, res) => {
    const user = await findUserByEmail(req.body.email);

    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.hashedPassword);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = jwt.sign({ id: user.id, role: user.roleId }, 'YOUR_SECRET_KEY');

    res.send(token);
};