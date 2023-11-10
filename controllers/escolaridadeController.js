const escolaridadeService = require('../services/escolaridadeService');

module.exports = {
    async listEscolaridade(req, res) {
        try {
            const escolaridade = await escolaridadeService.listAllEscolaridade(); 
            res.status(200).json(escolaridade);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
}