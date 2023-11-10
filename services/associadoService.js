const { Pessoa } = require('../models');
const { Op } = require('sequelize');

class PessoaService {

    async listAllPessoas(page = 1, limit = 50) {
        const offset = (page - 1) * limit;
        try {
            const result = await Pessoa.findAndCountAll({
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
            throw new Error('Error retrieving pessoas: ' + error.message);
        }
    }


    async findPessoas(filters) {
        try {
            // Build the where clause dynamically based on the provided filters
            let queryFilters = {};
            for (const key in filters) {
                if (['pessoa_name', 'email', 'bairro', 'endereco', 'telefone1', 'telefone2', 'celular'].includes(key)) {
                    // Case-insensitive partial matching
                    queryFilters[key] = {
                        [Op.iLike]: `%${filters[key]}%`
                    };
                } else if (key.endsWith('_start') || key.endsWith('_end')) {
                    // Date range handling
                    const fieldName = key.replace(/_(start|end)$/, '');
                    if (!queryFilters[fieldName]) {
                        queryFilters[fieldName] = {};
                    }
                    if (key.endsWith('_start')) {
                        queryFilters[fieldName][Op.gte] = new Date(filters[key]);
                    } else {
                        queryFilters[fieldName][Op.lte] = new Date(filters[key]);
                    }
                } else if (filters[key]) {
                    // Exact matching
                    queryFilters[key] = filters[key];
                }
            }

            // Use Sequelize to find the records that match the filters
            return await Pessoa.findAll({
                where: queryFilters,
            });
        } catch (error) {
            throw new Error('Error filtering pessoa: ' + error.message);
        }
    }

    async createPessoa(data) {
        try {
            const pessoa = await Pessoa.create(data);
            return pessoa;
        } catch (error) {
            throw new Error('Error creating pessoa: ' + error.message);
        }
    }

    async findPessoaById(pessoaId) {
        try {
            const pessoa = await Pessoa.findByPk(pessoaId);
            return pessoa;
        } catch (error) {
            throw new Error('Error retrieving pessoa: ' + error.message);
        }
    }

    async updatePessoa(pessoaId, data) {
        try {
            await Pessoa.update(data, { where: { pessoa_id: pessoaId } });
            return this.findPessoaById(pessoaId);
        } catch (error) {
            throw new Error('Error updating pessoa: ' + error.message);
        }
    }

    async deletePessoa(pessoaId) {
        try {
            await Pessoa.destroy({ where: { pessoa_id: pessoaId } });
            return true;
        } catch (error) {
            throw new Error('Error deleting pessoa: ' + error.message);
        }
    }
}

module.exports = new PessoaService();
