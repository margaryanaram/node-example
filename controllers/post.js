const Api = require('./../helpers/api');
const Models = require('./../models');
const Post = Models.Post;

module.exports = {

    get: async (req, res, next) => {
        try {
            if(req.params.id) {
                if(isNaN(req.params.id)) {
                    return Api.error(res, 'Invalid ID number');
                }
                const post = await Post.findById(req.params.id);
                return Api.success(res, {post: post});
            } else {
                const posts = await Post.findAll({
                    where: {
                        userId: req.user.id
                    }
                });
                return Api.success(res, {posts: posts});
            }
        } catch(err) {
            next(err);
        }
    },

    create: async (req, res, next) => {
        try {
            const data = req.body;
            data.userId = req.user.id;
            const post = await Post.create(data);
            return Api.success(res, {post: post}, 'Post created successfully');
        } catch(err) {
            next(err);
        }
    },

    update: async (req, res, next) => {
        try {
            if (!req.params.id || isNaN(req.params.id)) {
                return Api.error(res, 'Invalid ID number');
            }

            const data = req.body;
            let post = await Post.findById(req.params.id);

            if (!post) {
                return Api.error(res, 'Post not found');
            }

            post.postName = data.postName;
            post = await post.save();
            return Api.success(res, {post: post}, 'Post updated successfully');
        } catch(err) {
            next(err);
        }
    },

    delete: async (req, res, next) => {
        try {
            if (!req.params.id || isNaN(req.params.id)) {
                return Api.error(res, 'Invalid ID number');
            }

            await Post.destroy({
                where: {
                    id: req.params.id
                }
            });

            return Api.success(res, 'Post deleted successfully');
        } catch(err) {
            next(err);
        }
    }


};