const Activities = require("../../models/Activities.js");

const deleteActivitiesById = async (req, res) => {
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
    await Activities.destroy({
      where: {
        id: activityId,
      },
    });

    return res.json({
      error: false,
      message: "success deleted activity",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

module.exports = deleteActivitiesById;
