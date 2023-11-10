module.exports = (sequelize, DataTypes) => {
    const Pessoa = sequelize.define('Pessoa', {
        pessoa_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        pessoa_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        sexo: {
            type: DataTypes.STRING(1),
            allowNull: true,
        },
        cpf: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        rg: {
            type: DataTypes.STRING(13),
            allowNull: true,
        },
        telefone1: {
            type: DataTypes.STRING(16),
            allowNull: true,
        },
        telefone2: {
            type: DataTypes.STRING(16),
            allowNull: true,
        },
        celular: {
            type: DataTypes.STRING(16),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        profissao_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        escolaridade_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        formado_em: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        cep: {
            type: DataTypes.STRING(9),
            allowNull: true,
        },
        bairro: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        endereco: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        numero: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        complemento: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        data_nascimento: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        data_cadastro: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        socio: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        extensao: {
            type: DataTypes.STRING(4),
            allowNull: true,
        },
        trabalha_na_casa: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        tableName: 'pessoa',
        timestamps: false,
    });

    Pessoa.associate = (models) => {
        // // Pessoa has many Pagamentos
        // Pessoa.hasMany(models.Pagamento, {
        //     foreignKey: 'pessoa_id',
        //     as: 'pagamentos'
        // });

        // // Pessoa has many Recibos
        // Pessoa.hasMany(models.Recibo, {
        //     foreignKey: 'pessoa_id',
        //     as: 'recibos'
        // });

        // // Pessoa belongs to many GrupoEstudo through PessoaGrupoEstudo
        // Pessoa.belongsToMany(models.GrupoEstudo, {
        //     through: 'PessoaGrupoEstudo',
        //     foreignKey: 'pessoa_id',
        //     as: 'gruposEstudo'
        // });

        // // Pessoa has many Cargos
        // Pessoa.hasMany(models.PessoaCargo, {
        //     foreignKey: 'pessoa_id',
        //     as: 'cargos'
        // });

    };

    return Pessoa;
};
