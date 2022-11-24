const mongoose = require("mongoose");
const { Schema } = mongoose;
const taskschema = Schema({
  taskName: {
    type: String,
    trim: true,
    required: true,
    maxLength: [10, "Task must be less than 10 characters"],
    minLength: [3, "Task must be more than 3 characters"],
  },
  taskTime: {
    type: Number,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Tasks", taskschema);
