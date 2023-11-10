const { Escolaridade } = require('../models');

class EscolaridadeService {

    async listAllEscolaridade() {
        try {
            const data = await Escolaridade.findAll();
            return data;
        } catch (error) {
            throw new Error('Error retrieving Escolaridade: ' + error.message);
        }
    }
}

module.exports = new EscolaridadeService();
