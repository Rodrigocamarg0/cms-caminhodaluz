const pessoaService = require('../services/associadoService');

module.exports = {

    async listAllPessoas(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50; // You can adjust default value
        
        try {
            const result = await pessoaService.listAllPessoas(page, limit);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    async getPessoas(req, res) {
        try {
          const filters = req.query; // Get all query parameters as filters
          const pessoas = await pessoaService.findPessoas(filters);
          res.json(pessoas);
        } catch (error) {
          res.status(500).send(error.message);
        }
    },

    async createPessoa(req, res) {
        try {
            const pessoa = await pessoaService.createPessoa(req.body);
            res.status(201).json(pessoa);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getPessoaDetails(req, res) {
        try {
            const pessoa = await pessoaService.findPessoaById(req.params.id);
            if (!pessoa) return res.status(404).json({ message: "Pessoa not found" });
            res.status(200).json(pessoa);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updatePessoa(req, res) {
        try {
            const updatedPessoa = await pessoaService.updatePessoa(req.params.id, req.body);
            if (!updatedPessoa) return res.status(404).json({ message: "Pessoa not found" });
            res.status(200).json(updatedPessoa);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async deletePessoa(req, res) {
        try {
            const result = await pessoaService.deletePessoa(req.params.id);
            if (!result) return res.status(404).json({ message: "Pessoa not found" });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
