module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    // title: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    like: {
      type: DataTypes.INTEGER
    },
    dislike: {
      type: DataTypes.INTEGER
    } 
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };

  return Post;
};
