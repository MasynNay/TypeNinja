const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Dictionary extends Model {}

Dictionary.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    word: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "dictionary",
  }
);

module.exports = Dictionary;