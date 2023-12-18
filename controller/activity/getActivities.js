const Activities = require("../../models/Activities.js");

const getActivities = async (req, res) => {
  const userId = req.userId;
  if (!userId) return res.status(401);

  try {
    const activities = await Activities.findAll({
      where: {
        user_id: userId,
      },
    });
    if (!activities) {
      return res.status(404).json({
        error: true,
        message: "Activity not found",
      });
    }

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

module.exports = getActivities;
