class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const errorFunction = (message, status) => {
  return new CustomError(message, status);
};
module.exports = { CustomError, errorFunction };
