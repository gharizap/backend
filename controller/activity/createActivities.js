const Activities = require("../../models/Activities.js");
const { nanoid } = require("nanoid");

const createActivities = async (req, res) => {
  const userId = req.userId;
  if (!userId) return res.status(401);

  const activityId = "activity-" + nanoid(12);
  const {
    day,
    workcoll_start,
    workcoll_end,
    break_start,
    break_end,
    studyhome_start,
    studyhome_end,
    sleep_start,
    sleep_end,
  } = req.body;

  if (
    !day ||
    !workcoll_start ||
    !workcoll_end ||
    !break_start ||
    !break_end ||
    !studyhome_start ||
    !studyhome_end ||
    !sleep_start ||
    !sleep_end
  ) {
    return res.status(400).send({
      error: true,
      message: "please fill in all fields",
    });
  }

  try {
    await Activities.create({
      id: activityId,
      day: day,
      workcoll_start: workcoll_start,
      workcoll_end: workcoll_end,
      break_start: break_start,
      break_end: break_end,
      studyhome_start: studyhome_start,
      studyhome_end: studyhome_end,
      sleep_start: sleep_start,
      sleep_end: sleep_end,
      user_id: userId,
    });

    res.status(201).send({
      error: false,
      message: "activities has been created",
      data: {
        id: activityId,
        user_id: userId,
        day: day,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

module.exports = createActivities;
