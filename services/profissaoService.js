const { Profissao } = require('../models');

class ProfissaoService {

    async listAllProfissao() {
        try {
            const data = await Profissao.findAll();
            return data;
        } catch (error) {
            throw new Error('Error retrieving Profissao: ' + error.message);
        }
    }
}

module.exports = new ProfissaoService();
