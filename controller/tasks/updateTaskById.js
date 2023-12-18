const Tasks = require("../../models/Tasks.js");

const updateTaskById = async (req, res) => {
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

    const { name, desc, category, priority, date } = req.body;
    if (!name || !desc || !category || !priority || !date) {
      return res.status(400).send({
        error: true,
        message: "please fill in all fields",
      });
    }
    await Tasks.update(
      {
        name: name,
        desc: desc,
        category: category,
        priority: priority,
        date: date,
      },
      {
        where: {
          id: taskId,
        },
      }
    );

    return res.json({
      error: false,
      message: "success",
    });
  } catch (error) {
    return res.status(404).json({
      error: true,
      message: error.message,
    });
  }
};

module.exports = updateTaskById;
