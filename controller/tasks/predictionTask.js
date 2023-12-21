const Tasks = require("../../models/Tasks.js");
const axios = require('axios');
const dotenv = require("dotenv");
dotenv.config();

const predictionTask = async (req, res) => {
    const userId = req.userId;
    if (!userId) return res.status(401);

    try {
        const tasks = await Tasks.findAll({
          where: {
            user_id: userId
          },
          attributes: ["name", "category", "priority"]
        });
    
        if (!tasks || tasks.length === 0) {
          return res.status(404).json({
            error: true,
            message: "Tasks not found",
          });
        }

        const recommendTaskPromises = tasks.map(async (task) => {
          const name = task.name.toLowerCase();
          const category = task.category.toLowerCase();
          const priority = task.priority.toLowerCase();
        
          try {
            const getRecommendation = await axios.post(process.env.ML_HOST_TASK, {
              nama_kegiatan: name,
              kategori: category,
              prioritas: priority
            });
            return getRecommendation.data;
          } catch (error) {
            console.error("Error fetching recommendation:", error);
            return null; // or handle error as needed
          }
        });
    
        const recommendTask = await Promise.all(recommendTaskPromises);
        return res.json(recommendTask);
      } catch (error) {
        return res.status(500).json({
          error: true,
          message: error.message,
        });
      }
    
    
};

module.exports = predictionTask;