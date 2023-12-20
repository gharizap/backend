const Activities = require("../../models/Activities.js");

const updateActivitiesId = async (req, res) => {
  const userId = req.userId;
  const activityId = req.params.id;
  if (!userId) return res.status(401);

  const activityIsExist = await Activities.findOne({
    where: {
      id: activityId,
    },
  });

  if (!activityIsExist) {
    return res.status(404).json({
      error: true,
      message: "Activity not found",
    });
  }

  if (userId !== activityIsExist.user_id) {
    return res.status(401).json({
      error: true,
      message: "Unauthorized",
    });
  }

  try {
    const {
      workcoll_start,
      workcoll_end,
      break_start,
      break_end,
      studyhome_start,
      studyhome_end,
      sleep_start,
      sleep_end,
    } = req.body;

    await Activities.update(
      {
        workcoll_start: workcoll_start,
        workcoll_end: workcoll_end,
        break_start: break_start,
        break: break_end,
        studyhome_start: studyhome_start,
        studyhome_end: studyhome_end,
        sleep_start: sleep_start,
        sleep_end: sleep_end,
      },
      {
        where: {
          id: activityId,
        },
      }
    );

    res.json({
      error: false,
      message: "success updated activity",
    });
  } catch (error) {
    res.status(404).json({
      error: true,
      message: error.message,
    });
  }
};

module.exports = updateActivitiesId;
