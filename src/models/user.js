const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM('user', 'admin', 'editor'),
        defaultValue: 'user',
        validate: {
          isIn: {
            args: [['user', 'admin', 'editor']],
            msg: "role must be ['admin','user','editor']",
          },
        },
      },
      status: {
        type: DataTypes.ENUM('active', 'blocked'),
        defaultValue: 'active',
        validate: {
          isIn: {
            args: [['active', 'blocked', 'editor']],
            msg: "status must be ['active','blocked']",
          },
        },
      },
      profilePicture: {
        type: DataTypes.STRING,
      },
      provider: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
  User.associate = (models) => {
    User.hasMany(models.Blog, {
      foreignKey: { name: 'userId', allowNull: false },
      as: 'blogs',
    });
  };
  User.beforeCreate(async (user) => {
    const encryptPassword = await bcrypt.hash(user.password, 12);
    user.password = encryptPassword;
  });

  return User;
};
