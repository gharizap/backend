const Activities = require('../../models/Activities');
const axios = require('axios');
const dotenv = require('dotenv');
const convertTimeToInt = require('../../converter/convertTImeToInt');
const timeSpend = require('../../converter/timeSpend');
dotenv.config();

const predictionActivities = async (req, res) => {
    const userId = req.userId;
    const activityId = req.params.id;
    if(!userId) return res.status(401);

    try {
        const activity = await Activities.findOne({
            where: {
                id: activityId,
                user_id: userId
            }
        });

        if (!activity) {
            return res.status(404).json({
                error: true,
                message: "Activity not found"
            });
        };

        const workStart = convertTimeToInt(activity.workcoll_start);
        const workEnd = convertTimeToInt(activity.workcoll_end);
        const breakStart = convertTimeToInt(activity.break_start);
        const breakEnd = convertTimeToInt(activity.break_end);
        const studyStart = convertTimeToInt(activity.studyhome_start);
        const studyEnd = convertTimeToInt(activity.studyhome_end);
        const sleepStart = convertTimeToInt(activity.sleep_start);
        const sleepEnd = convertTimeToInt(activity.sleep_end);

        const workMinutes = timeSpend(workStart, workEnd);
        const breakMinutes = timeSpend(breakStart, breakEnd);
        const studyMinutes = timeSpend(studyStart, studyEnd);
        const sleepMinutes = timeSpend(sleepStart, sleepEnd);

        const getRecommendation = await axios.post(process.env.ML_HOST_ACTIVITY, {
            Work_Hours: workMinutes,
            Sleep_Hours: sleepMinutes,
            Study_Minutes: studyMinutes,
            Break_Time: breakMinutes
        });
        const recommendationActivity = getRecommendation.data;
        return res.json(recommendationActivity);
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message,
        });
    }
};

module.exports = predictionActivities;