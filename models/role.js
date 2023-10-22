module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        role_name: DataTypes.STRING
    });

    Role.associate = (models) => {
        Role.belongsToMany(models.User, { through: 'user_roles', foreignKey: 'role_id' });
        Role.belongsToMany(models.Permission, {
          through: 'RolePermission', // tabela de junção
          as: 'permissions',
          foreignKey: 'roleId',
          otherKey: 'permissionId'
        });
      };

    return Role;
};