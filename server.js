const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./config/Database");
const router = require("./routes/router");

dotenv.config();
const app = express();
const port = 3000;

async function startServer() {
  try {
    await db.authenticate();
    console.log("Database Connected...");
    await db.sync();
  } catch (error) {
    console.error(error);
  }

  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  pp.use(express.urlencoded({ extended: true }));
  app.use(router);

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();
