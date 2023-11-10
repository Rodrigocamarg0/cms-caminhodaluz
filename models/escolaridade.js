module.exports = (sequelize, DataTypes) => {
    const Escolaridade = sequelize.define('Escolaridade', {
      idescolaridade: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      escolaridade_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    }, {
      tableName: 'escolaridade',
      timestamps: false,
    });
  
    Escolaridade.associate = (models) => {
      // Define any associations here. For example:
      // Escolaridade.hasMany(models.Pessoa, {
      //   foreignKey: 'escolaridade_id',
      //   as: 'pessoas'
      // });
    };
  
    return Escolaridade;
  };
  