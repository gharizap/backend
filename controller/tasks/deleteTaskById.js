const Tasks = require("../../models/Tasks.js");

const deleteTaskById = async (req, res) => {
  const userId = req.userId;
  const taskId = req.params.id;
  if (!userId) return res.status(401);

  try {
    const taskIsExist = await Tasks.findOne({
      where: {
        id: taskId,
      },
    });

    if (!taskIsExist) {
      return res.status(404).json({
        error: true,
        message: "Task not found",
      });
    }

    if (userId !== taskIsExist.user_id) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized",
      });
    }

    await Tasks.destroy({
      where: {
        id: taskId,
      },
    });

    return res.json({
      error: false,
      message: "success",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

module.exports = deleteTaskById;
