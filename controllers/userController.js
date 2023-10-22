const userService = require('../services/userService');

module.exports = {


    async listAllUsers(req, res) {
        try {
            const users = await userService.listAllUsers();  // Supondo que você tenha uma função correspondente em userService
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },


    async createUser(req, res) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getUserDetails(req, res) {
        try {
            const user = await userService.findUserById(req.params.id);
            if (!user) return res.status(404).json({ message: "User not found" });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateUser(req, res) {
        try {
            const updatedUser = await userService.updateUser(req.params.id, req.body);
            if (!updatedUser) return res.status(404).json({ message: "User not found" });
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async deleteUser(req, res) {
        try {
            const result = await userService.deleteUser(req.params.id);
            if (!result) return res.status(404).json({ message: "User not found" });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async assignRoleToUser(req, res) {
        try {
            const { userId, roleId } = req.body;
            const user = await userService.assignRoleToUser(userId, roleId);
            if (!user) return res.status(404).json({ message: "User or role not found" });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getUserRoles(req, res) {
        try {
            const user = await userService.findUserById(req.params.id, {
                include: ['roles']
            });
            if (!user) return res.status(404).json({ message: "User not found" });
            res.status(200).json(user.roles);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async checkUserPermission(req, res) {
        try {
            const { userId, permissionName } = req.body;
            const hasPermission = await userService.userHasPermission(userId, permissionName);
            res.status(200).json({ hasPermission });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
