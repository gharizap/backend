const Tasks = require("../../models/Tasks.js");

const getTask = async (req, res) => {
  const userId = req.userId;
  if (!userId) return res.status(401);

  try {
    const tasks = await Tasks.findAll({
      where: {
        user_id: userId,
      },
    });

    if (!tasks) {
      return res.status(404).json({
        error: true,
        message: "Tasks not found",
      });
    }

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

module.exports = getTask;
