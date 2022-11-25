const errorHandler = (err, req, res, next) =>
  res.status(500).json({ msg: "There is a server errror" });

module.exports = errorHandler;
