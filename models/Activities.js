const { Sequelize } = require("sequelize");
const db = require("../config/Database");

const { DataTypes } = Sequelize;

const Activities = db.define(
  "activities",
  {
    day: DataTypes.STRING,
    workcoll_start: DataTypes.TIME,
    workcoll_end: DataTypes.TIME,
    break_start: DataTypes.TIME,
    break_end: DataTypes.TIME,
    studyhome_start: DataTypes.TIME,
    studyhome_end: DataTypes.TIME,
    sleep_start: DataTypes.TIME,
    sleep_end: DataTypes.TIME,
    user_id: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = Activities;
