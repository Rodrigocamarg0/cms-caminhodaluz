// controllers/grupoEstudoController.js

const grupoEstudoService = require('../services/grupoEstudoService');

module.exports = {
    async create(req, res) {
        try {
            const grupoEstudo = await grupoEstudoService.create(req.body);
            res.status(201).json(grupoEstudo);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getAll(req, res) {
        try {
            const grupos = await grupoEstudoService.getAll();
            res.status(200).json(grupos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getById(req, res) {
        try {
            const grupoEstudo = await grupoEstudoService.getById(req.params.id);
            if (!grupoEstudo) return res.status(404).json({ message: "Grupo not found" });
            res.status(200).json(grupoEstudo);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async update(req, res) {
        try {
            const updatedGrupo = await grupoEstudoService.update(req.params.id, req.body);
            if (!updatedGrupo) return res.status(404).json({ message: "Grupo not found" });
            res.status(200).json(updatedGrupo);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async delete(req, res) {
        try {
            await grupoEstudoService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
