const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const { DataTypes } = Sequelize;

const Tasks = db.define(
  "tasks",
  {
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    category: DataTypes.STRING,
    priority: DataTypes.STRING,
    date: DataTypes.DATE,
    user_id: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = Tasks;
