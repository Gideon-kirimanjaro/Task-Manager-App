const crypto = require("crypto");
const { tasks } = require("../database/tasks");
const { errorFunction } = require("../Functions/ErrorFunction");
const asyncWrapper = require("../middleware/async");
const Tasks = require("../model/tasks");
const getTasks = asyncWrapper(async (req, res) => {
  const allTasks = await Tasks.find({});
  res.status(200).json(allTasks);
});
const postTasks = asyncWrapper(async (req, res) => {
  const postedTask = await Tasks.create(req.body);
  res.status(201).json(postedTask);
});
const getTask = asyncWrapper(async (req, res, next) => {
  const { key } = req.params;
  const oneTask = await Tasks.findOne({ _id: key });
  if (!oneTask) {
    // return res.status(404).json({ msg: `Item with id ${key} does not exist` });
    return next(errorFunction(`Task with id ${key} does not exist`, 404));
  }
  return res.status(200).json(oneTask);
});
const updateTask = asyncWrapper(async (req, res, next) => {
  const { key } = req.params;

  const task = await Tasks.findOneAndUpdate({ _id: key }, req.body, {
    new: true,
    runvalidators: true,
    overwrite: true,
  });
  if (!task) {
    return next(errorFunction(`Task with id ${key} does not exist`, 404));
    // return res.status(404).json(`Task with id ${key} does not exist`);
  }
  res.status(200).json({ task });
});
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { key } = req.params;

  const task = await Tasks.findOneAndDelete({ _id: key });
  if (!task) {
    // const error = new Error(`A task with id ${key} does not exist`);
    // error.status = 404;

    return next(errorFunction(`A task with id ${key} does not exist`, 404));
    // return res.status(404).json(`A task with id ${key} does not exist`);
  }
  res.status(200).json({ task });
});
module.exports = {
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  postTasks,
};
