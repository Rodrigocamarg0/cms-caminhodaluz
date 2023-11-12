const profissaoService = require('../services/profissaoService');

module.exports = {
    async listProfissao(req, res) {
        try {
            const profissao = await profissaoService.listAllProfissao(); 
            res.status(200).json(profissao);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
}