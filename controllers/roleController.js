const roleService = require('../services/roleService');

module.exports = {
  async createRole(req, res) {
    try {
      const role = await roleService.createRole(req.body);
      res.status(201).json(role);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getRole(req, res) {
    try {
      const role = await roleService.findRoleById(req.params.id);
      if (!role) return res.status(404).json({ message: "Role not found" });
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async updateRole(req, res) {
    try {
      const updatedRole = await roleService.updateRole(req.params.id, req.body);
      if (!updatedRole) return res.status(404).json({ message: "Role not found" });
      res.status(200).json(updatedRole);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async deleteRole(req, res) {
    try {
      const result = await roleService.deleteRole(req.params.id);
      if (!result) return res.status(404).json({ message: "Role not found" });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async assignPermissionToRole(req, res) {
    try {
      const { roleId, permissionId } = req.body;
      const role = await roleService.assignPermissionToRole(roleId, permissionId);
      if (!role) return res.status(404).json({ message: "Role or permission not found" });
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getPermissionsOfRole(req, res) {
    try {
      const permissions = await roleService.getPermissionsOfRole(req.params.id);
      if (!permissions) return res.status(404).json({ message: "Role not found" });
      res.status(200).json(permissions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
