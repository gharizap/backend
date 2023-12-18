const Tasks = require("../../models/Tasks.js");
const { Op } = require("sequelize");

const getTaskByDate = async (req, res) => {
  const [year, month, day] = req.params.date.split("-");
  const date = new Date(Date.UTC(year, month - 1, day));

  try {
    const tasks = await Tasks.findAll({
      where: {
        date: {
          [Op.eq]: date,
        },
      },
    });

    if (!tasks.length) {
      return res.status(404).json({
        error: true,
        message: "Task not found for this date",
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

module.exports = getTaskByDate;
