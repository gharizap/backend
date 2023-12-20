const Activities = require('../../models/Activities');

const deleteAllactivities = async (req, res) => {
    const userId = req.userId;
    if (!userId) return res.status(401);

    try {
        await Activities.destroy({
            where: {
                user_id: userId,
            },
        });

        return res.json({
            error: false,
            message: "success deleted all activities"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message,
        });
    }
};

module.exports = deleteAllactivities;