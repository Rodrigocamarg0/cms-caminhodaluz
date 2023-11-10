// services/grupoEstudoService.js
const { GrupoEstudo } = require('../models');

class GrupoEstudoService {
    async create(data) {
        return await GrupoEstudo.create(data);
    }

    async getAll(page = 1, limit = 50) {
        const offset = (page - 1) * limit;
        try {
            const result = await GrupoEstudo.findAndCountAll({
                limit: limit,
                offset: offset
            });
            return {
                total: result.count,
                page: page,
                pages: Math.ceil(result.count / limit),
                data: result.rows,
            };
        } catch (error) {
            throw new Error('Error retrieving GrupoEstudos: ' + error.message);
        }
    }

    async getById(id) {
        return await GrupoEstudo.findByPk(id);
    }

    async update(id, data) {
        await GrupoEstudo.update(data, {
            where: { grupo_estudo_id: id }
        });
        return this.getById(id);
    }

    async delete(id) {
        return await GrupoEstudo.destroy({
            where: { grupo_estudo_id: id }
        });
    }
}

module.exports = new GrupoEstudoService();
