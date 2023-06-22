const ERROR_400 = 400;
const ERROR_404 = 404;
const ERROR_500 = 500;

const itemError = (req, res, e) => {
  if (e.name === "ValidationError") {
    return res.status(ERROR_400).send({ message: "Invalid Data Input" });
  }
  if (e.name === "CastError") {
    return res.status(ERROR_400).send({ message: "Invalid ID" });
  }
  if (e.name === "DocumentNotFoundError") {
    return res.status(ERROR_404).send({ message: "Error: Not Found" });
  }
  return res
    .status(ERROR_500)
    .send({ message: "An error has occured on the server" });
};

module.exports = {
  ERROR_404,
  itemError,
};
