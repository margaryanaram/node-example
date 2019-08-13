'use strict';
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        userId: {
            type: DataTypes.INTEGER,
            field: 'user_id'
        },
        postName: {
            type: DataTypes.STRING,
            field: 'post_name'
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

    Post.associates = (models) => {
        Post.belongsTo(models.User, { foreignKey: 'user_id' });
    };

    return Post;
};