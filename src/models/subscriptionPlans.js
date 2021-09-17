module.exports = (sequelize, DataTypes) => {
  const SubscriptionPlan = sequelize.define(
    'SubscriptionPlan',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productId: {
        type: DataTypes.STRING,
      },
      monthlyPrice: {
        type: DataTypes.INTEGER,
      },
      annualPrice: {
        type: DataTypes.INTEGER,
      },
      monthlyPriceId: {
        type: DataTypes.STRING,
      },
      annualPriceId: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active',
        validate: {
          isIn: {
            args: [['active', 'inactive']],
            msg: "status must be ['active','inactive']",
          },
        },
      },
    },
    { timestamps: true }
  );
  SubscriptionPlan.associate = (models) => {
    SubscriptionPlan.hasMany(models.UserSubscription, {
      foreignKey: { name: 'subscriptionPlanId' },
      as: 'purchasedPlans',
    });
  };
  return SubscriptionPlan;
};
