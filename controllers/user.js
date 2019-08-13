const jwt = require('jsonwebtoken');
const Api = require('./../helpers/api');
const Models = require('./../models');
const User = Models.User;

module.exports = {

    login: async (req, res, next) => {
        try {
            const user = await User.find({
                where: {
                    email: req.body.email
                }
            });

            if(user) {
                const result = await User.comparePassword(user, req.body.password);
                console.log(result);

                if (result) {
                    const userData = {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName
                    };

                    return Api.success(res, {
                        user: userData,
                        token: jwt.sign({user: userData}, process.env.SECRET_KEY, {
                            expiresIn: 60 * 60 * 24
                        })
                    });
                } else {
                    return Api.error(res, 'User not found', 401);
                }
            }
        } catch(err) {
            next(err);
        }
    },

    register: async (req, res, next) => {
        try {
            await User.create(req.body);
            return Api.success(res, 'Registration successful');
        } catch(err) {
            next(err);
        }
    },

    token: (req, res) => {
        Api.success(res, {
            token: jwt.sign({user: req.user}, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 })
        });
    }

};