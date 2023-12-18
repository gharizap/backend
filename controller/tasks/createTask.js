const Tasks = require("../../models/Tasks");
const { nanoid } = require("nanoid");

const createTask = async (req, res) => {
  const userId = req.userId;
  if (!userId) return res.status(401);

  const taskId = "task-" + nanoid(12);
  const { name, desc, category, priority, date } = req.body;
  if (!name || !desc || !category || !priority || !date) {
    return res.status(400).send({
      error: true,
      message: "please fill in all fields",
    });
  }

  try {
    await Tasks.create({
      id: taskId,
      name: name,
      desc: desc,
      category: category,
      priority: priority,
      date: date,
      user_id: userId,
    });

    return res.status(201).send({
      error: false,
      message: "task has been created",
      data: {
        id: taskId,
        user_id: userId,
        name: name,
        date: date,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

module.exports = createTask;
