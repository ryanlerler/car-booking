"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    static associate(models) {
      this.hasMany(models.booking);
    }
  }
  Car.init(
    {
      make: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      model: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      power: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      pricePerDay: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      imageUrl: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      seatCount: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      makeYear: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      vehicleNo: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "car",
      underscored: true,
    }
  );
  return Car;
};
