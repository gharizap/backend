const express = require("express");
const { check, validationResult } = require("express-validator");
const getUsers = require("../controller/auth/getUsers");
const register = require("../controller/auth/register");
const login = require("../controller/auth/login");
const logout = require("../controller/auth/logout");
const refreshToken = require("../controller/auth/refreshToken");
const getActivities = require("../controller/activity/getActivities");
const createActivities = require("../controller/activity/createActivities");
const verifyToken = require("../middleware/verifyToken");
const updateActivitiesId = require("../controller/activity/updateActivitiesById");
const getActivitiesById = require("../controller/activity/getActivitiesById");
const deleteActivitiesById = require("../controller/activity/deleteActivitiesById");
const getTask = require("../controller/tasks/getTask");
const createTask = require("../controller/tasks/createTask");
const updateTaskById = require("../controller/tasks/updateTaskById");
const getTaskById = require("../controller/tasks/getTaskById");
const getTaskByDate = require("../controller/tasks/getTaskByDate");
const deleteTaskById = require("../controller/tasks/deleteTaskById");

const router = express.Router();

router.get("/activities", verifyToken, getActivities);
router.get("/activities/:id", verifyToken, getActivitiesById);
router.post("/activities", verifyToken, createActivities);
router.put("/activities/:id", verifyToken, updateActivitiesId);
router.delete("/activities/:id", verifyToken, deleteActivitiesById);
router.get("/tasks", verifyToken, getTask);
router.get("/tasks/:id", verifyToken, getTaskById);
router.get("/tasks/date/:date", verifyToken, getTaskByDate);
router.post("/tasks", verifyToken, createTask);
router.put("/tasks/:id", verifyToken, updateTaskById);
router.delete("/tasks/:id", verifyToken, deleteTaskById);
router.get("/users", verifyToken, getUsers);
router.post(
  "/users",
  [
    check("name", "Invalid name").notEmpty(),
    check("email", "Invalid email").isEmail(),
    check("password", "Password must be at least 8 characters").isLength({
      min: 8,
    }),
  ],
  register
);
router.post("/login", login);
router.get("/token/:id", refreshToken);
router.delete("/logout", verifyToken, logout);

module.exports = router;
