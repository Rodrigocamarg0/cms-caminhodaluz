module.exports = (sequelize, DataTypes) => {
    const Permission = sequelize.define('Permission', {
        permission_name: DataTypes.STRING
    });

    Permission.associate = (models) => {
        Permission.belongsToMany(models.Role, {
          through: 'RolePermission', // tabela de junção
          as: 'roles',
          foreignKey: 'permissionId',
          otherKey: 'roleId'
        });
      };

    return Permission;
};