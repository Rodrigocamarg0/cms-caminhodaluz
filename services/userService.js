const { User, Role, Permission } = require('../models');

class UserService {


    async listAllUsers() {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            throw new Error('Error retrieving users: ' + error.message);
        }
    }

    async createUser(data) {
        try {
            // Aplicar regras de negócio, como validação, etc.
            const user = await User.create(data);
            return user;
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }

    async findUserById(userId) {
        try {
            const user = await User.findByPk(userId);
            return user;
        } catch (error) {
            throw new Error('Error retrieving user: ' + error.message);
        }
    }

    async updateUser(userId, data) {
        try {
            await User.update(data, { where: { id: userId } });
            return this.findUserById(userId);
        } catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    }

    async deleteUser(userId) {
        try {
            await User.destroy({ where: { id: userId } });
            return true;
        } catch (error) {
            throw new Error('Error deleting user: ' + error.message);
        }
    }

    async assignRoleToUser(userId, roleId) {
        try {
            const user = await User.findByPk(userId);
            if (!user) throw new Error('User not found');
            const role = await Role.findByPk(roleId);
            if (!role) throw new Error('Role not found');

            await user.addRole(role);
            return user;
        } catch (error) {
            throw new Error('Error assigning role to user: ' + error.message);
        }
    }

    async userHasPermission(userId, permissionName) {
        const user = await User.findByPk(userId, {
            include: [
                {
                    model: Role,
                    as: 'roles',
                    include: [
                        {
                            model: Permission,
                            as: 'permissions'
                        }
                    ]
                }
            ]
        });

        if (!user) throw new Error('User not found');

        for (let role of user.roles) {
            for (let permission of role.permissions) {
                if (permission.name === permissionName) {
                    return true;
                }
            }
        }

        return false;
    }
}

module.exports = new UserService();
