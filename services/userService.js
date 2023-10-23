const { User, Role, Permission } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'YOUR_SECRET_KEY'; // Mantenha isso seguro e use uma chave complexa


class UserService {

    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    async authenticateUser(email, senha) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }

        if (!await bcrypt.compare(senha, user.senha)) {
            throw new Error('Invalid password');
        }

        const token =  jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
            expiresIn: 3600 // expires in 5min
       });
       console.log(token)

        return { user: user, token:  token};
    }
    
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
            // Hash the password
            data.senha = await this.hashPassword(data.senha);
            
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
