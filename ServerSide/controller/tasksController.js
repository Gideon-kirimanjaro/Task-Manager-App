const crypto = require("crypto");
const { tasks } = require("../database/tasks");
const Tasks = require("../model/tasks");
const getTasks = async (req, res) => {
  try {
    const allTasks = await Tasks.find({});
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(501).json({
      msg: error,
    });
  }
};
const postTasks = async (req, res) => {
  try {
    const postedTask = await Tasks.create(req.body);
    res.status(201).json(postedTask);
  } catch (error) {
    res.status(501).json({ msg: error });
  }
};
const getTask = async (req, res) => {
  const { key } = req.params;
  try {
    const oneTask = await Tasks.findOne({ _id: key });
    if (!oneTask) {
      return res
        .status(404)
        .json({ msg: `Item with id ${key} does not exist` });
    }
    return res.status(200).json(oneTask);
  } catch (error) {
    res.json({
      msg: error,
    });
  }
};
const updateTask = async (req, res) => {
  const { key } = req.params;
  try {
    const task = await Tasks.findOneAndUpdate({ _id: key }, req.body, {
      new: true,
      runvalidators: true,
    });
    if (!task) {
      return res.json(404).json(`Task with id ${key} does not exist`);
    }
    res.status(200).json({ task });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
};
const deleteTask = async (req, res) => {
  const { key } = req.params;
  try {
    const task = await Tasks.findOneAndDelete({ _id: key });
    if (!task) {
      return res.status(404).json(`A task with id ${key} does not exist`);
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};
module.exports = {
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  postTasks,
};
