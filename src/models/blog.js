module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define(
    'Blog',
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      heading: {
        type: DataTypes.STRING,
      },
      abstract: {
        type: DataTypes.STRING,
      },
      //   commentCount: {

      //   }
      // comment: {
      //     type: DataTypes.FLOAT,

      //   }
      //   rating: {
      //     type: DataTypes.FLOAT,
      //   },
      image: {
        type: DataTypes.STRING,
      },
      url: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: true }
  );
  Blog.associate = (models) => {
    Blog.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'creator',
    });
  };
  return Blog;
};
