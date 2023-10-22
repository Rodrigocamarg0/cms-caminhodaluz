const { Role, Permission } = require('../models');

class RoleService {
  async createRole(data) {
    try {
      const role = await Role.create(data);
      return role;
    } catch (error) {
      throw new Error('Error creating role: ' + error.message);
    }
  }

  async findRoleById(roleId) {
    try {
      const role = await Role.findByPk(roleId);
      return role;
    } catch (error) {
      throw new Error('Error retrieving role: ' + error.message);
    }
  }

  async updateRole(roleId, data) {
    try {
      await Role.update(data, { where: { id: roleId } });
      return this.findRoleById(roleId);
    } catch (error) {
      throw new Error('Error updating role: ' + error.message);
    }
  }

  async deleteRole(roleId) {
    try {
      await Role.destroy({ where: { id: roleId } });
      return true;
    } catch (error) {
      throw new Error('Error deleting role: ' + error.message);
    }
  }

  async assignPermissionToRole(roleId, permissionId) {
    try {
      const role = await Role.findByPk(roleId);
      if (!role) throw new Error('Role not found');
      const permission = await Permission.findByPk(permissionId);
      if (!permission) throw new Error('Permission not found');

      await role.addPermission(permission);
      return role;
    } catch (error) {
      throw new Error('Error assigning permission to role: ' + error.message);
    }
  }

  async getPermissionsOfRole(roleId) {
    try {
      const role = await Role.findByPk(roleId, {
        include: [
          {
            model: Permission,
            as: 'permissions'
          }
        ]
      });

      if (!role) throw new Error('Role not found');
      return role.permissions;
    } catch (error) {
      throw new Error('Error retrieving permissions of role: ' + error.message);
    }
  }
}

module.exports = new RoleService();
