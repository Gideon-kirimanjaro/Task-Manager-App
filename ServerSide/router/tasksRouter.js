const express = require("express");
const {
  getTasks,
  postTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controller/tasksController");
const router = express.Router();

// router.get("/", getTasks);
// router.post("/", postTasks);
// router.get("/:key", getTask);
// router.put("/:key", updateTask);
// router.delete("/:key", deleteTask);
//--------------------------------------Second convention
router.route("/").get(getTasks).post(postTasks);
router.route("/:key").get(getTask).put(updateTask).delete(deleteTask);

module.exports = {
  router,
};
