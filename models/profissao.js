module.exports = (sequelize, DataTypes) => {
    const Profissao = sequelize.define('Profissao', {
      profissao_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
      descricao: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    }, {
      tableName: 'profissao',
      timestamps: false,
    });
  
    Profissao.associate = (models) => {
      // Define any associations here. For example:
      // profissao.hasMany(models.Pessoa, {
      //   foreignKey: 'profissao_id',
      //   as: 'pessoas'
      // });
    };
  
    return Profissao;
  };
  