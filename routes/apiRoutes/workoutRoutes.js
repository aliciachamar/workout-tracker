const router = require("express").Router();
const Workout = require("../../models");

router.get("/", async (req, res) => {
  try {
    const allWorkouts = await Workout.aggregate([{
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration"
        }
      }
    }])
    res.status(200).json(allWorkouts);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/range", async (req, res) => {
  try {
    const allWorkouts = await Workout.aggregate([{
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration"
        }
      }
    }]).sort({
      _id: -1
    }).limit(7);
    res.status(200).json(allWorkouts);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, {
      $push: {
        exercises: req.body
      }
    });
    res.status(200).json(updatedWorkout);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const newWorkout = await Workout.create(req.body);
    res.status(200).json(newWorkout);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;