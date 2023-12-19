const { Sequelize } = require("sequelize");

const db = new Sequelize(process.env.DATABASE_NAME, "root", "", {
  host: process.env.DATABASE_HOST,
  dialect: "mysql",
});

module.exports = db;
