"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      this.belongsTo(models.user);
      this.belongsTo(models.car);
    }
  }
  Booking.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
      carId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "car",
          key: "id",
        },
      },
      startDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      endDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "booking",
      underscored: true,
    }
  );
  return Booking;
};
