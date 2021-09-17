module.exports = (sequelize, DataTypes) => {
  const UserSubscription = sequelize.define(
    'UserSubscription',
    {
      stripeCustomerId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subscriptionId: {
        type: DataTypes.STRING,
      },
      // subscriptionPlanId: {
      //   type: DataTypes.STRING,
      // },
      interval: {
        type: DataTypes.ENUM('monthly', 'yearly'),
        validate: {
          isIn: {
            args: [['monthly', 'yearly']],
            msg: "interval must be ['yearly','monthly']",
          },
        },
      },
      status: {
        type: DataTypes.ENUM('active', 'canceled', 'inactive'),
        validate: {
          isIn: {
            args: [['active', 'canceled', 'inactive']],
            msg: "status must be ['canceled','active','inactive']",
          },
        },
      },
    },
    { timestamps: true }
  );
  UserSubscription.associate = (models) => {
    UserSubscription.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      as: 'user',
    });
    UserSubscription.belongsTo(models.SubscriptionPlan, {
      foreignKey: {
        name: 'subscriptionPlanId',
      },
      as: 'subscriptionPlan',
    });
  };
  return UserSubscription;
};
