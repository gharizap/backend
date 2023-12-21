const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const db = new Sequelize(process.env.DATABASE_NAME, "root", process.env.DATABASE_PASS, {
  host: process.env.DATABASE_HOST,
  dialect: "mysql",
});

module.exports = db;
