const mongoose = require("mongoose");

const connectToDb = (url) => {
  mongoose
    .connect(url, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
};
module.exports = { connectToDb };
