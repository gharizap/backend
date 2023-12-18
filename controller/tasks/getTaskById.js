const Tasks = require("../../models/Tasks.js");

const getTaskById = async (req, res) => {
  const userId = req.userId;
  const taskId = req.params.id;
  if (!userId) return res.status(401);

  try {
    const task = await Tasks.findOne({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      return res.status(404).json({
        error: true,
        message: "Task not found",
      });
    }

    if (userId !== task.user_id) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized",
      });
    }
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

module.exports = getTaskById;
