'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING,
            field: 'first_name',
            validate: {
                is: {
                    args: /^[a-z]+$/i,
                    msg: 'First Name is required'
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            field: 'last_name',
            validate: {
                is: {
                    args: /^[a-z]+$/i,
                    msg: 'Last Name is required'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Invalid email'
                },
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Password is required'
                },
                min: {
                    args: 6,
                    msg: 'Password must be minimum 6 characters long'
                }
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at'
        }
    });

    User.associate = (models) => {
        User.hasMany(models.Post, { foreignKey: 'user_id' });
    };

    User.beforeCreate(async (user) => {
        const password = await bcrypt.hash(user.password, 10);
        user.password = password;
        return password;
    });

    User.comparePassword = async (user, password) => await bcrypt.compare(password, user.password);

    return User;
};