module.exports = (sequelize, DataTypes) => {
    const GrupoEstudo = sequelize.define('GrupoEstudo', {
        grupo_estudo_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        grupo_estudo_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        descricao: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        nivel_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        turno: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        dia_semana: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        palestrante_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        data_inicio: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        data_fim: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    }, {
        tableName: 'grupo_estudo',
        timestamps: false,
    });

    GrupoEstudo.associate = (models) => {
        // Example associations:
        // GrupoEstudo has many Palestrantes
        // GrupoEstudo.hasMany(models.Palestrante, {
        //     foreignKey: 'palestrante_id',
        //     as: 'palestrantes'
        // });

        // // GrupoEstudo belongs to many Pessoa through PessoaGrupoEstudo
        // GrupoEstudo.belongsToMany(models.Pessoa, {
        //     through: 'PessoaGrupoEstudo',
        //     foreignKey: 'grupo_estudo_id',
        //     as: 'pessoas'
        // });
    };

    return GrupoEstudo;
};
