const { CustomError } = require("../Functions/ErrorFunction");

const notFound = (err, req, res, next) => {
  //   res.send(err.message);
  if (err instanceof CustomError) {
    return res.status(err.status).json({ msg: err.message });
  }
  //   return CustomError(err.message, err.status);
  //   return res.status(err.status).json({ msg: err.message });
};

module.exports = notFound;
